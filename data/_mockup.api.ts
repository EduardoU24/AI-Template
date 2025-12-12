import { MOCK_DB, MockDatabase } from './_mockup.data';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  status: number;
  meta?: {
    page?: number;
    total?: number;
    timestamp: string;
    affected?: number;
  };
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
  get: async <K extends keyof MockDatabase>(
    collection: K, 
    filterFn?: (item: MockDatabase[K][number]) => boolean,
    options: RequestOptions = {}
  ): Promise<ApiResponse<MockDatabase[K]>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);

    if (options.shouldFail) {
      return { data: null, error: 'Internal Server Error (Simulated)', status: 500 };
    }

    const allItems = MOCK_DB[collection];
    // @ts-ignore
    const filteredItems = filterFn ? allItems.filter(filterFn) : allItems;

    return {
      data: filteredItems as MockDatabase[K],
      status: 200,
      meta: {
        total: filteredItems.length,
        timestamp: new Date().toISOString()
      }
    };
  },

  post: async <K extends keyof MockDatabase>(
    collection: K,
    item: MockDatabase[K][number],
    options: RequestOptions = {}
  ): Promise<ApiResponse<MockDatabase[K][number]>> => {
    
    await wait(options.delay ?? DEFAULT_LATENCY);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };

    // @ts-ignore
    MOCK_DB[collection].push(item);

    return {
      data: item,
      status: 201
    };
  },

  put: async <K extends keyof MockDatabase>(
    collection: K,
    id: string,
    updates: Partial<MockDatabase[K][number]>,
    filterFn?: (item: MockDatabase[K][number]) => boolean, // Optional security check (e.g. ownership)
    options: RequestOptions = {}
  ): Promise<ApiResponse<MockDatabase[K][number]>> => {
    
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

  delete: async <K extends keyof MockDatabase>(
    collection: K,
    id: string,
    filterFn?: (item: MockDatabase[K][number]) => boolean, // Optional security check
    options: RequestOptions = {}
  ): Promise<ApiResponse<boolean>> => {
    
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