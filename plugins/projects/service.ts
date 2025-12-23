import { SEED_DATA, IProject } from './data.ts';
import { createUserScopedService, registerInitialData } from '../../service/index.ts';

const COLLECTION = 'projects';

// Register seed data for the active Provider
registerInitialData(COLLECTION, SEED_DATA);

// Export user-scoped service
export const ProjectService = createUserScopedService<IProject>(COLLECTION);