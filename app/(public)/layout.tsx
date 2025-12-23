import { Link, Outlet } from 'react-router-dom';
import { Terminal, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { DATA as APP_ROUTES, AppRouteFlags } from '../../data/app-routes';

export default function PublicLayout() {
  const navbarRoutes = APP_ROUTES.filter(r => (r.flags & AppRouteFlags.ShowInNavbar) !== 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              OpenDND
            </span>
          </div>
          <div className="flex items-center gap-4">
            {navbarRoutes.map(route => (
               <Link key={route.id} to={route.path}>
                 {route.componentKey === 'Login' ? (
                   <Button variant="ghost">{route.label}</Button>
                 ) : route.componentKey === 'Dashboard' ? (
                   <Button>{route.label} <ArrowRight className="w-4 h-4 ml-2" /></Button>
                 ) : null}
               </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content (Outlet) */}
      <Outlet />

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-brand-600" />
            <span className="font-bold text-slate-200">OpenDND</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} OpenDND Framework. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
