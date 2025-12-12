// Importing base type to ensure compatibility
import { User } from '../app/types';

export interface UserExtended extends User {
  createdAt: string;
  updatedAt: string;
  lastLogin: string; // Specific business logic date, kept alongside normalized dates
  status: number; // Bitwise UserStatus
  preferences: number; // Bitwise UserPreferences
}

export enum UserRole {
  None = 0,
  Guest = 1 << 0,       // 1
  User = 1 << 1,        // 2
  Admin = 1 << 2,       // 4
  SuperAdmin = 1 << 3   // 8
}

// User Status (Bitwise)
export enum UserStatus {
  None = 0,
  Pending = 1 << 0,
  Active = 1 << 1,
  Suspended = 1 << 2,
  Deleted = 1 << 3
}

// User Preferences (Bitwise)
export enum UserPreferences {
  None = 0,
  Notifications = 1 << 0,
  Newsletter = 1 << 1,
  DarkTheme = 1 << 2,
  BetaTester = 1 << 3
}

export const USERS_DATA: UserExtended[] = [
  { 
    id: 'u_1', 
    name: 'Alice Admin', 
    email: 'alice@opendnd.dev', 
    role: UserRole.Admin | UserRole.User, 
    avatar: 'https://picsum.photos/200',
    createdAt: '2023-05-10T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    lastLogin: '2024-03-10T14:30:00Z',
    status: UserStatus.Active,
    preferences: UserPreferences.Notifications | UserPreferences.Newsletter | UserPreferences.BetaTester
  },
  { 
    id: 'u_2', 
    name: 'Bob Builder', 
    email: 'bob@opendnd.dev', 
    role: UserRole.User, 
    avatar: 'https://picsum.photos/201',
    createdAt: '2023-06-15T09:00:00Z',
    updatedAt: '2024-03-09T10:15:00Z',
    lastLogin: '2024-03-09T10:15:00Z',
    status: UserStatus.Active,
    preferences: UserPreferences.Notifications
  },
  { 
    id: 'u_3', 
    name: 'Charlie Guest', 
    email: 'charlie@opendnd.dev', 
    role: UserRole.Guest, 
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-02-20T11:00:00Z',
    lastLogin: '2024-02-20T11:00:00Z',
    status: UserStatus.Pending,
    preferences: UserPreferences.None
  },
];