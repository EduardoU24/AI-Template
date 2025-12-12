import { GenericMedia, GenericSeo } from './_types.ts'
import { APP_ROUTES, AppRoute } from './app-routes.ts'

export interface AppConfig {
  id: string;
  key: string;
  baseSeo: GenericSeo // Default SEO as Template, replace in every page.
  navigation: AppRoute[]
  flags: AppConfigFlags
}

export enum AppConfigFlags {
  None = 0,
  IsPublic = 1 << 0,
  InMaintenance = 1 << 1,
}

const DEFAULT_BRANDING = {
  title: '%s | OpenDND Master Template App!',
  logo: {
    url: 'FILL_ME',
  } as GenericMedia
}

const DEFAULT_SEO = {
    title: DEFAULT_BRANDING.title,
    description: 'Some Description',
    robots: 'index, follow',
    og: {
        title: 'OpenDND',
        description: 'Some Description',
        type: 'website' as const,
        image: DEFAULT_BRANDING.logo,
    },
    twitter: {
        card: 'summary_large_image' as const,
        site: '@opendnd',
    }
} as GenericSeo

export const APP_CONFIGS: AppConfig = {
  id: 'global_config_1',
  key: 'global',
  baseSeo: DEFAULT_SEO,
  navigation: APP_ROUTES,
  flags: AppConfigFlags.None,
}