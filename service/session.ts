/**
 * Session Manager
 * Simulates a server-side session or a client-side auth context
 * to allow services to infer "current user".
 */

export const SessionManager = {
  // Default to the first user (Alice Admin) for development convenience
  currentUserId: 'u_1',

  getSession: () => {
    return SessionManager.currentUserId;
  },

  setSession: (userId: string) => {
    SessionManager.currentUserId = userId;
  },

  clearSession: () => {
    SessionManager.currentUserId = '';
  }
};