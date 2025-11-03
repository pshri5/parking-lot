import initializeSystem from './src/initialization/SystemInitializer.js';
import Vehicle from './src/models/Vehicle.js';
import VehicleType from './src/models/VehicleType.js';
import db from './src/repositories/Database.js';

// Example usage function
function runExample() {
  const { parkingController } = initializeSystem();
  
  console.log("System initialized!");
  
  // Check initial availability
  const initialAvailability = parkingController.handleGetAvailability({}, { 
    status: (code) => ({ 
      json: (data) => { 
        console.log("Initial Availability:");
        console.log(data);
        return { status: code };
      }
    })
  });
  
  // Park a car
  console.log("\nParking a sedan...");
  const entryResponse = parkingController.handleVehicleEntry(
    { body: { licensePlate: "ABC123", vehicleType: "SEDAN" } },
    { 
      status: (code) => ({ 
        json: (data) => { 
          console.log(data);
          return { status: code };
        }
      })
    }
  );
  
  const ticketId = entryResponse.json.ticket.id;
  
  // Check availability after parking
  console.log("\nAvailability after parking:");
  parkingController.handleGetAvailability({}, { 
    status: (code) => ({ 
      json: (data) => { 
        console.log(data);
        return { status: code };
      }
    })
  });
  
  // Simulate time passing (1 hour)
  console.log("\nWaiting for 1 hour...");
  const tickets = db.parkingTickets;
  const ticket = tickets[0];
  ticket.entryTime = new Date(ticket.entryTime.getTime() - 60 * 60 * 1000);
  
  // Exit the car
  console.log("\nExiting the vehicle...");
  parkingController.handleVehicleExit(
    { params: { ticketId } },
    { 
      status: (code) => ({ 
        json: (data) => { 
          console.log(data);
          return { status: code };
        }
      })
    }
  );
  
  // Final availability check
  console.log("\nFinal availability:");
  parkingController.handleGetAvailability({}, { 
    status: (code) => ({ 
      json: (data) => { 
        console.log(data);
        return { status: code };
      }
    })
  });
}

// Run the example
runExample();