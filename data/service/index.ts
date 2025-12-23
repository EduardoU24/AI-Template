import { IApiResponse } from '../_types.ts';

import { mockApi } from '../_mockup.api.ts';
import { MockSession } from '../_mockup.session.ts';
import { IMockDatabase } from '../_mockup.api.ts';

export interface ServiceOptions {
  delay?: number;
  shouldFail?: boolean;
}

export function createService<T extends { id: string }>(collection: keyof IMockDatabase) {
  // FIND
  const findAll = (options?: ServiceOptions) => 
    mockApi.get(collection, undefined, options) as unknown as Promise<IApiResponse<T[]>>;

  const find = async (filterFn: (item: T) => boolean, options?: ServiceOptions) => {
    const res = await mockApi.get(collection, filterFn as any, options);
    return { ...res, data: res.data ? res.data[0] : null } as unknown as IApiResponse<T>;
  };

  const findOne = (id: string, options?: ServiceOptions) => 
    find((item) => item.id === id, options);

  // CREATE
  const create = async (items: T[], options?: ServiceOptions) => {
    const results = [];
    for (const item of items) {
      const res = await mockApi.post(collection, item as any, options);
      results.push(res.data);
    }
    return { data: results, status: 201 } as unknown as IApiResponse<T[]>;
  };

  const createOne = (item: T, options?: ServiceOptions) => 
    create([item], options).then(res => ({ ...res, data: res.data?.[0] }));

  // UPDATE
  const update = (id: string, data: Partial<T>, options?: ServiceOptions) => 
    mockApi.put(collection, id, data, undefined, options) as unknown as Promise<IApiResponse<T>>;

  const updateOne = update;

  const updateAll = async (filterFn: (item: T) => boolean, data: Partial<T>, options?: ServiceOptions) => {
    const all = await findAll({ delay: 0 });
    const targets = (all.data || []).filter(filterFn);
    for (const target of targets) {
      await update(target.id, data, { ...options, delay: 0 });
    }
    return { status: 200, data: true } as unknown as IApiResponse<boolean>;
  };

  // DELETE
  const deleteFn = (id: string, options?: ServiceOptions) => 
    mockApi.delete(collection, id, undefined, options);

  const deleteOne = deleteFn;

  const deleteAll = async (filterFn: (item: T) => boolean, options?: ServiceOptions) => {
    const all = await findAll({ delay: 0 });
    const targets = (all.data || []).filter(filterFn);
    for (const target of targets) {
      await deleteFn(target.id, { ...options, delay: 0 });
    }
    return { status: 200, data: true } as unknown as IApiResponse<boolean>;
  };

  return {
    find, findOne, findAll,
    update, updateOne, updateAll,
    create, createOne,
    delete: deleteFn, deleteOne, deleteAll
  };
}

export function createUserScopedService<T extends { id: string; userId: string }>(collection: keyof IMockDatabase) {
  const base = createService<T>(collection);

  const getMyId = () => {
    const id = MockSession.getSession();
    if (!id) throw new Error("Unauthorized: No active session found.");
    return id;
  };

  const findMy = (filterFn: (item: T) => boolean, options?: ServiceOptions) => 
    base.find((item) => item.userId === getMyId() && filterFn(item), options);

  const findAllMy = (options?: ServiceOptions) => 
    base.findAll({ ...options }).then(res => ({
      ...res,
      data: res.data?.filter(item => item.userId === getMyId()) || []
    }));

  const createMy = (items: Omit<T, 'userId'>[], options?: ServiceOptions) => {
    const itemsWithUser = items.map(item => ({ ...item, userId: getMyId() } as T));
    return base.create(itemsWithUser, options);
  };

  const createOneMy = (item: Omit<T, 'userId'>, options?: ServiceOptions) => 
    createMy([item], options).then(res => ({ ...res, data: res.data?.[0] }));

  const updateMy = (id: string, data: Partial<T>, options?: ServiceOptions) => 
    mockApi.put(collection, id, data, (item: any) => item.userId === getMyId(), options) as unknown as Promise<IApiResponse<T>>;

  const deleteMy = (id: string, options?: ServiceOptions) => 
    mockApi.delete(collection, id, (item: any) => item.userId === getMyId(), options);

  const deleteAllMy = (filterFn: (item: T) => boolean, options?: ServiceOptions) => 
    base.deleteAll((item) => item.userId === getMyId() && filterFn(item), options);

  return {
    ...base,
    findMy, findAllMy, createMy, createOneMy, updateMy, deleteMy, deleteAllMy
  };
}