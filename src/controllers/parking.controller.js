import VehicleType from '../models/VehicleType.js';
import db from '../repositories/Database.js';

class ParkingController {
  constructor(parkingService) {
    this.parkingService = parkingService;
  }
  
  handleVehicleEntry(req, res) {
    try {
      const { licensePlate, vehicleType } = req.body;
      
      if (!licensePlate || !vehicleType) {
        return res.status(400).json({ error: 'License plate and vehicle type are required' });
      }
      
      // Find the vehicle type object
      const vehicleTypeObj = VehicleType.getAll().find(type => type.type === vehicleType);
      if (!vehicleTypeObj) {
        return res.status(400).json({ error: 'Invalid vehicle type' });
      }
      
      const ticket = this.parkingService.parkVehicle(licensePlate, vehicleTypeObj);
      
      return res.status(200).json({
        success: true,
        ticket: {
          id: ticket.id,
          entryTime: ticket.entryTime,
          vehicle: {
            licensePlate: ticket.vehicle.licensePlate,
            type: ticket.vehicle.vehicleType.type
          },
          spot: {
            spotNumber: ticket.parkingSpot.spotNumber,
            floor: db.parkingFloors.find(f => f.id === ticket.parkingSpot.floorId).floorNumber
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  handleVehicleExit(req, res) {
    try {
      const { ticketId } = req.params;
      
      if (!ticketId) {
        return res.status(400).json({ error: 'Ticket ID is required' });
      }
      
      const ticket = this.parkingService.exitVehicle(ticketId);
      
      return res.status(200).json({
        success: true,
        ticket: {
          id: ticket.id,
          entryTime: ticket.entryTime,
          exitTime: ticket.exitTime,
          fee: ticket.fee,
          vehicle: {
            licensePlate: ticket.vehicle.licensePlate,
            type: ticket.vehicle.vehicleType.type
          },
          duration: this.calculateDuration(ticket.entryTime, ticket.exitTime)
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  handleGetAvailability(req, res) {
    try {
      const status = this.parkingService.getOccupancyStatus();
      return res.status(200).json(status);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  calculateDuration(entryTime, exitTime) {
    const durationMs = exitTime - entryTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
}

export default ParkingController;