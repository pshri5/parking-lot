class FeeCalculationService {
  constructor(rateCardRepository) {
    this.rateCardRepository = rateCardRepository;
  }
  
  calculateFee(ticket) {
    const entryTime = ticket.entryTime;
    const exitTime = ticket.exitTime || new Date();
    const vehicleType = ticket.vehicle.vehicleType;
    
    // Get appropriate rate card
    const rateCard = this.rateCardRepository.findActiveRateCard(vehicleType, entryTime);
    if (!rateCard) {
      throw new Error("No active rate card found for this vehicle type");
    }
    
    // Calculate duration in hours
    const durationMs = exitTime - entryTime;
    const hoursParked = durationMs / (1000 * 60 * 60);
    
    // Calculate fee
    let fee = rateCard.baseFee + (rateCard.hourlyRate * Math.ceil(hoursParked));
    
    // Apply daily maximum if applicable
    const daysParked = Math.ceil(hoursParked / 24);
    if (daysParked >= 1) {
      const dailyMax = rateCard.dailyMaximum * daysParked;
      if (fee > dailyMax) {
        fee = dailyMax;
      }
    }
    
    return Number(fee.toFixed(2));
  }
}

export default FeeCalculationService;