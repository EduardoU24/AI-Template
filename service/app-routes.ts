
import { DATA, IAppRoute } from '../data/app-routes.ts';
import { createService, registerInitialData } from './index.ts';

const COLLECTION = 'app-routes';

registerInitialData(COLLECTION, DATA);

export const AppRouteService = createService<IAppRoute>(COLLECTION);
