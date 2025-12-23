import { IMockDatabase } from './_mockup.api.ts';

// Dynamic imports from domain files
import { DATA as USERS } from './users.ts';
import { DATA as CONFIG } from './app-configs.ts';
import { DATA as TERMS } from './app-terms.ts';
import { DATA as ROUTES } from './app-routes.ts';
import { DATA as USER_TERMS } from './user-terms.ts';
import { DATA as NOTIFICATIONS } from './user-notifications.ts';

export const MOCK_DB: IMockDatabase = {
  configs: [CONFIG],
  terms: [...TERMS],
  users: [...USERS],
  userTerms: [...USER_TERMS],
  routes: [...ROUTES],
  notifications: [...NOTIFICATIONS],
};

export const resetMockDb = () => {
  MOCK_DB.configs = [CONFIG];
  MOCK_DB.terms = [...TERMS];
  MOCK_DB.users = [...USERS];
  MOCK_DB.userTerms = [...USER_TERMS];
  MOCK_DB.routes = [...ROUTES];
  MOCK_DB.notifications = [...NOTIFICATIONS];
};
