import db from './Database.js';

class RateCardRepository {
  save(rateCard) {
    if (!rateCard.id) {
      rateCard.id = db.rateCardIdCounter++;
      db.rateCards.push(rateCard);
    } else {
      const index = db.rateCards.findIndex(r => r.id === rateCard.id);
      if (index !== -1) {
        db.rateCards[index] = rateCard;
      } else {
        db.rateCards.push(rateCard);
      }
    }
    return rateCard;
  }
  
  findActiveRateCard(vehicleType, date) {
    return db.rateCards.find(r => 
      r.vehicleType.id === vehicleType.id && 
      r.effectiveFrom <= date && 
      (r.effectiveTo === null || r.effectiveTo >= date)
    );
  }
}

export default RateCardRepository;