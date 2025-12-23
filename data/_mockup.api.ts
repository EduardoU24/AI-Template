import { MOCK_DB } from './_mockup.data.ts';
import { IApiResponse } from './_types.ts';

import { IUser, IUserExtended } from './users'
import { IAppConfig } from './app-configs'
import { IAppTerm } from './app-terms'
import { AppRoute } from './app-routes'
import { UserTermAcceptance } from './user-terms'
import { UserNotificationRecord } from './user-notifications'

// Mock Database Structure
export interface IMockDatabase {
  configs: IAppConfig[];
  terms: IAppTerm[];
  users: IUserExtended[];
  userTerms: UserTermAcceptance[];
  routes: AppRoute[];
  notifications: UserNotificationRecord[];
}

interface RequestOptions {
  delay?: number; // Override default latency
  shouldFail?: boolean; // Force an error for testing
}

const DEFAULT_LATENCY = 400;

/**
 * Simulates a network delay
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic Mock API Handler
 * Simulates the server processing a request
 */
export const mockApi = {
  get: async <K extends keyof IMockDatabase>(
    collection: K, 
    filterFn?: (item: IMockDatabase[K][number]) => boolean,
    options: RequestOptions = {}
  ): Promise<IApiResponse<IMockDatabase[K]>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);

    if (options.shouldFail) {
      return { data: null, error: 'Internal Server Error (Simulated)', status: 500 };
    }

    const allItems = MOCK_DB[collection];
    // @ts-ignore
    const filteredItems = filterFn ? allItems.filter(filterFn) : allItems;

    return {
      data: filteredItems as IMockDatabase[K],
      status: 200,
      meta: {
        total: filteredItems.length,
        timestamp: new Date().toISOString()
      }
    };
  },

  post: async <K extends keyof IMockDatabase>(
    collection: K,
    item: IMockDatabase[K][number],
    options: RequestOptions = {}
  ): Promise<IApiResponse<IMockDatabase[K][number]>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };

    // @ts-ignore
    MOCK_DB[collection].push(item);

    return {
      data: item,
      status: 201
    };
  },

  put: async <K extends keyof IMockDatabase>(
    collection: K,
    id: string,
    updates: Partial<IMockDatabase[K][number]>,
    filterFn?: (item: IMockDatabase[K][number]) => boolean, // Optional security check (e.g. ownership)
    options: RequestOptions = {}
  ): Promise<IApiResponse<IMockDatabase[K][number]>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };

    // @ts-ignore
    const index = MOCK_DB[collection].findIndex((item: any) => item.id === id);
    
    if (index === -1) {
      return { data: null, error: 'Not Found', status: 404 };
    }

    const currentItem = MOCK_DB[collection][index];

    // If a filter is provided, ensure the item matches it before updating (Simulates RLS/Ownership check)
    // @ts-ignore
    if (filterFn && !filterFn(currentItem)) {
      return { data: null, error: 'Forbidden', status: 403 };
    }

    // Merge updates
    const updatedItem = { ...currentItem, ...updates, updatedAt: new Date().toISOString() };
    // @ts-ignore
    MOCK_DB[collection][index] = updatedItem;

    return {
      data: updatedItem,
      status: 200
    };
  },

  delete: async <K extends keyof IMockDatabase>(
    collection: K,
    id: string,
    filterFn?: (item: IMockDatabase[K][number]) => boolean, // Optional security check
    options: RequestOptions = {}
  ): Promise<IApiResponse<boolean>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };

    // @ts-ignore
    const index = MOCK_DB[collection].findIndex((item: any) => item.id === id);
    
    if (index === -1) {
      return { data: false, error: 'Not Found', status: 404 };
    }

    const currentItem = MOCK_DB[collection][index];

    // @ts-ignore
    if (filterFn && !filterFn(currentItem)) {
      return { data: false, error: 'Forbidden', status: 403 };
    }

    // @ts-ignore
    MOCK_DB[collection].splice(index, 1);

    return {
      data: true,
      status: 200
    };
  }
};