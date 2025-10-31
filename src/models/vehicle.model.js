class Vehicle {
  constructor(licensePlate, vehicleType) {
    this.id = null; // Set when saved to database
    this.licensePlate = licensePlate;
    this.vehicleType = vehicleType;
  }
}

export default Vehicle;