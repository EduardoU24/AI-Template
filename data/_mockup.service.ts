import { AppConfigService } from './app-configs.ts';
import { AppTermService } from './app-terms.ts';
import { UserService } from './users.ts';
import { UserNotificationService } from './user-notifications.ts';
import { UserTermService } from './user-terms.ts';

/**
 * Registry of all available services.
 * This file maintains backward compatibility and provides a single entry point for complex operations.
 */
export {
  AppConfigService,
  AppTermService,
  UserService,
  UserNotificationService,
  UserTermService as UserTermsService
};

export const NotificationService = UserNotificationService;