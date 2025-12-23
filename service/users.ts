
import { DATA, IUserExtended } from '../data/users.ts';
import { createService, registerInitialData } from './index.ts';
import { SessionManager } from './session.ts';

const COLLECTION = 'users';

registerInitialData(COLLECTION, DATA);

const base = createService<IUserExtended>(COLLECTION);

export const UserService = {
  ...base,
  getMe: () => base.findOne(SessionManager.getSession())
};
