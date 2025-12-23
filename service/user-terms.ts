
import { DATA, UserTermAcceptance } from '../data/user-terms.ts';
import { createUserScopedService, registerInitialData } from './index.ts';

const COLLECTION = 'user-terms';

registerInitialData(COLLECTION, DATA);

export const UserTermService = createUserScopedService<UserTermAcceptance>(COLLECTION);
