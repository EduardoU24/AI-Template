
import { IApiResponse } from '../_types.ts';
import { MOCK_DB } from '../_mockup.data.ts';
import { IMockDatabase } from '../_mockup.api.ts';

/**
 * Strategy Pattern Interface for Data Operations.
 * This allows swapping the Mock implementation for a real API/SDK (e.g. Supabase, Firebase, or Custom REST)
 * without changing the Service consumption layer.
 */
export interface IDataProvider {
  get<K extends keyof IMockDatabase>(
    collection: K, 
    filterFn?: (item: IMockDatabase[K][number]) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<IMockDatabase[K]>>;

  post<K extends keyof IMockDatabase>(
    collection: K,
    item: IMockDatabase[K][number],
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<IMockDatabase[K][number]>>;

  put<K extends keyof IMockDatabase>(
    collection: K,
    id: string,
    updates: Partial<IMockDatabase[K][number]>,
    filterFn?: (item: IMockDatabase[K][number]) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<IMockDatabase[K][number]>>;

  delete<K extends keyof IMockDatabase>(
    collection: K,
    id: string,
    filterFn?: (item: IMockDatabase[K][number]) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<boolean>>;
}

/**
 * Mock implementation that uses internal memory and provides debug features.
 */
export class MockDataProvider implements IDataProvider {
  private defaultLatency = 400;

  private async wait(ms?: number) {
    await new Promise(resolve => setTimeout(resolve, ms ?? this.defaultLatency));
  }

  async get<K extends keyof IMockDatabase>(collection: K, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    if (options.shouldFail) return { data: null, error: 'Simulated Network Error', status: 500 };
    
    const items = MOCK_DB[collection];
    const filtered = filterFn ? items.filter(filterFn) : items;
    
    return {
      data: filtered as any,
      status: 200,
      meta: { total: filtered.length, timestamp: new Date().toISOString() }
    };
  }

  async post<K extends keyof IMockDatabase>(collection: K, item: any, options: any = {}) {
    await this.wait(options.delay);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };
    (MOCK_DB[collection] as any[]).push(item);
    return { data: item, status: 201 };
  }

  async put<K extends keyof IMockDatabase>(collection: K, id: string, updates: any, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    const index = (MOCK_DB[collection] as any[]).findIndex(i => i.id === id);
    if (index === -1) return { data: null, error: 'Not Found', status: 404 };
    
    const current = MOCK_DB[collection][index];
    if (filterFn && !filterFn(current)) return { data: null, error: 'Forbidden', status: 403 };
    
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    (MOCK_DB[collection] as any[])[index] = updated;
    return { data: updated, status: 200 };
  }

  async delete<K extends keyof IMockDatabase>(collection: K, id: string, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    const index = (MOCK_DB[collection] as any[]).findIndex(i => i.id === id);
    if (index === -1) return { data: false, error: 'Not Found', status: 404 };
    
    if (filterFn && !filterFn(MOCK_DB[collection][index])) return { data: false, error: 'Forbidden', status: 403 };
    
    (MOCK_DB[collection] as any[]).splice(index, 1);
    return { data: true, status: 200 };
  }
}

// Internal singleton instance
let activeProvider: IDataProvider | null = null;

/**
 * Gets the current data provider. Lazily initializes the Mock provider if none is set.
 */
export function getProvider(): IDataProvider {
  if (!activeProvider) {
    activeProvider = new MockDataProvider();
  }
  return activeProvider;
}

/**
 * Swaps the data provider implementation (Strategy Pattern).
 */
export function setProvider(p: IDataProvider): void { 
  activeProvider = p; 
}
