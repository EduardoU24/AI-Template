
import { IDataProvider } from './provider.ts';
import { IApiResponse } from '../data/_types.ts';

/**
 * In-memory storage registry for the MemoryStrategy.
 */
const MEMORY_REGISTRY: Record<string, any[]> = {};

/**
 * MemoryStrategy: An implementation of IDataProvider that uses 
 * an in-memory registry. Ideal for mocking, testing, or offline-first apps.
 */
export class MemoryStrategy implements IDataProvider {
  private defaultLatency = 400;

  private async wait(ms?: number) {
    await new Promise(resolve => setTimeout(resolve, ms ?? this.defaultLatency));
  }

  seed(collection: string, data: any[]) {
    if (!MEMORY_REGISTRY[collection]) {
      MEMORY_REGISTRY[collection] = [...data];
    }
  }

  async get(collection: string, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    if (options.shouldFail) return { data: null, error: 'Simulated Network Error', status: 500 };
    
    const items = MEMORY_REGISTRY[collection] || [];
    const filtered = filterFn ? items.filter(filterFn) : items;
    
    return {
      data: filtered,
      status: 200,
      meta: { total: filtered.length, timestamp: new Date().toISOString() }
    };
  }

  async post(collection: string, item: any, options: any = {}) {
    await this.wait(options.delay);
    if (options.shouldFail) return { data: null, error: 'Error', status: 500 };
    if (!MEMORY_REGISTRY[collection]) MEMORY_REGISTRY[collection] = [];
    MEMORY_REGISTRY[collection].push(item);
    return { data: item, status: 201 };
  }

  async put(collection: string, id: string, updates: any, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    const collectionData = MEMORY_REGISTRY[collection] || [];
    const index = collectionData.findIndex(i => i.id === id);
    if (index === -1) return { data: null, error: 'Not Found', status: 404 };
    
    const current = collectionData[index];
    if (filterFn && !filterFn(current)) return { data: null, error: 'Forbidden', status: 403 };
    
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    collectionData[index] = updated;
    return { data: updated, status: 200 };
  }

  async delete(collection: string, id: string, filterFn?: any, options: any = {}) {
    await this.wait(options.delay);
    const collectionData = MEMORY_REGISTRY[collection] || [];
    const index = collectionData.findIndex(i => i.id === id);
    if (index === -1) return { data: false, error: 'Not Found', status: 404 };
    
    if (filterFn && !filterFn(collectionData[index])) return { data: false, error: 'Forbidden', status: 403 };
    
    collectionData.splice(index, 1);
    return { data: true, status: 200 };
  }
}
