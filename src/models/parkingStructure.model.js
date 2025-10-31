class ParkingLot {
  constructor(name, address) {
    this.id = null; // Set when saved to database
    this.name = name;
    this.address = address;
    this.floors = [];
    this.createdAt = new Date();
  }
  
  addFloor(floor) {
    this.floors.push(floor);
    floor.parkingLotId = this.id;
  }
}

class ParkingFloor {
  constructor(floorNumber, capacity) {
    this.id = null; // Set when saved to database
    this.parkingLotId = null;
    this.floorNumber = floorNumber;
    this.capacity = capacity;
    this.parkingSpots = [];
  }
  
  addParkingSpot(spot) {
    if (this.parkingSpots.length < this.capacity) {
      this.parkingSpots.push(spot);
      spot.floorId = this.id;
      return true;
    }
    return false;
  }
}

class ParkingSpot {
  constructor(spotNumber, vehicleType, isDisabledSpot = false) {
    this.id = null; // Set when saved to database
    this.floorId = null;
    this.spotNumber = spotNumber;
    this.suitableFor = vehicleType;
    this.isAvailable = true;
    this.isDisabledSpot = isDisabledSpot;
  }
}

export { ParkingLot, ParkingFloor, ParkingSpot };