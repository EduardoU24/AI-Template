export interface User {
  id: string;
  name: string;
  email: string;
  role: number; // Bitwise UserRole
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface MockStats {
  activeUsers: number;
  revenue: number;
  serverLatency: number;
  errors: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  createdAt: string; // Replaces timestamp
  status: 'success' | 'warning' | 'error';
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface DebugConfig {
  mockLatency: number;
  showGrid: boolean;
  forceError: boolean;
}