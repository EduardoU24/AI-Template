
import { IApiResponse } from '../data/_types.ts';

/**
 * Core Data Provider Interface.
 * Strategies (Memory, REST, GraphQL) must implement this.
 */
export interface IDataProvider {
  get(
    collection: string, 
    filterFn?: (item: any) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<any[]>>;

  post(
    collection: string,
    item: any,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<any>>;

  put(
    collection: string,
    id: string,
    updates: Partial<any>,
    filterFn?: (item: any) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<any>>;

  delete(
    collection: string,
    id: string,
    filterFn?: (item: any) => boolean,
    options?: { delay?: number; shouldFail?: boolean }
  ): Promise<IApiResponse<boolean>>;

  /**
   * Optional method to seed the provider with initial data.
   */
  seed?: (collection: string, data: any[]) => void;
}

let activeProvider: IDataProvider | null = null;
const PENDING_SEEDS: Record<string, any[]> = {};

/**
 * Returns the currently active data strategy.
 * Throws an error if accessed before setProvider() is called.
 */
export function getProvider(): IDataProvider {
  if (!activeProvider) {
    throw new Error("No DataProvider has been initialized. Call setProvider() during app startup.");
  }
  return activeProvider;
}

/**
 * Safely registers initial data. 
 * If the provider is ready, it seeds it immediately.
 * Otherwise, it queues the data to be seeded as soon as a provider is set.
 */
export function registerSeed(collection: string, data: any[]) {
  if (activeProvider?.seed) {
    activeProvider.seed(collection, data);
  } else {
    // Overwrite or set initial data in the queue
    PENDING_SEEDS[collection] = data;
  }
}

/**
 * Sets the active data strategy and flushes any pending seeds.
 */
export function setProvider(p: IDataProvider): void { 
  activeProvider = p; 
  
  // If the provider supports seeding, flush the queue
  if (p.seed) {
    Object.entries(PENDING_SEEDS).forEach(([collection, data]) => {
      p.seed!(collection, data);
      // Optional: Clean up after seeding
      delete PENDING_SEEDS[collection];
    });
  }
}
