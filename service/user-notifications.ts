
import { DATA, IUserNotificationFlags } from '../data/user-notifications.ts';
import { IUserOwnedTEntryTFlags } from '../data/users.ts';
import { IAppNotification } from '../data/app-notifications.ts';
import { createUserScopedService, registerInitialData } from './index.ts';

const COLLECTION = 'user-notifications';

registerInitialData(COLLECTION, DATA);

// Define the concrete type for the user-owned notification record
export type UserNotificationRecord = IUserOwnedTEntryTFlags<IAppNotification, IUserNotificationFlags>;

const base = createUserScopedService<UserNotificationRecord>(COLLECTION);

export const UserNotificationService = {
  ...base,
  getUnreadCount: async () => {
    const myNotes = await base.findAllMy({ delay: 0 });
    // Check if the IsRead flag is NOT set on the user relationship wrapper
    return (myNotes.data || []).filter(n => (n.flags & IUserNotificationFlags.IsRead) === 0).length;
  },
  markAllAsRead: async () => {
    const myNotes = await base.findAllMy({ delay: 0 });
    for (const n of (myNotes.data || [])) {
      // If not read, update the flag
      if ((n.flags & IUserNotificationFlags.IsRead) === 0) {
        await base.updateMy(n.id, { flags: n.flags | IUserNotificationFlags.IsRead }, { delay: 0 });
      }
    }
  }
};
