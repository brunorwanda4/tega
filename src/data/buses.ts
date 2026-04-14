export type BusData = {
  id: number;
  plateNumber: string;
  agency: string;
  priceRf: string;
  departureTime: string; // e.g., '09:10 AM'
  origin: string;
  arrivalTime: string;
  destination: string;
  durationLabel: string; // e.g., '2h 15min'
  seatsRemaining: number;
  totalSeats: number;
  distanceKm: number;
  status: "delayed" | "ontime";
  delayAmount: number; // in minutes, if delayed
};

export const MOCK_BUSES: BusData[] = [
  {
    id: 1,
    plateNumber: "RWF123D",
    agency: "Volcano express",
    priceRf: "1,507 RF",
    departureTime: "09:10 AM",
    origin: "Kigali city, Nyamirambo",
    arrivalTime: "09:10 AM",
    destination: "Muhanga city, Cyakabiri",
    durationLabel: "2h 15min",
    seatsRemaining: 20,
    totalSeats: 30,
    distanceKm: 15,
    status: "delayed",
    delayAmount: 10,
  },
  {
    id: 2,
    plateNumber: "RWF123D",
    agency: "Horizon express",
    priceRf: "1,507 RF",
    departureTime: "10:30 AM",
    origin: "Kigali city, Nyamirambo",
    arrivalTime: "12:45 AM",
    destination: "Muhanga city, Cyakabiri",
    durationLabel: "2h 15min",
    seatsRemaining: 4,
    totalSeats: 30,
    distanceKm: 15,
    status: "ontime",
    delayAmount: 0,
  },
  {
    id: 3,
    plateNumber: "RWF123D",
    agency: "Kivu belt",
    priceRf: "1,507 RF",
    departureTime: "08:45 AM",
    origin: "Kigali city, Nyamirambo",
    arrivalTime: "11:00 AM",
    destination: "Muhanga city, Cyakabiri",
    durationLabel: "2h 15min",
    seatsRemaining: 15,
    totalSeats: 30,
    distanceKm: 15,
    status: "ontime",
    delayAmount: 0,
  },
  {
    id: 4,
    plateNumber: "RWB 123A",
    agency: "Capital express",
    priceRf: "2,000 RF",
    departureTime: "11:15 AM",
    origin: "Kigali city, Nyamirambo",
    arrivalTime: "01:30 AM",
    destination: "Muhanga city, Cyakabiri",
    durationLabel: "2h 15min",
    seatsRemaining: 28,
    totalSeats: 30,
    distanceKm: 15,
    status: "ontime",
    delayAmount: 0,
  },
];
