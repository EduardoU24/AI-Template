import React, { useState } from 'react';
import { 
  Activity, Search, Bell, Menu, Plus, 
  BarChart3, Users, DollarSign, BrainCircuit, LayoutDashboard, Settings, Briefcase
} from 'lucide-react';
import { Button } from '../ui/button';
import { DATA as APP_ROUTES, AppRouteFlags } from '../../data/app-routes';
import { Link, useLocation, Outlet } from 'react-router-dom';

const ICON_MAP: Record<string, any> = {
  'LayoutDashboard': LayoutDashboard,
  'Users': Users,
  'DollarSign': DollarSign,
  'BrainCircuit': BrainCircuit,
  'BarChart3': BarChart3,
  'Settings': Settings,
  'Briefcase': Briefcase
};

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Filter routes for sidebar
  const sidebarLinks = APP_ROUTES.filter(r => (r.flags & AppRouteFlags.ShowInSidebar) !== 0);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-20`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3 text-brand-500">
            <Activity className="w-6 h-6" />
            {isSidebarOpen && <span className="font-bold text-white tracking-wide uppercase text-xs">OpenDND Framework</span>}
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((item) => {
            const Icon = item.icon ? ICON_MAP[item.icon] : BarChart3;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-600/10 text-brand-400' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 min-w-[20px]" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400" onClick={() => window.location.hash = '/'}>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
               <span className="font-bold text-xs">AD</span>
            </div>
            {isSidebarOpen && (
              <div className="text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Administrator</div>
                <div className="text-xs text-white">Alice Admin</div>
              </div>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                placeholder="Search domain..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-300 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="primary" className="h-8 text-[10px] px-3 gap-2">
              <Plus className="w-3 h-3" /> New Pod
            </Button>
            <div className="w-px h-6 bg-slate-800" />
            <button className="relative text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-slate-950/20">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}