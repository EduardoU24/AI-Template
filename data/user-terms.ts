
export enum UserTermFlags {
  None = 0,
  WasRead = 1 << 0,
  IsAccepted = 1 << 1,
}

export interface UserTermAcceptance {
  id: string;
  userId: string;
  termId: string;
  createdAt: string;
  updatedAt: string;
  ip: string;
  userAgent: string;
  flags: number;
}

export const DATA: UserTermAcceptance[] = [
  {
    id: 'log_ut_1', 
    userId: 'u_1', 
    termId: 'term_tos_v1.0', 
    createdAt: '2023-05-10T08:05:00Z',
    updatedAt: '2023-05-10T08:05:00Z',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    flags: UserTermFlags.WasRead | UserTermFlags.IsAccepted,
  },
  {
    id: 'log_ut_2', 
    userId: 'u_1', 
    termId: 'term_tos_v1.1', 
    createdAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    flags: UserTermFlags.WasRead,
  },
  {
    id: 'log_ut_3',
    userId: 'u_2',
    termId: 'term_tos_v1.1',
    createdAt: '2024-02-01T14:20:00Z',
    updatedAt: '2024-02-01T14:20:00Z',
    ip: '10.0.0.42',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    flags: UserTermFlags.WasRead,
  },
];
