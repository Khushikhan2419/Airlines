
import React from 'react';
import { Flight } from '../types';
import { Plane, ChevronRight, Zap, Shield, Coffee } from 'lucide-react';

interface FlightResultsProps {
  flights: Flight[];
  onSelect?: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onSelect }) => {
  if (flights.length === 0) {
    return (
      <div className="text-center py-24 glass-card rounded-[2rem] border-white/5 border-dashed">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 animate-pulse"></div>
          <Plane className="w-16 h-16 mx-auto text-slate-700 relative" />
        </div>
        <h3 className="text-xl font-space font-bold text-slate-400">Scan parameters required</h3>
        <p className="text-sm text-slate-600 mt-2">Initializing global flight monitoring systems...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight, idx) => (
        <div 
          key={flight.id} 
          className="group relative glass-card border-white/5 hover:border-cyan-500/30 p-8 rounded-[2rem] transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] animate-in slide-in-from-bottom-5"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Neon Class Tag */}
          <div className="absolute top-0 right-10 -translate-y-1/2 flex gap-2">
            <span className="bg-slate-900 border border-cyan-500/50 text-cyan-400 text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              {flight.class}
            </span>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
            {/* Airline Info */}
            <div className="flex items-center gap-6 w-full xl:w-[200px]">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center p-3 group-hover:bg-white/10 transition-colors">
                <img src={flight.airlineLogo} alt={flight.airline} className="w-full h-full object-contain filter brightness-200" />
              </div>
              <div className="text-left">
                <h4 className="font-space font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{flight.airline}</h4>
                <div className="flex gap-2 mt-1">
                  <Shield className="w-3 h-3 text-slate-500" />
                  <Zap className="w-3 h-3 text-cyan-500" />
                </div>
              </div>
            </div>

            {/* Time Journey Area */}
            <div className="flex flex-1 items-center justify-between gap-12 w-full max-w-2xl">
              <div className="text-center md:text-left">
                <span className="block text-3xl font-space font-bold tracking-tighter text-white">{flight.departureTime}</span>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{flight.origin}</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] font-bold text-cyan-500/80 mb-2 font-mono">{flight.duration}</span>
                <div className="w-full h-[1px] bg-slate-800 relative flex items-center justify-center">
                  <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                  <div className="p-1 bg-slate-900 border border-slate-700 rounded-lg absolute rotate-45 group-hover:rotate-180 transition-all duration-700">
                    <Plane className="w-3 h-3 text-cyan-400 -rotate-45" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    {flight.stops === 0 ? 'Direct Neural Path' : `${flight.stops} Relay Node`}
                  </span>
                </div>
              </div>

              <div className="text-center md:text-right">
                <span className="block text-3xl font-space font-bold tracking-tighter text-white">{flight.arrivalTime}</span>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{flight.destination}</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-row xl:flex-col items-center xl:items-end gap-6 w-full xl:w-auto border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-10">
              <div className="flex flex-col items-start xl:items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Total Fee</span>
                <span className="text-4xl font-space font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tighter">
                  <span className="text-xl mr-0.5 text-cyan-500">$</span>{flight.price}
                </span>
              </div>
              <button 
                onClick={() => onSelect?.(flight)}
                className="bg-white text-slate-950 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all transform hover:translate-x-1 hover:bg-cyan-400 flex items-center gap-3"
              >
                Initialize <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
