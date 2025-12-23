
import { IUser } from './users.ts';
import { IActivityLog } from './_types.ts';
import { UserRoleType } from './users.ts';

export interface MockStats {
  activeUsers: number;
  revenue: number;
  serverLatency: number;
  errors: number;
}

export const MOCK_USERS: IUser[] = [
  // Added createdAt and updatedAt to fix TypeScript interface errors
  { id: '1', name: 'Alice Admin', email: 'alice@opendnd.dev', role: UserRoleType.Admin, avatar: 'https://picsum.photos/200', createdAt: '2023-05-10T08:00:00Z', updatedAt: '2024-03-10T14:30:00Z' },
  { id: '2', name: 'Bob Builder', email: 'bob@opendnd.dev', role: UserRoleType.User, avatar: 'https://picsum.photos/201', createdAt: '2023-06-15T09:00:00Z', updatedAt: '2024-03-09T10:15:00Z' },
];

export const INITIAL_STATS: MockStats = {
  activeUsers: 14205,
  revenue: 84300,
  serverLatency: 45,
  errors: 12,
};

export const MOCK_LOGS: IActivityLog[] = [
  { id: '101', action: 'System Deployment', createdAt: '10 mins ago', status: 'success' },
  { id: '102', action: 'Database Migration', createdAt: '1 hour ago', status: 'warning' },
  { id: '103', action: 'User Sync', createdAt: '2 hours ago', status: 'success' },
  { id: '104', action: 'Payment Gateway', createdAt: '5 hours ago', status: 'error' },
  { id: '105', action: 'Cache Invalidated', createdAt: '1 day ago', status: 'success' },
];

// Simulates API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));