export enum IAppNotificationFlags {
  None = 0,
  IsInfo = 1 << 0,
  IsSuccess = 1 << 1,
  IsWarning = 1 << 2,
  IsError = 1 << 3,
  IsCelebration = 1 << 4,

  IsFromSystem = 1 << 5,
  IsFromCron = 1 << 6,
  IsFromUser = 1 << 7,
  IsFromAction = 1 << 8,

  HasDuration = 1 << 9,
  IsPersistent = 1 << 10,
}

export interface IAppNotification {
  id: string;
  title: string;
  message?: string;
  icon?: string; 
  duration?: number; // ms, default 5000
  actions?: IAppNotificationAction[];
  onClose?: (id: string) => void;
  createdAt: string;
  updatedAt: string;
  flags: IAppNotificationFlags;
}

export interface IAppNotificationAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const DATA: IAppNotification[] = [
  {
    id: 'welcome_guest',
    title: 'Welcome to OpenDND',
    message: 'We are glad to have you back. Explore the new dashboard features.',
    icon: 'Terminal',
    duration: 8000,
    flags: IAppNotificationFlags.IsInfo,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'auth_required',
    title: 'Knowledge Restricted',
    message: 'You must be authenticated to access the deeper archives of this realm.',
    icon: 'Lock',
    actions: [
      { label: 'Sign In', onClick: () => console.log('Redirecting...'), variant: 'primary' }
    ],
    flags: IAppNotificationFlags.IsWarning,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'maintenance',
    title: 'Arcane Miscalculation',
    message: 'The AI Forge failed to manifest your request. The arcane winds are chaotic today.',
    icon: 'AlertTriangle',
    flags: IAppNotificationFlags.IsWarning,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'celebration',
    title: 'Milestone Achieved!',
    message: 'Your team has surpassed the monthly revenue target by 15%.',
    icon: 'Sparkles',
    duration: 10000,
    flags: IAppNotificationFlags.IsCelebration,
    createdAt: '',
    updatedAt: '',
  }
];
