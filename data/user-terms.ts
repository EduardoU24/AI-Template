
import { IUserOwnedTEntryTFlags, DATA as USERS } from './users.ts';
import { IAppTerm, DATA as APP_TERMS } from './app-terms.ts';

export enum IUserTermFlags {
  None = 0,
  WasRead = 1 << 0,
  IsAccepted = 1 << 1,
}

// Extend the generic to include audit fields specific to terms acceptance
export interface UserTermRecord extends IUserOwnedTEntryTFlags<IAppTerm, IUserTermFlags> {
  ip: string;
  userAgent: string;
}

export const DATA: UserTermRecord[] = [
  {
    id: 'log_ut_1',
    userId: USERS[0].id,
    user: USERS[0],
    entryId: APP_TERMS[0].id, // 'term_tos_v1.0'
    entry: APP_TERMS[0],
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    createdAt: '2023-05-10T08:05:00Z',
    updatedAt: '2023-05-10T08:05:00Z',
    flags: IUserTermFlags.WasRead | IUserTermFlags.IsAccepted,
  },
  {
    id: 'log_ut_2',
    userId: USERS[0].id,
    user: USERS[0],
    entryId: APP_TERMS[1].id, // 'term_tos_v1.1'
    entry: APP_TERMS[1],
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
    flags: IUserTermFlags.WasRead,
  },
  {
    id: 'log_ut_3',
    userId: USERS[1].id,
    user: USERS[1],
    entryId: APP_TERMS[1].id, // 'term_tos_v1.1'
    entry: APP_TERMS[1],
    ip: '10.0.0.42',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    createdAt: '2024-02-01T14:20:00Z',
    updatedAt: '2024-02-01T14:20:00Z',
    flags: IUserTermFlags.WasRead,
  },
];
