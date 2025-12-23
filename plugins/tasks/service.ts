import { SEED_DATA, ITask } from './data.ts';
import { createService, registerInitialData } from '../../service/index.ts';

const COLLECTION = 'tasks';
registerInitialData(COLLECTION, SEED_DATA);

export const TaskService = createService<ITask>(COLLECTION);