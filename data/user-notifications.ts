
// User Relation Types
export interface UserNotificationRecord {
  id: string;
  userId: string;
  templateId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const DATA: UserNotificationRecord[] = [
  {
    id: 'un_1',
    userId: 'u_1',
    templateId: 'WELCOME',
    isRead: true,
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
  },
  {
    id: 'un_2',
    userId: 'u_1',
    templateId: 'GOAL_REACHED',
    isRead: false,
    createdAt: '2024-03-11T09:00:00Z',
    updatedAt: '2024-03-11T09:00:00Z',
  }
];
