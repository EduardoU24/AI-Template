import { createUserScopedService } from './service';

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

export const UserNotificationService = {
  ...createUserScopedService<UserNotificationRecord>('notifications'),
  getUnreadCount: async () => {
    const service = createUserScopedService<UserNotificationRecord>('notifications');
    const myNotes = await service.findAllMy({ delay: 0 });
    return (myNotes.data || []).filter(n => !n.isRead).length;
  },
  markAllAsRead: async () => {
    const service = createUserScopedService<UserNotificationRecord>('notifications');
    const myNotes = await service.findAllMy({ delay: 0 });
    for (const n of (myNotes.data || [])) {
      if (!n.isRead) await service.updateMy(n.id, { isRead: true }, { delay: 0 });
    }
  }
};
