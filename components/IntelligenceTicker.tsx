
import React from 'react';
import { Radio, Zap, Globe } from 'lucide-react';

const IntelligenceTicker: React.FC = () => {
  const messages = [
    "LHR Airport: 15% drop in landing fees predicted for Q4",
    "Emirates: New First Class suite availability from DXB to JFK",
    "Weather Alert: Heavy fog in SIN may affect morning arrivals",
    "Price Pulse: Transatlantic routes showing 3-year low in Premium Economy",
    "Tech Update: AI Concierge upgraded to Gemini 3 Pro Intelligence"
  ];

  return (
    <div className="bg-slate-950/80 border-b border-white/5 py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50 backdrop-blur-md">
      <div className="flex animate-[ticker_60s_linear_infinite]">
        {[...messages, ...messages].map((msg, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-10">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              {msg}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default IntelligenceTicker;
