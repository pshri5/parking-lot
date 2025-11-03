class Database {
    constructor(){
        this.vehicles = []
        this.parkingLots = []
        this.parkingFloors = []
        this.parkingSpots = []
        this.rateCards = []
        this.parkingTickets = []

        //counters for IDs
        this.vehicleIdCounter = 1
        this.parkingLotIdCounter = 1
        this.parkingFloorIdCounter = 1
        this.parkingSpotIdCounter = 1
        this.rateCardsIdCounter = 1

    }
}

const db = new Database //Database Instance
export default db