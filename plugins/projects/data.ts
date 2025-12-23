/**
 * Project Plugin Data Definitions
 */

export interface IProject {
  id: string;
  name: string;
  description: string;
  userId: string; // Required for user-scoping
  progress: number;
  flags: ProjectFlags;
  createdAt: string;
  updatedAt: string;
}

export enum ProjectFlags {
  None = 0,
  IsActive = 1 << 0,
  IsArchived = 1 << 1,
  IsPublic = 1 << 2,
}

export const SEED_DATA: IProject[] = [
  {
    id: 'prj_1',
    name: 'OpenDND Core Framework',
    description: 'Developing the master template for modular AI applications.',
    userId: 'u_1',
    progress: 85,
    flags: ProjectFlags.IsActive | ProjectFlags.IsPublic,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  }
];