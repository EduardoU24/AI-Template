import React, { useState } from 'react';
import { 
  Users, DollarSign, Activity, RefreshCw, BrainCircuit 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Button } from '../../ui/button.tsx';
import { Card } from '../../ui/card.tsx';
import { Badge } from '../../ui/badge.tsx';
import { STATS, LOGS, IDasboardStats, IAppActivityLog } from '../../../data/app-dashboard';
import { generateDashboardInsight } from '../../../lib/ai.ts';
import { DASHBOARD_PAGE_CONTENT } from '../../../data/page-admin-dashboard.ts';

// --- INLINE COMPONENT: StatCard ---
interface StatCardProps { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  trend?: string;
  onGenerateInsight: () => void;
  insight?: string;
  loadingInsight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, onGenerateInsight, insight, loadingInsight }) => (
  <Card className="relative overflow-hidden">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-800/50 rounded-lg text-slate-400">
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
    <div className="mb-1">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
    
    <div className="mt-4 pt-4 border-t border-slate-800">
      <button 
        onClick={onGenerateInsight}
        disabled={loadingInsight}
        className="text-xs flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors disabled:opacity-50"
      >
        <BrainCircuit className="w-3 h-3" />
        {insight ? "Regenerate Insight" : "Ask AI Insight"}
      </button>
      {insight && (
        <p className="mt-2 text-xs text-slate-400 italic bg-slate-950/50 p-2 rounded border border-slate-800/50 animate-in fade-in">
          "{insight}"
        </p>
      )}
    </div>
  </Card>
);

export default function DashboardPage() {
  const [stats, setStats] = useState<IDasboardStats>(STATS);
  const [logs, setLogs] = useState<IAppActivityLog[]>(LOGS);
  const [loading, setLoading] = useState(false);
  
  const [insights, setInsights] = useState<Record<string, string>>({});
  const [loadingInsights, setLoadingInsights] = useState<Record<string, boolean>>({});

  const { header, stats: statLabels, charts } = DASHBOARD_PAGE_CONTENT;

  const refreshData = async () => {
    setLoading(true);
    setStats(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 100) - 30,
      revenue: prev.revenue + Math.floor(Math.random() * 500),
    }));
    setLoading(false);
  };

  const handleAiInsight = async (key: string, value: number) => {
    setLoadingInsights(prev => ({ ...prev, [key]: true }));
    const result = await generateDashboardInsight(key, value);
    setInsights(prev => ({ ...prev, [key]: result }));
    setLoadingInsights(prev => ({ ...prev, [key]: false }));
  };

  const chartData = [
    { name: 'Mon', users: 4000, rev: 2400 },
    { name: 'Tue', users: 3000, rev: 1398 },
    { name: 'Wed', users: 2000, rev: 9800 },
    { name: 'Thu', users: 2780, rev: 3908 },
    { name: 'Fri', users: 1890, rev: 4800 },
    { name: 'Sat', users: 2390, rev: 3800 },
    { name: 'Sun', users: 3490, rev: 4300 },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{header.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{header.subTitle}</p>
        </div>
        <Button onClick={refreshData} disabled={loading} variant="secondary">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {header.refreshButton}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title={statLabels.revenue.label} 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={<DollarSign className="w-5 h-5" />}
          trend="+12.5%"
          onGenerateInsight={() => handleAiInsight(statLabels.revenue.aiKey, stats.revenue)}
          insight={insights[statLabels.revenue.aiKey]}
          loadingInsight={loadingInsights[statLabels.revenue.aiKey]}
        />
        <StatCard 
          title={statLabels.users.label} 
          value={stats.activeUsers.toLocaleString()} 
          icon={<Users className="w-5 h-5" />}
          trend="+4.2%"
          onGenerateInsight={() => handleAiInsight(statLabels.users.aiKey, stats.activeUsers)}
          insight={insights[statLabels.users.aiKey]}
          loadingInsight={loadingInsights[statLabels.users.aiKey]}
        />
        <StatCard 
          title={statLabels.latency.label} 
          value={`${stats.serverLatency}ms`} 
          icon={<Activity className="w-5 h-5" />}
          trend="-2.1%"
          onGenerateInsight={() => handleAiInsight(statLabels.latency.aiKey, stats.serverLatency)}
          insight={insights[statLabels.latency.aiKey]}
          loadingInsight={loadingInsights[statLabels.latency.aiKey]}
        />
        <StatCard 
          title={statLabels.errors.label} 
          value={`${(stats.errors / 100).toFixed(2)}%`} 
          icon={<Activity className="w-5 h-5" />}
          trend="+0.4%"
          onGenerateInsight={() => handleAiInsight(statLabels.errors.aiKey, stats.errors)}
          insight={insights[statLabels.errors.aiKey]}
          loadingInsight={loadingInsights[statLabels.errors.aiKey]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">{charts.revenue.title}</h2>
            <div className="flex gap-2">
              <Badge>{charts.revenue.badge7d}</Badge>
              <Badge color="bg-slate-800 text-slate-500">{charts.revenue.badge30d}</Badge>
            </div>
          </div>
          <div className="flex-1 w-full h-full min-h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} />
                  <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickFormatter={(val) => `$${val}`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="rev" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-6">{charts.activity.title}</h2>
          <div className="space-y-6 flex-1 overflow-y-auto max-h-[320px] pr-2">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-4 group">
                <div className="relative mt-1">
                   <div className={`w-2 h-2 rounded-full ring-4 ring-slate-900 ${
                     log.status === 'success' ? 'bg-green-500' : 
                     log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                   }`} />
                   <div className="absolute top-2 left-1 -translate-x-1/2 h-full w-px bg-slate-800 group-last:hidden" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-1">{log.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800">
             <Button variant="ghost" className="w-full text-xs">{charts.activity.viewAll}</Button>
          </div>
        </Card>
      </div>
    </>
  );
}