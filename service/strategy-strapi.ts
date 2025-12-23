
import { IDataProvider } from './provider.ts';
import { IApiResponse } from '../data/_types.ts';

/**
 * StrapiStrategy: Implementation of IDataProvider for Strapi CMS or compatible REST APIs.
 * Maps collection names directly to /api/[collection] routes.
 */
export class StrapiStrategy implements IDataProvider {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    // Standard Strapi setup usually prepends /api
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.baseUrl = base.includes('/api') ? base : `${base}/api`;
    this.token = token;
  }

  /**
   * Internal helper to handle fetch requests and Strapi v4+ data flattening.
   */
  private async request(path: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        ...options,
        headers,
      });

      const json = await response.json();

      // Strapi v4+ wraps responses in a { data: ... } object.
      // Additionally, single items are often { id: 1, attributes: { ... } }.
      const flatten = (item: any) => {
        if (item && item.id && item.attributes) {
          return { id: item.id, ...item.attributes };
        }
        return item;
      };

      let resultData = json.data;
      if (Array.isArray(resultData)) {
        resultData = resultData.map(flatten);
      } else {
        resultData = flatten(resultData);
      }

      return {
        data: resultData,
        status: response.status,
        error: !response.ok ? (json.error?.message || response.statusText) : undefined,
        meta: json.meta,
      };
    } catch (e) {
      return {
        data: null,
        status: 500,
        error: e instanceof Error ? e.message : 'Network Request Failed',
      };
    }
  }

  async get(collection: string, filterFn?: (item: any) => boolean) {
    const res = await this.request(collection);
    // Note: Ideally filtering happens server-side via query params.
    // Local fallback for filterFn if provided.
    if (res.data && Array.isArray(res.data) && filterFn) {
      res.data = res.data.filter(filterFn);
    }
    return res as IApiResponse<any[]>;
  }

  async post(collection: string, item: any) {
    // Strapi expects payloads wrapped in a 'data' key
    return this.request(collection, {
      method: 'POST',
      body: JSON.stringify({ data: item }),
    });
  }

  async put(collection: string, id: string, updates: Partial<any>) {
    return this.request(`${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: updates }),
    });
  }

  async delete(collection: string, id: string) {
    const res = await this.request(`${collection}/${id}`, {
      method: 'DELETE',
    });
    return { 
      ...res, 
      data: res.status >= 200 && res.status < 300 
    } as IApiResponse<boolean>;
  }

  // Seeding is typically not supported for live APIs via this interface
  seed = undefined; 
}
