import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Card } from '../../../ui/card';

interface StatCardProps { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  trend?: string;
  onGenerateInsight: () => void;
  insight?: string;
  loadingInsight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, onGenerateInsight, insight, loadingInsight }) => (
  <Card className="relative overflow-hidden">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg text-slate-400">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <div className="mb-1">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
    
    <div className="mt-4 pt-4 border-t border-slate-800">
      <button 
        onClick={onGenerateInsight}
        disabled={loadingInsight}
        className="text-xs flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors disabled:opacity-50"
      >
        <BrainCircuit className="w-3 h-3" />
        {insight ? "Regenerate Insight" : "Ask AI Insight"}
      </button>
      {insight && (
        <p className="mt-2 text-xs text-slate-400 italic bg-slate-950/50 p-2 rounded border border-slate-800/50 animate-in fade-in">
          "{insight}"
        </p>
      )}
    </div>
  </Card>
);

export default StatCard;