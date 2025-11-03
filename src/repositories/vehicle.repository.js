import db from './database.repository.js';

class VehicleRepository {
  save(vehicle) {
    if (!vehicle.id) {
      vehicle.id = db.vehicleIdCounter++;
      db.vehicles.push(vehicle);
    } else {
      const index = db.vehicles.findIndex(v => v.id === vehicle.id);
      if (index !== -1) {
        db.vehicles[index] = vehicle;
      } else {
        db.vehicles.push(vehicle);
      }
    }
    return vehicle;
  }
  
  findByLicensePlate(licensePlate) {
    return db.vehicles.find(v => v.licensePlate === licensePlate);
  }
  
  findById(id) {
    return db.vehicles.find(v => v.id === id);
  }
}

export default VehicleRepository;