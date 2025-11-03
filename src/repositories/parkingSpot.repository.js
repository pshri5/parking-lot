import db from './database.repository.js';

class ParkingSpotRepository {
  save(spot) {
    if (!spot.id) {
      spot.id = db.parkingSpotIdCounter++;
      db.parkingSpots.push(spot);
    } else {
      const index = db.parkingSpots.findIndex(s => s.id === spot.id);
      if (index !== -1) {
        db.parkingSpots[index] = spot;
      } else {
        db.parkingSpots.push(spot);
      }
    }
    return spot;
  }
  
  findById(id) {
    return db.parkingSpots.find(s => s.id === id);
  }
  
  findByFloorId(floorId) {
    return db.parkingSpots.filter(s => s.floorId === floorId);
  }
  
  findAvailable(vehicleType) {
    return db.parkingSpots.filter(s => 
      s.isAvailable === true && 
      s.suitableFor.sizeFactor >= vehicleType.sizeFactor
    );
  }
}

export default ParkingSpotRepository;