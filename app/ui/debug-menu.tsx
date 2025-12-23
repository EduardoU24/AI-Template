import React, { useState } from 'react';
import { Settings, X, Activity, Zap, Bug, Bell, FlaskConical } from 'lucide-react';
import { IDebugConfig } from '../../data/_types.ts';
import { useNotification } from './notification-center.tsx';
import { APP_NOTIFICATION_TEMPLATES } from '../../data/app-notifications.ts';

interface DebugOverlayProps {
  config: IDebugConfig;
  onUpdate: (newConfig: IDebugConfig) => void;
}

export const DebugMenu: React.FC<DebugOverlayProps> = ({ config, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notify } = useNotification();

  const triggerTestNotification = (key: string) => {
    const template = APP_NOTIFICATION_TEMPLATES[key];
    if (template) {
      notify({
        ...template,
        type: template.type as any,
        title: template.title!,
        message: template.message!,
        actions: key === 'WELCOME' ? [
          { label: 'View Settings', onClick: () => console.log('Redirect to settings...'), variant: 'primary' },
          { label: 'Dismiss', onClick: () => {}, variant: 'ghost' }
        ] : undefined
      });
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[110] p-3 bg-slate-800 border border-slate-700 text-brand-500 rounded-full shadow-2xl hover:bg-slate-700 transition-all hover:scale-110"
      >
        <Bug className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[110] w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2 text-brand-500 font-semibold">
          <Settings className="w-4 h-4" />
          <span>OpenDND Debug</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Network & Config */}
        <section className="space-y-4 pb-4 border-b border-slate-800">
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
        </section>

        {/* Notification Lab */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
             <Bell className="w-3 h-3" /> Notification Lab
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => triggerTestNotification('WELCOME')}
              className="px-2 py-2 text-[10px] bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Info (Actions)
            </button>
            <button 
              onClick={() => triggerTestNotification('MAINTENANCE')}
              className="px-2 py-2 text-[10px] bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Warning
            </button>
            <button 
              onClick={() => triggerTestNotification('ERROR_GENERIC')}
              className="px-2 py-2 text-[10px] bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Error
            </button>
            <button 
              onClick={() => triggerTestNotification('GOAL_REACHED')}
              className="px-2 py-2 text-[10px] bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Celebration
            </button>
          </div>
          <button 
            onClick={() => notify({
              type: 'success',
              title: 'Manual Success',
              message: 'Triggered directly from the lab.',
              duration: 3000
            })}
            className="w-full px-2 py-2 text-[10px] bg-brand-500/10 border border-brand-500/20 rounded hover:bg-brand-500/20 text-brand-400 font-medium transition-colors"
          >
            Trigger Success Toast
          </button>
        </section>

        <div className="pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">OpenDND Framework v2.0.0-alpha</p>
        </div>
      </div>
    </div>
  );
};