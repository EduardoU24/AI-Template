
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: number; // Bitwise UserRole
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserExtended extends IUser {
  lastLogin: string;
  status: number;
  preferences: number;
}

export enum UserRoleType {
  Guest = 0,
  User = 1,
  Admin = 2,
  SuperAdmin = 3,
}

export enum UserStatusFlags {
  None = 0,
  Pending = 1 << 0,
  Active = 1 << 1,
  Suspended = 1 << 2,
  Deleted = 1 << 3,
}

export enum UserPreferencesFlags {
  None = 0,
  Notifications = 1 << 0,
  Newsletter = 1 << 1,
  DarkTheme = 1 << 2,
  BetaTester = 1 << 3,
}

export const DATA: IUserExtended[] = [
  { 
    id: 'u_1', 
    name: 'Alice Admin', 
    email: 'alice@opendnd.dev', 
    role: UserRoleType.Admin | UserRoleType.User, 
    avatar: 'https://picsum.photos/200',
    createdAt: '2023-05-10T08:00:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    lastLogin: '2024-03-10T14:30:00Z',
    status: UserStatusFlags.Active,
    preferences: UserPreferencesFlags.Notifications | UserPreferencesFlags.Newsletter | UserPreferencesFlags.BetaTester
  },
  { 
    id: 'u_2', 
    name: 'Bob Builder', 
    email: 'bob@opendnd.dev', 
    role: UserRoleType.User, 
    avatar: 'https://picsum.photos/201',
    createdAt: '2023-06-15T09:00:00Z',
    updatedAt: '2024-03-09T10:15:00Z',
    lastLogin: '2024-03-09T10:15:00Z',
    status: UserStatusFlags.Active,
    preferences: UserPreferencesFlags.Notifications
  },
  { 
    id: 'u_3', 
    name: 'Charlie Guest', 
    email: 'charlie@opendnd.dev', 
    role: UserRoleType.Guest, 
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-02-20T11:00:00Z',
    lastLogin: '2024-02-20T11:00:00Z',
    status: UserStatusFlags.Pending,
    preferences: UserPreferencesFlags.None
  },
];

import { createService } from './service/index.ts';
import { MockSession } from './_mockup.session.ts';

export const UserService = {
  ...createService<IUserExtended>('users'),
  getMe: () => createService<IUserExtended>('users').findOne(MockSession.getSession())
};
