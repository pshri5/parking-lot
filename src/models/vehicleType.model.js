class VehicleType {
  static MOTORCYCLE = { id: 1, type: 'MOTORCYCLE', sizeFactor: 1.0 };
  static COMPACT_CAR = { id: 2, type: 'COMPACT_CAR', sizeFactor: 1.5 };
  static SEDAN = { id: 3, type: 'SEDAN', sizeFactor: 2.0 };
  static SUV = { id: 4, type: 'SUV', sizeFactor: 2.5 };
  static BUS = { id: 5, type: 'BUS', sizeFactor: 4.0 };
  
  static getAll() {
    return [
      VehicleType.MOTORCYCLE,
      VehicleType.COMPACT_CAR,
      VehicleType.SEDAN,
      VehicleType.SUV,
      VehicleType.BUS
    ];
  }
}

export default VehicleType;