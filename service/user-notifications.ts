
import { DATA, UserNotificationRecord } from '../data/user-notifications.ts';
import { createUserScopedService, registerInitialData } from './index.ts';

const COLLECTION = 'user-notifications';

registerInitialData(COLLECTION, DATA);

const base = createUserScopedService<UserNotificationRecord>(COLLECTION);

export const UserNotificationService = {
  ...base,
  getUnreadCount: async () => {
    const myNotes = await base.findAllMy({ delay: 0 });
    return (myNotes.data || []).filter(n => !n.isRead).length;
  },
  markAllAsRead: async () => {
    const myNotes = await base.findAllMy({ delay: 0 });
    for (const n of (myNotes.data || [])) {
      if (!n.isRead) await base.updateMy(n.id, { isRead: true }, { delay: 0 });
    }
  }
};
