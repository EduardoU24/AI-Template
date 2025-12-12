
export enum AppRouteFlags {
  None = 0,
  RequiresAuth = 1 << 0,  // Only accessible if logged in
  GuestOnly = 1 << 1,     // Only accessible if logged out (e.g. Login)
  ShowInSidebar = 1 << 2, // Visible in Dashboard Sidebar
  ShowInNavbar = 1 << 3,  // Visible in Landing Navbar
  IsAdmin = 1 << 4        // Admin only route
}

export interface AppRoute {
  id: string;
  path: string;
  componentKey: 'Landing' | 'Dashboard' | 'Login';
  label: string;
  icon?: string; // Icon name from lucide-react stringified
  flags: AppRouteFlags;
  createdAt: string;
  updatedAt: string;
}

export const APP_ROUTES: AppRoute[] = [
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
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInNavbar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_users',
    path: '/dashboard/users', // Note: Nested routes handled by component logic or flat mapped
    componentKey: 'Dashboard', // Placeholder: In real app, separate component
    label: 'Users',
    icon: 'Users',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar | AppRouteFlags.IsAdmin,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_revenue',
    path: '/dashboard/revenue',
    componentKey: 'Dashboard',
    label: 'Revenue',
    icon: 'DollarSign',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_ai',
    path: '/dashboard/ai',
    componentKey: 'Dashboard',
    label: 'AI Tools',
    icon: 'BrainCircuit',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'route_dash_settings',
    path: '/dashboard/settings',
    componentKey: 'Dashboard',
    label: 'Settings',
    icon: 'Settings',
    flags: AppRouteFlags.RequiresAuth | AppRouteFlags.ShowInSidebar | AppRouteFlags.IsAdmin,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];
