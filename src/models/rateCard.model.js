class RateCard {
  constructor(vehicleType, baseFee, hourlyRate, dailyMaximum) {
    this.id = null; // Set when saved to database
    this.vehicleType = vehicleType;
    this.baseFee = baseFee;
    this.hourlyRate = hourlyRate;
    this.dailyMaximum = dailyMaximum;
    this.effectiveFrom = new Date();
    this.effectiveTo = null; // null means it's currently active
  }
}

export default RateCard;