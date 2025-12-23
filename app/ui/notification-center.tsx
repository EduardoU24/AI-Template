import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, Info, Trophy, X, Terminal, Bell
} from 'lucide-react';
import { AppNotification, NotificationType } from '../../data/app-notifications';
import { Button } from './button.tsx';

interface NotificationContextType {
  notifications: AppNotification[];
  notify: (notification: Omit<AppNotification, 'id'>) => string;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};

const TYPE_CONFIG = {
  success: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  info: { icon: Info, color: 'text-brand-500', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
  celebration: { icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-900/20', border: 'border-purple-500/50' },
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => {
      const target = prev.find(n => n.id === id);
      if (target?.onClose) target.onClose();
      return prev.filter(n => n.id !== id);
    });
  }, []);

  const notify = useCallback((notification: Omit<AppNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    if (notification.duration !== 0) {
      setTimeout(() => dismiss(id), notification.duration || 5000);
    }

    return id;
  }, [dismiss]);

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
      <NotificationPortal notifications={notifications} dismiss={dismiss} />
    </NotificationContext.Provider>
  );
};

const NotificationPortal: React.FC<{ notifications: AppNotification[], dismiss: (id: string) => void }> = ({ notifications, dismiss }) => {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
      {notifications.map(note => (
        <NotificationItem key={note.id} notification={note} onDismiss={() => dismiss(note.id)} />
      ))}
    </div>
  );
};

const NotificationItem: React.FC<{ notification: AppNotification, onDismiss: () => void }> = ({ notification, onDismiss }) => {
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <div className={`pointer-events-auto relative overflow-hidden flex flex-col p-4 rounded-xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-300 ${config.bg} ${config.border}`}>
      {/* Celebration Sparkles (Simulated) */}
      {notification.type === 'celebration' && (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent animate-pulse" />
      )}

      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-slate-900/50 ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white mb-1">{notification.title}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{notification.message}</p>
          
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {notification.actions.map((action, i) => (
                <Button 
                  key={i} 
                  variant={action.variant || 'ghost'} 
                  className="h-7 px-3 text-[10px]" 
                  onClick={() => {
                    action.onClick();
                    onDismiss();
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <button onClick={onDismiss} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      {notification.duration !== 0 && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full overflow-hidden">
          <div 
            className={`h-full opacity-50 ${config.color.replace('text-', 'bg-')}`} 
            style={{ animation: `progress ${notification.duration || 5000}ms linear forwards` }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};