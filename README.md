# Smart Parking Lot
A modular backend system for managing a multi-floor smart parking lot. This system handles vehicle entry/exit, parking spot allocation based on vehicle size, real-time availability, and parking fee calculation.

## Features

- **Automatic Parking Spot Allocation:** Assigns the most suitable available spot based on vehicle type and size.
- **Vehicle Check-In & Check-Out:** Tracks entry and exit times for all vehicles.
- **Parking Fee Calculation:** Calculates fees based on duration and vehicle type, with support for daily maximums.
- **Real-Time Availability:** Updates and reports parking spot status instantly.
- **Extensible Data Model:** Supports multiple floors, spot types, and rate cards.

## System Structure

- **Models:** Vehicle, VehicleType, ParkingLot, ParkingFloor, ParkingSpot, ParkingTicket, RateCard
- **Repositories:** In-memory data storage for all entities
- **Services:** Business logic for parking, spot allocation, and fee calculation
- **Controller:** API-like interface for vehicle entry, exit, and availability queries
- **Initialization:** Example setup and usage script

## Example Usage

- **Check Availability:**  
  Returns total, available, and occupied spots (overall and by vehicle type).

- **Park a Vehicle:**  
  Assigns a spot and issues a ticket.
  - Input: License plate, vehicle type (e.g., "SEDAN")
  - Output: Ticket details and assigned spot

- **Exit a Vehicle:**  
  Calculates fee and frees the spot.
  - Input: Ticket ID
  - Output: Fee, duration, and updated ticket info

## Vehicle Types Supported

- MOTORCYCLE
- COMPACT_CAR
- SEDAN
- SUV
- BUS

## Fee Calculation

- **Base Fee** + (Hourly Rate × Hours Parked)
- **Daily Maximum** applied if exceeded


