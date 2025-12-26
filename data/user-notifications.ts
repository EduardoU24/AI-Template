import { IUserOwnedTEntryTFlags, DATA as USERS } from './users'
import { IAppNotification, IAppNotificationFlags, DATA as APP_NOTIFICATIONS } from './app-notifications';

export enum IUserNotificationFlags {
  None = 0,
  IsActive = 1 << 0,
  IsRead = 1 << 1,

  IsInfo = 1 << 27,
  IsSuccess = 1 << 28,
  IsWarning = 1 << 29,
  IsError = 1 << 30,
}

export const DATA: IUserOwnedTEntryTFlags<IAppNotification, IUserNotificationFlags>[] = [
  {
    id: 'notif_1',
    userId: USERS[0].id,
    user: USERS[0],
    entryId: APP_NOTIFICATIONS[0].id,
    entry: {
      id: '',
      title: 'Campaign Synchronized',
      message: 'Your local changes have been merged with the high council records.',
      icon: 'CheckCircle2',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      flags: IAppNotificationFlags.IsFromSystem,
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    flags: IUserNotificationFlags.IsSuccess,
  },
  {
    id: 'notif_2',
    userId: USERS[1].id,
    user: USERS[1],
    entryId: APP_NOTIFICATIONS[1].id,
    entry: {
      id: '',
      title: 'Unity Engine Update',
      message: 'System version 0.1.5-beta deployed successfully.',
      icon: 'Binary',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 7200000).toISOString(),
      flags: IAppNotificationFlags.IsFromSystem,
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    flags: IUserNotificationFlags.IsInfo,
  }
];
