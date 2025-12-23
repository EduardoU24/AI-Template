
import { IGenericMedia, IGenericSeo } from './pages.ts'
import { DATA as ALL_ROUTES, AppRoute } from './app-routes.ts'

export enum AppConfigFlags {
  None = 0,
  IsPublic = 1 << 0,
  InMaintenance = 1 << 1,
}

export interface IAppConfig {
  id: string;
  key: string;
  baseSeo: IGenericSeo;
  navigation: AppRoute[];
  flags: AppConfigFlags;
}

/**
 * Configuration data must be defined before service instantiation
 * to satisfy the circular database dependencies.
 */
export const DATA: IAppConfig = {
  id: 'global_config_1',
  key: 'global',
  baseSeo: {
    title: '%s | OpenDND Master Template App!',
    description: 'A professional React template with modular architecture and mock APIs.',
    robots: 'index, follow',
    og: {
      title: 'OpenDND Framework',
      description: 'Accelerate development with Gemini AI and structured mock data.',
      type: 'website',
      image: { url: 'https://picsum.photos/1200/630' } as IGenericMedia,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@opendnd',
    }
  },
  navigation: ALL_ROUTES,
  flags: AppConfigFlags.None,
};

import { createService } from './service/index.ts'

export const AppConfigService = {
  ...createService<IAppConfig>('configs'),
  getByKey: (key: string) => createService<IAppConfig>('configs').find(c => c.key === key)
};
