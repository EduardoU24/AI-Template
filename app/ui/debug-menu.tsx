import React, { useState } from 'react';
import { Settings, X, Activity, Zap, Bug } from 'lucide-react';
import { DebugConfig } from '../types';

interface DebugOverlayProps {
  config: DebugConfig;
  onUpdate: (newConfig: DebugConfig) => void;
}

export const DebugMenu: React.FC<DebugOverlayProps> = ({ config, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-slate-800 border border-slate-700 text-brand-500 rounded-full shadow-2xl hover:bg-slate-700 transition-all hover:scale-110"
      >
        <Bug className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2 text-brand-500 font-semibold">
          <Settings className="w-4 h-4" />
          <span>OpenDND Debug</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Mock Latency</span>
            <span className="text-brand-500 font-mono">{config.mockLatency}ms</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="100"
            value={config.mockLatency}
            onChange={(e) => onUpdate({ ...config, mockLatency: parseInt(e.target.value) })}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Force Errors
          </span>
          <button 
            onClick={() => onUpdate({ ...config, forceError: !config.forceError })}
            className={`w-10 h-6 rounded-full transition-colors relative ${config.forceError ? 'bg-red-500' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${config.forceError ? 'left-5' : 'left-1'}`} />
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">OpenDND Framework v2.0.0-alpha</p>
        </div>
      </div>
    </div>
  );
};