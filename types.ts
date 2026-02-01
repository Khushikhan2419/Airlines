
export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: 'Economy' | 'Premium' | 'Business' | 'First';
  stops: number;
}

export interface Airline {
  name: string;
  code: string;
  country: string;
  fleetSize: number;
  rating: number;
  description: string;
  destinations: number;
  image: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  passportNumber: string;
  seat: string;
}

export interface PriceHistory {
  date: string;
  price: number;
}
