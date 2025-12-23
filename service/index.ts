
import { IApiResponse } from '../data/_types.ts';
import { getProvider, registerSeed } from './provider.ts';
import { SessionManager } from './session.ts';

export interface ServiceOptions {
  delay?: number;
  shouldFail?: boolean;
}

/**
 * Interface for the shared service structure.
 */
export interface IServiceDataCollection<T> {
  collection: string;
  find: (filterFn: (item: T) => boolean, options?: ServiceOptions) => Promise<IApiResponse<T>>;
  findOne: (id: string, options?: ServiceOptions) => Promise<IApiResponse<T>>;
  findAll: (options?: ServiceOptions) => Promise<IApiResponse<T[]>>;
  create: (items: T[], options?: ServiceOptions) => Promise<IApiResponse<T[]>>;
  createOne: (item: T, options?: ServiceOptions) => Promise<IApiResponse<T>>;
  update: (id: string, data: Partial<T>, options?: ServiceOptions) => Promise<IApiResponse<T>>;
  updateOne: (id: string, data: Partial<T>, options?: ServiceOptions) => Promise<IApiResponse<T>>;
  delete: (id: string, options?: ServiceOptions) => Promise<IApiResponse<boolean>>;
  deleteOne: (id: string, options?: ServiceOptions) => Promise<IApiResponse<boolean>>;
  updateAll: (filterFn: (item: T) => boolean, data: Partial<T>, options?: ServiceOptions) => Promise<IApiResponse<boolean>>;
}

/**
 * Global dynamic registry of services.
 */
export const Services: Record<string, IServiceDataCollection<any>> = {};

/**
 * Seeds the active provider with initial data.
 * This is safe to call during module evaluation (top-level).
 */
export function registerInitialData<T>(collection: string, initialData: T[]) {
  registerSeed(collection, initialData);
}

/**
 * Generic CRUD Service Factory.
 */
export function createService<T extends { id: string }>(collection: string): IServiceDataCollection<T> {
  // Memoize service instances
  if (Services[collection]) return Services[collection];

  const findAll = (options?: ServiceOptions) => 
    getProvider().get(collection, undefined, options) as unknown as Promise<IApiResponse<T[]>>;

  const find = async (filterFn: (item: T) => boolean, options?: ServiceOptions) => {
    const res = await getProvider().get(collection, filterFn as any, options);
    return { ...res, data: (res.data && res.data.length > 0) ? res.data[0] : null } as unknown as IApiResponse<T>;
  };

  const findOne = (id: string, options?: ServiceOptions) => 
    find((item) => item.id === id, options);

  const create = async (items: T[], options?: ServiceOptions) => {
    const results = [];
    const provider = getProvider();
    for (const item of items) {
      const res = await provider.post(collection, item as any, options);
      results.push(res.data);
    }
    return { data: results, status: 201 } as unknown as IApiResponse<T[]>;
  };

  const createOne = (item: T, options?: ServiceOptions) => 
    create([item], options).then(res => ({ ...res, data: res.data?.[0] || null }));

  const update = (id: string, data: Partial<T>, options?: ServiceOptions) => 
    getProvider().put(collection, id, data, undefined, options) as unknown as Promise<IApiResponse<T>>;

  const deleteFn = (id: string, options?: ServiceOptions) => 
    getProvider().delete(collection, id, undefined, options);

  const service: IServiceDataCollection<T> = {
    collection,
    find, findOne, findAll,
    update, updateOne: update,
    create, createOne,
    delete: deleteFn, deleteOne: deleteFn,
    updateAll: async (filterFn: (item: T) => boolean, data: Partial<T>, options?: ServiceOptions) => {
      const all = await findAll({ delay: 0 });
      const targets = (all.data || []).filter(filterFn);
      for (const target of targets) await update(target.id, data, { ...options, delay: 0 });
      return { status: 200, data: true } as unknown as IApiResponse<boolean>;
    }
  };

  Services[collection] = service;
  return service;
}

/**
 * Extends base CRUD with user-level isolation logic.
 */
export function createUserScopedService<T extends { id: string; userId: string }>(collection: string) {
  const base = createService<T>(collection);

  const getMyId = () => {
    const id = SessionManager.getSession();
    if (!id) throw new Error("Unauthorized: No active session found.");
    return id;
  };

  const findAllMy = (options?: ServiceOptions) => 
    base.findAll({ ...options }).then(res => ({
      ...res,
      data: res.data?.filter(item => item.userId === getMyId()) || []
    }));

  const createMy = (items: Omit<T, 'userId'>[], options?: ServiceOptions) => {
    const itemsWithUser = items.map(item => ({ ...item, userId: getMyId() } as T));
    return base.create(itemsWithUser, options);
  };

  const updateMy = (id: string, data: Partial<T>, options?: ServiceOptions) => 
    getProvider().put(collection, id, data, (item: any) => item.userId === getMyId(), options) as unknown as Promise<IApiResponse<T>>;

  const deleteMy = (id: string, options?: ServiceOptions) => 
    getProvider().delete(collection, id, (item: any) => item.userId === getMyId(), options);

  return {
    ...base,
    findAllMy,
    createMy,
    createOneMy: (item: Omit<T, 'userId'>, options?: ServiceOptions) => 
      createMy([item], options).then(res => ({ ...res, data: res.data?.[0] || null })),
    updateMy,
    deleteMy
  };
}
