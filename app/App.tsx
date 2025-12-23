import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DebugMenu } from './ui/debug-menu.tsx';
import { IDebugConfig } from '../data/_types.ts';
import { AppRouteFlags } from '../data/app-routes.ts';
import { MockSession } from '../data/_mockup.session.ts';
import { NotificationProvider } from './ui/notification-center.tsx';

// Layouts & Pages
import PublicLayout from './(public)/layout.tsx';
import LandingPage from './(public)/page.tsx';
import LoginPage from './(auth)/login/page.tsx';
import AdminLayout from './(admin)/layout.tsx';
import DashboardPage from './(admin)/dashboard/page.tsx';
import UsersPage from './(admin)/dashboard/users/page.tsx';
import SettingsPage from './(admin)/dashboard/settings/page.tsx';

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
  const isAuthenticated = !!MockSession.getSession();

  if ((flags & AppRouteFlags.GuestOnly) !== 0 && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if ((flags & AppRouteFlags.RequiresAuth) !== 0 && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default App;