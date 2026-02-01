
import React, { useState, useEffect } from 'react';
import { X, User, CreditCard, CheckCircle, ShieldCheck, Cpu, Plane, Fingerprint, Sparkles } from 'lucide-react';
import { Flight, Passenger } from '../types';

interface BookingFlowProps {
  flight: Flight;
  onClose: () => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ flight, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [passenger, setPassenger] = useState<Passenger>({
    firstName: '',
    lastName: '',
    email: '',
    passportNumber: '',
    seat: '12A'
  });

  const seats = Array.from({ length: 24 }, (_, i) => ({
    id: `${Math.floor(i / 4) + 1}${['A', 'B', 'C', 'D'][i % 4]}`,
    occupied: Math.random() > 0.8
  }));

  const handleNext = () => {
    if (step === 'details') setStep('payment');
    else if (step === 'payment') {
      setStep('processing');
      setTimeout(() => setStep('success'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl glass-card border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
        
        {/* Left Info Panel */}
        <div className="md:w-1/3 bg-gradient-to-br from-slate-900 to-slate-950 p-8 border-r border-white/5">
          <div className="flex items-center gap-2 text-cyan-500 mb-8">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Neural Checkout</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center p-2">
                <img src={flight.airlineLogo} alt={flight.airline} className="w-full h-full object-contain filter brightness-200" />
              </div>
              <div>
                <h3 className="font-space font-bold text-white">{flight.airline}</h3>
                <p className="text-xs text-slate-500">{flight.class} Intelligence</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Route</span>
                <span className="font-space font-bold text-white">{flight.origin} → {flight.destination}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Fare</span>
                <span className="font-space font-bold text-cyan-400">${flight.price}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Protocol Fee</span>
                <span className="font-space font-bold text-white">$12.00</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-xs font-black text-white uppercase tracking-tighter">Total</span>
                <span className="text-2xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                  ${flight.price + 12}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Flow Panel */}
        <div className="flex-1 p-8 md:p-12 bg-slate-900/40 relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>

          {step === 'details' && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
              <h2 className="text-3xl font-space font-bold text-white mb-2">Identity Matrix</h2>
              <p className="text-sm text-slate-400 mb-8">Synchronize passenger biometric and passport data.</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">First Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 transition-colors text-white text-sm"
                    value={passenger.firstName}
                    onChange={e => setPassenger({...passenger, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Last Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 transition-colors text-white text-sm"
                    value={passenger.lastName}
                    onChange={e => setPassenger({...passenger, lastName: e.target.value})}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Digital Identity (Email)</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500/50 transition-colors text-white text-sm"
                    value={passenger.email}
                    onChange={e => setPassenger({...passenger, email: e.target.value})}
                  />
                </div>
              </div>

              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Neural Seat Map</h3>
              <div className="grid grid-cols-4 gap-2 max-w-[200px] mb-10">
                {seats.map(seat => (
                  <button
                    key={seat.id}
                    disabled={seat.occupied}
                    onClick={() => setPassenger({...passenger, seat: seat.id})}
                    className={`h-8 rounded-lg text-[10px] font-bold border transition-all ${
                      seat.occupied ? 'bg-slate-800 border-transparent text-slate-600 cursor-not-allowed' :
                      passenger.seat === seat.id ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' :
                      'bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/30'
                    }`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors"
              >
                Continue to Secure Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
              <h2 className="text-3xl font-space font-bold text-white mb-2">Secure Transfer</h2>
              <p className="text-sm text-slate-400 mb-8">Execute encrypted credit or digital credit transaction.</p>

              <div className="space-y-4 mb-10">
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between group cursor-pointer hover:border-cyan-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Neural Credit Card</p>
                      <p className="text-[10px] text-slate-500 font-mono">**** **** **** 4242</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 flex items-center justify-between group cursor-pointer hover:border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-400">Prime Biometric Credits</p>
                      <p className="text-[10px] text-slate-600">Balance: 4,200 PC</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-8">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">End-to-End Quantum Encryption Active</p>
              </div>

              <button 
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-cyan-900/20 hover:scale-[1.02] transition-transform"
              >
                Authorize Payment (${flight.price + 12})
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin relative"></div>
                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-space font-bold text-white mb-2">Handshaking...</h2>
              <p className="text-xs text-slate-500 tracking-widest uppercase">Validating Neural Reservation Protocol</p>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/30">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-space font-bold text-white mb-2">Reservation Locked</h2>
              <p className="text-sm text-slate-400 mb-10 max-w-xs mx-auto">
                Identity verified. Your boarding matrix has been synced to your digital wallet.
              </p>

              <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-5 h-5 text-cyan-400 opacity-50" />
                </div>
                <div className="flex justify-between items-start mb-4">
                   <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Access Code</span>
                    <p className="font-mono text-cyan-400 text-xl font-bold">PS-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                   </div>
                   <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gate</span>
                    <p className="font-mono text-white text-xl font-bold">B14</p>
                   </div>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    "Prepare for departure. Your AI Concierge has analyzed the destination for optimal experience."
                  </p>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="mt-10 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-colors"
              >
                Dismiss Intelligence
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
