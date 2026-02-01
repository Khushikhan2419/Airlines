
import React, { useState, useEffect } from 'react';
import { Plane, Search, MapPin, ArrowRightLeft, Activity, Compass, Wind, Sparkles, LayoutDashboard, Share2, Info } from 'lucide-react';
import { Flight } from './types';
import FlightResults from './components/FlightResults';
import AirlineExplorer from './components/AirlineExplorer';
import PriceChart from './components/PriceChart';
import AIConcierge from './components/AIConcierge';
import IntelligenceTicker from './components/IntelligenceTicker';
import MarketForecast from './components/MarketForecast';
import BookingFlow from './components/BookingFlow';
import { FEATURES } from './constants';
import { getTravelIntelligence } from './services/geminiService';

const App: React.FC = () => {
  const [origin, setOrigin] = useState('New York (JFK)');
  const [destination, setDestination] = useState('London (LHR)');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [intel, setIntel] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<{ date: string; price: number }[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const mockSearch = async () => {
    setIsSearching(true);
    setFlights([]);
    setIntel(null);
    
    const history = Array.from({ length: 30 }, (_, i) => ({
      date: `D${i + 1}`,
      price: Math.floor(Math.random() * (600 - 350 + 1) + 350)
    }));
    setPriceHistory(history);

    getTravelIntelligence(origin, destination).then(data => setIntel(data));

    setTimeout(() => {
      const results: Flight[] = [
        {
          id: '1',
          airline: 'Emirates',
          airlineLogo: 'https://www.emirates.com/media-reources/logos/Emirates_Logo_White.png',
          origin: origin.split(' ')[0],
          destination: destination.split(' ')[0],
          departureTime: '10:30 PM',
          arrivalTime: '11:15 AM',
          duration: '7h 45m',
          price: 549,
          class: 'First',
          stops: 0
        },
        {
          id: '2',
          airline: 'Singapore Airlines',
          airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png',
          origin: origin.split(' ')[0],
          destination: destination.split(' ')[0],
          departureTime: '06:15 PM',
          arrivalTime: '07:30 AM',
          duration: '8h 15m',
          price: 720,
          class: 'Business',
          stops: 0
        },
        {
          id: '3',
          airline: 'Qatar Airways',
          airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1280px-Qatar_Airways_Logo.svg.png',
          origin: origin.split(' ')[0],
          destination: destination.split(' ')[0],
          departureTime: '09:00 PM',
          arrivalTime: '11:30 AM',
          duration: '9h 30m',
          price: 610,
          class: 'Economy',
          stops: 1
        }
      ];
      setFlights(results);
      setIsSearching(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-cyan-500/30">
      <IntelligenceTicker />
      
      {/* Neural Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full bg-grid opacity-20 pointer-events-none z-0"></div>
      <div className="fixed top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-cyan-600/10 glow-blob z-0"></div>
      <div className="fixed bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 glow-blob z-0" style={{ animationDelay: '-5s' }}></div>

      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-slate-900 border border-cyan-500/50 p-2 rounded-xl relative">
              <Plane className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-xl font-space font-bold tracking-tighter block leading-none">PRIME SKY</span>
            <span className="text-[10px] text-cyan-500 font-bold tracking-[0.3em] uppercase opacity-70">Intelligence</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><LayoutDashboard className="w-3 h-3" /> Dashboard</a>
          <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Activity className="w-3 h-3" /> Real-time</a>
          <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Share2 className="w-3 h-3" /> Network</a>
          <button className="bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full hover:bg-white/10 transition-all">
            Login
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 relative z-10 pb-20">
        <header className="text-center py-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-8 animate-bounce">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Quantum Intelligence Hub</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-space font-bold mb-6 tracking-tighter leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Fastest</span> Way <br/>to the Clouds.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 font-medium">
            Next-gen booking protocols with AI market analysis and luxury logistics.
          </p>

          {/* Advanced Search Bar */}
          <div className="max-w-4xl mx-auto glass-card border border-white/10 p-2 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
              <div className="md:col-span-5 flex flex-col text-left px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Departure Point</span>
                <input 
                  type="text" 
                  value={origin} 
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-xl w-full text-white placeholder-slate-600"
                  placeholder="Where from?"
                />
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-white/5 text-cyan-400 hover:rotate-180 transition-all duration-700 cursor-pointer">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col text-left px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Destination</span>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-xl w-full text-white placeholder-slate-600"
                  placeholder="Where to?"
                />
              </div>
              <div className="md:col-span-2 p-1">
                <button 
                  onClick={mockSearch}
                  disabled={isSearching}
                  className="w-full h-full bg-gradient-to-br from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-2xl text-white font-black uppercase tracking-tighter flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSearching ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                <h2 className="text-xl font-space font-bold uppercase tracking-tight">Active Intelligence Feed</h2>
              </div>
              {flights.length > 0 && <span className="text-[10px] font-bold text-slate-500 uppercase px-3 py-1 bg-white/5 rounded-full">Stream Validated</span>}
            </div>
            
            <FlightResults flights={flights} onSelect={(f) => setSelectedFlight(f)} />
            
            {flights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <PriceChart data={priceHistory} />
                <div className="glass-card rounded-3xl p-6 border-white/5 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Network Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">API Latency</span>
                      <span className="font-mono text-cyan-400">24ms</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Global Coverage</span>
                      <span className="font-mono text-cyan-400">99.8%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[85%] animate-[pulse_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            {intel ? (
              <div className="glass-card border-white/10 rounded-[2rem] p-8 shadow-xl animate-in fade-in slide-in-from-right-10 duration-700">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-[0.2em] text-[10px]">Gemini 3 Pro Intelligence</h3>
                  </div>
                  <div className="flex gap-1">
                    {intel.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="text-[8px] font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <MarketForecast status={intel.priceForecast} reason={intel.forecastReason} />

                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Compass className="w-3 h-3 text-cyan-400" /> Current Climate
                    </h4>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{intel.weather}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Activity className="w-3 h-3 text-cyan-400" /> Live News Grounding
                    </h4>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed">{intel.currentEvents}</p>
                  </div>
                </div>

                {intel.webSources && intel.webSources.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Intelligence Sources</h4>
                    <div className="space-y-2">
                      {intel.webSources.slice(0, 2).map((src: any, i: number) => (
                        <a key={i} href={src.uri} target="_blank" className="flex items-center gap-2 text-xs text-cyan-400 hover:underline">
                          <Info className="w-3 h-3" /> {src.title || "Reference Source"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card border-white/10 border-dashed rounded-[2rem] p-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-8 h-8 text-slate-700 animate-pulse" />
                </div>
                <h4 className="text-slate-400 font-bold mb-2">Awaiting Parameters</h4>
                <p className="text-slate-600 text-xs">Enter a route to initialize Gemini Pro deep intelligence gathering.</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-cyan-600 via-indigo-700 to-purple-800 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-150 transition-transform duration-700">
                <Plane className="w-24 h-24 rotate-45" />
              </div>
              <h3 className="text-2xl font-space font-bold mb-3 relative">The Club.</h3>
              <p className="text-white/70 text-sm mb-8 relative leading-relaxed">Unlock dedicated concierge service, private terminal access, and priority routing.</p>
              <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-50 transition-colors relative">
                Apply for Entry
              </button>
            </div>
          </div>
        </div>

        <AirlineExplorer />
      </main>

      {selectedFlight && (
        <BookingFlow 
          flight={selectedFlight} 
          onClose={() => setSelectedFlight(null)} 
        />
      )}

      <footer className="border-t border-white/5 py-12 relative z-10 bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          <div className="flex items-center gap-3">
            <Plane className="w-5 h-5 text-cyan-500" />
            <span className="font-space font-bold tracking-tighter text-lg uppercase">Prime Sky</span>
          </div>
          <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white">API Docs</a>
            <a href="#" className="hover:text-white">Fleet</a>
            <a href="#" className="hover:text-white">Security</a>
          </div>
          <div className="text-right text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © 2025 PRIME SKY DATA SYSTEMS
          </div>
        </div>
      </footer>

      <AIConcierge />
    </div>
  );
};

export default App;
