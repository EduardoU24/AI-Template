/**
 * Mock Session Manager
 * Simulates a server-side session or a client-side auth context
 * to allow services to infer "current user".
 */

export const MockSession = {
  // Default to the first user (Alice Admin) for development convenience
  currentUserId: 'u_1',

  getSession: () => {
    return MockSession.currentUserId;
  },

  setSession: (userId: string) => {
    MockSession.currentUserId = userId;
  },

  clearSession: () => {
    MockSession.currentUserId = '';
  }
};