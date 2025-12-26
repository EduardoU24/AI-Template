
export enum AppRouteFlags {
  None = 0,
  RequiresAuth = 1 << 0,
  GuestOnly = 1 << 1,
  ShowInSidebar = 1 << 2,
  ShowInNavbar = 1 << 3,
  IsAdmin = 1 << 4
}

export interface IAppRoute {
  id: string;
  path: string;
  componentKey: string;
  label: string;
  icon?: string;
  flags: AppRouteFlags;
  createdAt: string;
  updatedAt: string;
}

export const DATA: IAppRoute[] = [
  {
    id: 'route_home',
    path: '/',
    componentKey: 'Landing',
    label: 'Home',
    flags: AppRouteFlags.ShowInNavbar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_login',
    path: '/login',
    componentKey: 'Login',
    label: 'Sign In',
    flags: AppRouteFlags.GuestOnly | AppRouteFlags.ShowInNavbar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dashboard',
    path: '/dashboard',
    componentKey: 'Dashboard',
    label: 'Analytics',
    icon: 'LayoutDashboard',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_users',
    path: '/dashboard/users',
    componentKey: 'Dashboard',
    label: 'User Base',
    icon: 'Users',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar | AppRouteFlags.IsAdmin,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_settings',
    path: '/dashboard/settings',
    componentKey: 'Settings',
    label: 'System Config',
    icon: 'Settings',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar | AppRouteFlags.IsAdmin,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];
