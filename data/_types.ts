import { IUser } from './users'

export interface IApiResponse<T> {
  data: T | null;
  error?: string;
  status: number;
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
    affected?: number;
  };
}

// UI & System Types
export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
}

export interface IActivityLog {
  id: string;
  action: string;
  createdAt: string; 
  status: 'success' | 'warning' | 'error';
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface IDebugConfig {
  mockLatency: number;
  showGrid: boolean;
  forceError: boolean;
}