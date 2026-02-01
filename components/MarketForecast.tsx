
import React from 'react';
import { TrendingUp, TrendingDown, Minus, ShieldCheck, AlertCircle } from 'lucide-react';

interface ForecastProps {
  status: 'BUY' | 'WAIT' | 'NEUTRAL';
  reason: string;
}

const MarketForecast: React.FC<ForecastProps> = ({ status, reason }) => {
  const config = {
    BUY: { icon: <TrendingDown className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Strong Buy', border: 'border-emerald-500/30' },
    WAIT: { icon: <TrendingUp className="w-5 h-5" />, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Wait Recommended', border: 'border-rose-500/30' },
    NEUTRAL: { icon: <Minus className="w-5 h-5" />, color: 'text-slate-400', bg: 'bg-slate-500/10', label: 'Stable Market', border: 'border-slate-500/30' }
  };

  const current = config[status];

  return (
    <div className={`p-4 rounded-2xl border ${current.border} ${current.bg} transition-all duration-500`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`${current.color}`}>
            {current.icon}
          </div>
          <span className={`font-bold text-sm uppercase tracking-wider ${current.color}`}>{current.label}</span>
        </div>
        <div className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 uppercase">AI Analytics</div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed italic">"{reason}"</p>
    </div>
  );
};

export default MarketForecast;
