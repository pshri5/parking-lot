import db from './Database.js';

class ParkingTicketRepository {
  save(ticket) {
    const index = db.parkingTickets.findIndex(t => t.id === ticket.id);
    if (index !== -1) {
      db.parkingTickets[index] = ticket;
    } else {
      db.parkingTickets.push(ticket);
    }
    return ticket;
  }
  
  findById(id) {
    return db.parkingTickets.find(t => t.id === id);
  }
  
  findByVehicleLicensePlate(licensePlate) {
    return db.parkingTickets.filter(t => t.vehicle.licensePlate === licensePlate);
  }
  
  findActiveTickets() {
    return db.parkingTickets.filter(t => t.exitTime === null);
  }
}

export default ParkingTicketRepository;