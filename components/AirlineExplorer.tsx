
import React from 'react';
import { MOCK_AIRLINES } from '../constants';
import { Star, Globe, Plane } from 'lucide-react';

const AirlineExplorer: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">World Class Partners</h2>
          <p className="text-slate-400 max-w-2xl">We only partner with the most reliable and premium airlines globally to ensure your journey is as smooth as your booking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AIRLINES.map((airline) => (
            <div 
              key={airline.code} 
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-500"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={airline.image} 
                  alt={airline.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{airline.name}</h3>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold ml-1">{airline.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{airline.description}</p>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Plane className="w-4 h-4" />
                    <span className="text-xs">{airline.fleetSize} Aircraft</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs">{airline.destinations} Cities</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AirlineExplorer;
