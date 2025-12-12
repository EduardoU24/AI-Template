export interface UserTermAcceptance {
  id: string;
  userId: string;
  termId: string;
  termVersion: string;
  createdAt: string; // Replaces acceptedAt
  ipAddress: string;
  userAgent: string;
  method: 'web_checkbox' | 'api' | 'implicit';
}

export const USER_TERMS_LOGS: UserTermAcceptance[] = [
  { 
    id: 'log_ut_1', 
    userId: 'u_1', 
    termId: 'term_tos_v1.0', 
    termVersion: '1.0.0',
    createdAt: '2023-05-10T08:05:00Z',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    method: 'web_checkbox'
  },
  { 
    id: 'log_ut_2', 
    userId: 'u_1', 
    termId: 'term_tos_v1.1', 
    termVersion: '1.1.0',
    createdAt: '2024-01-05T09:00:00Z',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
    method: 'web_checkbox'
  },
  { 
    id: 'log_ut_3', 
    userId: 'u_2', 
    termId: 'term_tos_v1.1', 
    termVersion: '1.1.0',
    createdAt: '2024-02-01T14:20:00Z',
    ipAddress: '10.0.0.42',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    method: 'web_checkbox'
  },
];