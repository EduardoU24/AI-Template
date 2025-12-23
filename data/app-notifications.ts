export type NotificationType = 'success' | 'warning' | 'error' | 'info' | 'celebration';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon?: string;
  duration?: number;
  actions?: NotificationAction[];
  onClose?: () => void;
  isRead?: boolean;
}

export const APP_NOTIFICATION_TEMPLATES: Record<string, Partial<AppNotification>> = {
  WELCOME: {
    type: 'info',
    title: 'Welcome to OpenDND',
    message: 'We are glad to have you back. Explore the new dashboard features.',
    icon: 'Terminal',
    duration: 6000
  },
  MAINTENANCE: {
    type: 'warning',
    title: 'Scheduled Maintenance',
    message: 'System will be offline for 2 hours tonight starting at 12:00 AM UTC.',
    icon: 'AlertTriangle'
  },
  ERROR_GENERIC: {
    type: 'error',
    title: 'System Error',
    message: 'We encountered an issue processing your last request. Please try again.',
    icon: 'XCircle'
  },
  GOAL_REACHED: {
    type: 'celebration',
    title: 'Milestone Achieved!',
    message: 'Your team has surpassed the monthly revenue target by 15%.',
    icon: 'Trophy',
    duration: 8000
  }
};