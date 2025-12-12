import { mockApi, ApiResponse } from './_mockup.api';
import { MockSession } from './_mockup.session';
import { MockDatabase } from './_mockup.data';
import { AppConfig, AppConfigFlags } from './app-configs';
import { AppTerm, AppTermFlags } from './app-terms';
import { UserExtended } from './users';
import { UserTermAcceptance } from './user-terms';

/* =========================================================================
   GENERIC FACTORIES
   ========================================================================= */

/**
 * Creates a standard CRUD service for a collection.
 */
function createCrudService<T extends { id: string }>(collection: keyof MockDatabase) {
  return {
    getAll: (options?: any) => 
      mockApi.get(collection, undefined, options) as unknown as Promise<ApiResponse<T[]>>,
    
    getById: async (id: string, options?: any): Promise<ApiResponse<T>> => {
      const res = await mockApi.get(collection, (item: any) => item.id === id, options);
      return { ...res, data: res.data ? res.data[0] : null } as unknown as ApiResponse<T>;
    },

    create: (data: T, options?: any) => 
      mockApi.post(collection, data as any, options) as unknown as Promise<ApiResponse<T>>,
    
    update: (id: string, data: Partial<T>, options?: any) => 
      mockApi.put(collection, id, data, undefined, options) as unknown as Promise<ApiResponse<T>>,
    
    delete: (id: string, options?: any) => 
      mockApi.delete(collection, id, undefined, options)
  };
}

/**
 * Creates a user-scoped CRUD service. 
 * Automatically implies "userId" checks based on the MockSession.
 */
function createUserScopedService<T extends { id: string, userId: string }>(collection: keyof MockDatabase) {
  const base = createCrudService<T>(collection);
  
  // Predicate: Does this item belong to the current session user?
  const isMine = (item: T) => item.userId === MockSession.getSession();

  return {
    ...base, // Inherit admin/standard access
    
    // User-specific overrides
    getAllMy: (options?: any) => 
      mockApi.get(collection, (item: any) => isMine(item), options) as unknown as Promise<ApiResponse<T[]>>,

    getMyById: async (id: string, options?: any): Promise<ApiResponse<T>> => {
      const res = await mockApi.get(collection, (item: any) => item.id === id && isMine(item), options);
      return { ...res, data: res.data ? res.data[0] : null } as unknown as ApiResponse<T>;
    },

    createMy: (data: Omit<T, 'userId'>, options?: any) => 
      mockApi.post(collection, { ...data, userId: MockSession.getSession() } as any, options) as unknown as Promise<ApiResponse<T>>,

    updateMy: (id: string, data: Partial<T>, options?: any) => 
      mockApi.put(collection, id, data, (item: any) => isMine(item), options) as unknown as Promise<ApiResponse<T>>,

    updateAllMy: async (updates: Partial<T>, options?: any) => {
       // Batch update simulation: Get all mine, then loop update.
       // In a real DB this is a single UPDATE ... WHERE ... query.
       const myItems = await mockApi.get(collection, (item: any) => isMine(item));
       if (!myItems.data) return { status: 200, data: [], meta: { affected: 0 } } as unknown as ApiResponse<T[]>;
       
       let count = 0;
       for (const item of myItems.data) {
          await mockApi.put(collection, (item as any).id, updates, undefined, { delay: 0 }); // Skip delay for loop
          count++;
       }
       return { status: 200, data: myItems.data, meta: { affected: count } } as unknown as ApiResponse<T[]>;
    },

    deleteMy: (id: string, options?: any) => 
      mockApi.delete(collection, id, (item: any) => isMine(item), options)
  };
}


/* =========================================================================
   SPECIFIC SERVICES
   ========================================================================= */

/**
 * AppConfigs
 */
const baseConfigService = createCrudService<AppConfig>('configs');
export const AppConfigService = {
  ...baseConfigService,
  // Custom methods
  getPublic: () => mockApi.get('configs', (c: AppConfig) => (c.flags & AppConfigFlags.IsPublic) !== 0) as unknown as Promise<ApiResponse<AppConfig[]>>,
  getByKey: async (key: string) => {
    const res = await mockApi.get('configs', (c: AppConfig) => c.key === key);
    return { ...res, data: res.data ? res.data[0] : null } as unknown as ApiResponse<AppConfig>;
  }
};

/**
 * AppTerms
 */
const baseTermsService = createCrudService<AppTerm>('terms');
export const TermsService = {
  ...baseTermsService,
  // Custom methods
  getActiveTerms: () => mockApi.get('terms', (t: AppTerm) => (t.flags & AppTermFlags.IsActive) !== 0) as unknown as Promise<ApiResponse<AppTerm[]>>,
  getLatestByType: async (type: AppTerm['type']) => {
    const res = await mockApi.get('terms', (t: AppTerm) => t.type === type && (t.flags & AppTermFlags.IsActive) !== 0);
    const sorted = res.data?.sort((a, b) => b.version.localeCompare(a.version));
    return { ...res, data: sorted ? sorted[0] : null } as unknown as ApiResponse<AppTerm>;
  }
};

/**
 * Users
 * Users don't have 'userId' property, they HAVE 'id'.
 * So we manually implement "Me" methods.
 */
const baseUserService = createCrudService<UserExtended>('users');
export const UserService = {
  ...baseUserService,
  
  getMe: async (options?: any) => {
    const myId = MockSession.getSession();
    return baseUserService.getById(myId, options);
  },

  updateMe: async (data: Partial<UserExtended>, options?: any) => {
    const myId = MockSession.getSession();
    return baseUserService.update(myId, data, options);
  },

  // Legacy/Custom support
  getProfile: baseUserService.getById,
  
  hasAcceptedLatestTerms: async (userId: string, termType: AppTerm['type']) => {
    const termRes = await TermsService.getLatestByType(termType);
    const latestTerm = termRes.data;
    if (!latestTerm) return { status: 404, error: 'No active terms found', data: false };

    const logRes = await mockApi.get('userTerms', (log: UserTermAcceptance) => 
      log.userId === userId && log.termId === latestTerm.id
    );

    return {
      status: 200,
      data: (logRes.data && logRes.data.length > 0),
      meta: { latestTermId: latestTerm.id, latestTermVersion: latestTerm.version }
    };
  }
};

/**
 * UserTerms Logs
 * Uses the scoped factory because it has a 'userId' FK.
 */
export const UserTermsService = createUserScopedService<UserTermAcceptance>('userTerms');
