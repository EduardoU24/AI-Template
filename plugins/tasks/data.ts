export interface ITask {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: number;
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Done = 'done'
}

export const SEED_DATA: ITask[] = [
  { id: 't_1', projectId: 'prj_1', title: 'Setup App Router structure', status: TaskStatus.Done, priority: 1 },
  { id: 't_2', projectId: 'prj_1', title: 'Implement Plugin Pods', status: TaskStatus.InProgress, priority: 2 },
  { id: 't_3', projectId: 'prj_1', title: 'Document Data Prefixing', status: TaskStatus.Todo, priority: 3 }
];