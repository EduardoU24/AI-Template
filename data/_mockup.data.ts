import { APP_CONFIGS, AppConfig } from './app-configs';
import { APP_TERMS, AppTerm } from './app-terms';
import { USERS_DATA, UserExtended } from './users';
import { USER_TERMS_LOGS, UserTermAcceptance } from './user-terms';
import { APP_ROUTES, AppRoute } from './app-routes';

/**
 * MOCK_DB
 * This object acts as the single source of truth for the mockup backend.
 * In a real application, these would be separate database tables.
 */
export interface MockDatabase {
  configs: AppConfig[];
  terms: AppTerm[];
  users: UserExtended[];
  userTerms: UserTermAcceptance[];
  routes: AppRoute[];
}

export const MOCK_DB: MockDatabase = {
  configs: [APP_CONFIGS],
  terms: [...APP_TERMS],
  users: [...USERS_DATA],
  userTerms: [...USER_TERMS_LOGS],
  routes: [...APP_ROUTES],
};

// Helper to reset DB if we implement write operations in the future
export const resetMockDb = () => {
  MOCK_DB.configs = [APP_CONFIGS];
  MOCK_DB.terms = [...APP_TERMS];
  MOCK_DB.users = [...USERS_DATA];
  MOCK_DB.userTerms = [...USER_TERMS_LOGS];
  MOCK_DB.routes = [...APP_ROUTES];
};