
import { DATA, IAppConfig } from '../data/app-configs.ts';
import { createService, registerInitialData } from './index.ts';

const COLLECTION = 'app-configs';

registerInitialData(COLLECTION, [DATA]);

const base = createService<IAppConfig>(COLLECTION);

export const AppConfigService = {
  ...base,
  getByKey: (key: string) => base.find(c => c.key === key)
};
