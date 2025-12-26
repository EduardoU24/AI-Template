
import { DATA, IUserActivity } from '../data/user-activity.ts';
import { createUserScopedService, registerInitialData } from './index.ts';

const COLLECTION = 'user-activity';

registerInitialData(COLLECTION, DATA);

export const UserActivityService = createUserScopedService<IUserActivity>(COLLECTION);
