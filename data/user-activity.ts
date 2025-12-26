
export interface IUserActivity {
  id: string;
  userId: string;
  action: string;
  entity: string;
  details: string;
  createdAt: string;
  flags: number;
}

export const DATA: IUserActivity[] = [
  {
    id: 'act_1',
    userId: 'u_1',
    action: 'SERVICE_INIT',
    entity: 'AppConfigService',
    details: 'Provider bootstrapped with MemoryStrategy',
    createdAt: new Date().toISOString(),
    flags: 0
  },
  {
    id: 'act_2',
    userId: 'u_1',
    action: 'DATA_FETCH',
    entity: 'AppRouteService',
    details: 'Retrieved 6 active routes',
    createdAt: new Date().toISOString(),
    flags: 0
  }
];
