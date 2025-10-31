// Payment status setup
class PaymentStatus {
  static PENDING = 'PENDING';
  static PAID = 'PAID';
  static FAILED = 'FAILED';
}

// Parking ticket model
class ParkingTicket {
  constructor(vehicle, parkingSpot) {
    this.id = this.generateId();
    this.vehicle = vehicle;
    this.parkingSpot = parkingSpot;
    this.entryTime = new Date();
    this.exitTime = null;
    this.fee = null;
    this.paymentStatus = PaymentStatus.PENDING;
  }
  
  generateId() {
    return 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

export { ParkingTicket, PaymentStatus };