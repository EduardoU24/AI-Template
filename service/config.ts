
import { setProvider } from './provider.ts';
import { MemoryStrategy } from './strategy-memory.ts';
import { StrapiStrategy } from './strategy-strapi.ts';

/**
 * STRATEGY CONFIGURATION
 * Change 'memory' to 'strapi' to switch the entire app to a live API.
 */
export const APP_CONFIG = {
  // THE ONE LINE: Pick 'memory' or 'strapi'
  activeStrategy: 'memory' as 'memory' | 'strapi',
  
  // Settings for StrapiStrategy
  strapi: {
    baseUrl: 'https://my-api.com',
    token: undefined, // Optional: process.env.STRAPI_TOKEN
  }
};

/**
 * Bootstraps the data provider based on the centralized configuration.
 * Called during application initialization (index.tsx).
 */
export function bootstrapProvider() {
  switch (APP_CONFIG.activeStrategy) {
    case 'strapi':
      setProvider(new StrapiStrategy(
        APP_CONFIG.strapi.baseUrl, 
        APP_CONFIG.strapi.token
      ));
      break;
      
    case 'memory':
    default:
      setProvider(new MemoryStrategy());
      break;
  }
}
