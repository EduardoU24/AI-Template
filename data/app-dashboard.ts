
export interface IDasboardStats {
  activeUsers: number;
  revenue: number;
  serverLatency: number;
  errors: number;
}

export interface IAppActivityLog {
  id: string;
  action: string;
  createdAt: string; 
  status: 'success' | 'warning' | 'error';
}

export const STATS: IDasboardStats = {
  activeUsers: 14205,
  revenue: 84300,
  serverLatency: 45,
  errors: 12,
};

export const LOGS: IAppActivityLog[] = [
  { id: '101', action: 'System Deployment', createdAt: '10 mins ago', status: 'success' },
  { id: '102', action: 'Database Migration', createdAt: '1 hour ago', status: 'warning' },
  { id: '103', action: 'User Sync', createdAt: '2 hours ago', status: 'success' },
  { id: '104', action: 'Payment Gateway', createdAt: '5 hours ago', status: 'error' },
  { id: '105', action: 'Cache Invalidated', createdAt: '1 day ago', status: 'success' },
];