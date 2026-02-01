
import React from 'react';
import { Plane, Shield, Clock, Award } from 'lucide-react';

export const MOCK_AIRLINES = [
  {
    name: "Emirates",
    code: "EK",
    country: "United Arab Emirates",
    fleetSize: 252,
    rating: 4.8,
    description: "Renowned for its luxury first-class suites and world-class in-flight entertainment.",
    destinations: 157,
    image: "https://picsum.photos/seed/emirates/800/600"
  },
  {
    name: "Singapore Airlines",
    code: "SQ",
    country: "Singapore",
    fleetSize: 147,
    rating: 4.9,
    description: "Consistently ranked as one of the world's best airlines with exceptional service standards.",
    destinations: 75,
    image: "https://picsum.photos/seed/singapore/800/600"
  },
  {
    name: "Qatar Airways",
    code: "QR",
    country: "Qatar",
    fleetSize: 235,
    rating: 4.9,
    description: "The state-owned flag carrier of Qatar, famous for the revolutionary Qsuite Business Class.",
    destinations: 160,
    image: "https://picsum.photos/seed/qatar/800/600"
  },
  {
    name: "Delta Air Lines",
    code: "DL",
    country: "United States",
    fleetSize: 950,
    rating: 4.2,
    description: "One of the major airlines of the United States and a legacy carrier.",
    destinations: 325,
    image: "https://picsum.photos/seed/delta/800/600"
  }
];

export const FEATURES = [
  { icon: <Plane className="w-6 h-6" />, title: "Global Reach", description: "Access to over 5000+ destinations worldwide." },
  { icon: <Shield className="w-6 h-6" />, title: "Secure Booking", description: "Encrypted transactions and 24/7 protection." },
  { icon: <Clock className="w-6 h-6" />, title: "Real-time Updates", description: "Get instant notifications on flight changes." },
  { icon: <Award className="w-6 h-6" />, title: "Best Price Guarantee", description: "We match lower prices found elsewhere." },
];
