import { ActivityLog, MockStats, User } from '../app/types';
import { UserRole } from './users';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Admin', email: 'alice@opendnd.dev', role: UserRole.Admin, avatar: 'https://picsum.photos/200' },
  { id: '2', name: 'Bob Builder', email: 'bob@opendnd.dev', role: UserRole.User, avatar: 'https://picsum.photos/201' },
];

export const INITIAL_STATS: MockStats = {
  activeUsers: 14205,
  revenue: 84300,
  serverLatency: 45,
  errors: 12,
};

export const MOCK_LOGS: ActivityLog[] = [
  { id: '101', action: 'System Deployment', createdAt: '10 mins ago', status: 'success' },
  { id: '102', action: 'Database Migration', createdAt: '1 hour ago', status: 'warning' },
  { id: '103', action: 'User Sync', createdAt: '2 hours ago', status: 'success' },
  { id: '104', action: 'Payment Gateway', createdAt: '5 hours ago', status: 'error' },
  { id: '105', action: 'Cache Invalidated', createdAt: '1 day ago', status: 'success' },
];

// Simulates API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));