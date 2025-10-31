import VehicleType from '../models/VehicleType.js';
import Vehicle from '../models/Vehicle.js';
import { ParkingLot, ParkingFloor, ParkingSpot } from '../models/ParkingStructures.js';
import { ParkingTicket } from '../models/ParkingTicket.js';
import RateCard from '../models/RateCard.js';

import db from '../repositories/Database.js';
import VehicleRepository from '../repositories/VehicleRepository.js';
import ParkingSpotRepository from '../repositories/ParkingSpotRepository.js';
import ParkingTicketRepository from '../repositories/ParkingTicketRepository.js';
import RateCardRepository from '../repositories/RateCardRepository.js';

import FeeCalculationService from '../services/FeeCalculationService.js';
import ParkingService from '../services/ParkingService.js';

import ParkingController from '../controllers/ParkingController.js';

function initializeSystem() {
  // Create repositories
  const vehicleRepo = new VehicleRepository();
  const parkingSpotRepo = new ParkingSpotRepository();
  const parkingTicketRepo = new ParkingTicketRepository();
  const rateCardRepo = new RateCardRepository();
  
  // Create services
  const feeService = new FeeCalculationService(rateCardRepo);
  const parkingService = new ParkingService(
    vehicleRepo,
    parkingSpotRepo,
    parkingTicketRepo,
    feeService
  );
  
  // Create controller
  const parkingController = new ParkingController(parkingService);
  
  // Create a parking lot
  const parkingLot = new ParkingLot("Downtown Parking", "123 Main St");
  db.parkingLots.push(parkingLot);
  parkingLot.id = db.parkingLotIdCounter++;
  
  // Create floors
  for (let i = 1; i <= 3; i++) {
    const floor = new ParkingFloor(i, 10);
    floor.id = db.parkingFloorIdCounter++;
    floor.parkingLotId = parkingLot.id;
    db.parkingFloors.push(floor);
    
    // Create spots on each floor
    // 2 motorcycle spots
    for (let j = 1; j <= 2; j++) {
      const spot = new ParkingSpot(`A${j}`, VehicleType.MOTORCYCLE);
      spot.id = db.parkingSpotIdCounter++;
      spot.floorId = floor.id;
      db.parkingSpots.push(spot);
    }
    
    // 3 compact car spots
    for (let j = 1; j <= 3; j++) {
      const spot = new ParkingSpot(`B${j}`, VehicleType.COMPACT_CAR);
      spot.id = db.parkingSpotIdCounter++;
      spot.floorId = floor.id;
      db.parkingSpots.push(spot);
    }
    
    // 3 sedan spots
    for (let j = 1; j <= 3; j++) {
      const spot = new ParkingSpot(`C${j}`, VehicleType.SEDAN);
      spot.id = db.parkingSpotIdCounter++;
      spot.floorId = floor.id;
      db.parkingSpots.push(spot);
    }
    
    // 1 SUV spot
    const suvSpot = new ParkingSpot('D1', VehicleType.SUV);
    suvSpot.id = db.parkingSpotIdCounter++;
    suvSpot.floorId = floor.id;
    db.parkingSpots.push(suvSpot);
    
    // 1 bus spot
    const busSpot = new ParkingSpot('E1', VehicleType.BUS);
    busSpot.id = db.parkingSpotIdCounter++;
    busSpot.floorId = floor.id;
    db.parkingSpots.push(busSpot);
  }
  
  // Create rate cards
  const motorcycleRate = new RateCard(VehicleType.MOTORCYCLE, 2, 1, 15);
  const compactRate = new RateCard(VehicleType.COMPACT_CAR, 3, 1.5, 20);
  const sedanRate = new RateCard(VehicleType.SEDAN, 4, 2, 25);
  const suvRate = new RateCard(VehicleType.SUV, 5, 2.5, 30);
  const busRate = new RateCard(VehicleType.BUS, 10, 5, 50);
  
  rateCardRepo.save(motorcycleRate);
  rateCardRepo.save(compactRate);
  rateCardRepo.save(sedanRate);
  rateCardRepo.save(suvRate);
  rateCardRepo.save(busRate);
  
  return {
    parkingController,
    parkingService
  };
}

export default initializeSystem;