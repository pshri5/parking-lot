import db from '../repositories/Database.js';
import VehicleType from '../models/VehicleType.js';
import Vehicle from '../models/Vehicle.js';
import { ParkingTicket } from '../models/ParkingTicket.js';

class ParkingService {
  constructor(vehicleRepository, parkingSpotRepository, parkingTicketRepository, feeCalculationService) {
    this.vehicleRepository = vehicleRepository;
    this.parkingSpotRepository = parkingSpotRepository;
    this.parkingTicketRepository = parkingTicketRepository;
    this.feeCalculationService = feeCalculationService;
  }
  
  parkVehicle(licensePlate, vehicleType) {
    // Check if vehicle exists, otherwise create it
    let vehicle = this.vehicleRepository.findByLicensePlate(licensePlate);
    if (!vehicle) {
      vehicle = new Vehicle(licensePlate, vehicleType);
      vehicle = this.vehicleRepository.save(vehicle);
    }
    
    // Find an available spot
    const spot = this.findAvailableSpot(vehicleType);
    if (!spot) {
      throw new Error(`No available spots for ${vehicleType.type}`);
    }
    
    // Mark spot as occupied
    spot.isAvailable = false;
    this.parkingSpotRepository.save(spot);
    
    // Create and save a parking ticket
    const ticket = new ParkingTicket(vehicle, spot);
    return this.parkingTicketRepository.save(ticket);
  }
  
  exitVehicle(ticketId) {
    const ticket = this.parkingTicketRepository.findById(ticketId);
    if (!ticket) {
      throw new Error(`Ticket not found: ${ticketId}`);
    }
    
    if (ticket.exitTime !== null) {
      throw new Error("Vehicle has already exited");
    }
    
    // Set exit time
    ticket.exitTime = new Date();
    
    // Calculate fee
    ticket.fee = this.feeCalculationService.calculateFee(ticket);
    
    // Free up the parking spot
    const spot = ticket.parkingSpot;
    spot.isAvailable = true;
    this.parkingSpotRepository.save(spot);
    
    return this.parkingTicketRepository.save(ticket);
  }
  
  getAvailableSpots(vehicleType) {
    return this.parkingSpotRepository.findAvailable(vehicleType);
  }
  
  findAvailableSpot(vehicleType) {
    // Find all available spots suitable for this vehicle type
    let availableSpots = this.parkingSpotRepository.findAvailable(vehicleType);
    
    if (availableSpots.length === 0) {
      return null;
    }
    
    // Sort spots by floor number (prioritize lower floors)
    availableSpots.sort((a, b) => {
      const floorA = db.parkingFloors.find(f => f.id === a.floorId);
      const floorB = db.parkingFloors.find(f => f.id === b.floorId);
      return floorA.floorNumber - floorB.floorNumber;
    });
    
    return availableSpots[0];
  }
  
  getOccupancyStatus() {
    const total = db.parkingSpots.length;
    const occupied = db.parkingSpots.filter(spot => !spot.isAvailable).length;
    const available = total - occupied;
    
    const byType = VehicleType.getAll().map(type => {
      const totalForType = db.parkingSpots.filter(spot => 
        spot.suitableFor.id === type.id
      ).length;
      
      const availableForType = db.parkingSpots.filter(spot => 
        spot.suitableFor.id === type.id && spot.isAvailable
      ).length;
      
      return {
        type: type.type,
        total: totalForType,
        available: availableForType
      };
    });
    
    return {
      total,
      available,
      occupied,
      byType
    };
  }
}

export default ParkingService;