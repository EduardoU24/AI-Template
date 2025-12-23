import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DebugMenu } from './app/ui/debug-menu.tsx';
import { IDebugConfig } from './data/_types.ts';
import { AppRouteFlags } from './data/app-routes.ts';
import { SessionManager } from './service/session';
import { NotificationProvider } from './app/ui/notification-center.tsx';

// Layouts & Pages
import PublicLayout from './app/(public)/layout.tsx';
import LandingPage from './app/(public)/page.tsx';
import LoginPage from './app/(auth)/login/page.tsx';
import AdminLayout from './app/(admin)/layout.tsx';
import DashboardPage from './app/(admin)/dashboard/page.tsx';
import UsersPage from './app/(admin)/dashboard/users/page.tsx';
import SettingsPage from './app/(admin)/dashboard/settings/page.tsx';

const App: React.FC = () => {
  const [debugConfig, setDebugConfig] = useState<IDebugConfig>({
    mockLatency: 500,
    showGrid: false,
    forceError: false
  });

  return (
    <NotificationProvider>
      <div className={`antialiased min-h-screen text-slate-100 selection:bg-brand-500/30 selection:text-brand-200 ${debugConfig.showGrid ? 'debug-screens' : ''}`}>
        <HashRouter>
          <Routes>
            
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={
              <RouteGuard flags={AppRouteFlags.GuestOnly}>
                 <LoginPage />
              </RouteGuard>
            } />

            {/* Admin Routes */}
            <Route element={
              <RouteGuard flags={AppRouteFlags.RequiresAuth}>
                <AdminLayout />
              </RouteGuard>
            }>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/users" element={<UsersPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </HashRouter>
        
        <DebugMenu config={debugConfig} onUpdate={setDebugConfig} />
      </div>
    </NotificationProvider>
  );
};

// Route Guard Component
const RouteGuard: React.FC<{ children: React.ReactNode, flags: number }> = ({ children, flags }) => {
  const isAuthenticated = !!SessionManager.getSession();

  // Check Guest Only (e.g. Login page should not be accessible if logged in)
  if ((flags & AppRouteFlags.GuestOnly) !== 0 && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check Auth Required
  if ((flags & AppRouteFlags.RequiresAuth) !== 0 && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default App;