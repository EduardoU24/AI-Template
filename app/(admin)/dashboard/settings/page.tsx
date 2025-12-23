import React, { useEffect, useState } from 'react';
import { Save, RefreshCw, AlertTriangle, Globe, Lock } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { AppConfigService } from '../../../../data/_mockup.service';
// Fix: Using correct interface name IAppConfig as exported from data/app-configs.ts
import { IAppConfig, AppConfigFlags } from '../../../../data/app-configs';

export default function SettingsPage() {
  // Fix: Using correct interface name IAppConfig
  const [config, setConfig] = useState<IAppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Local state for form inputs to avoid direct mutation of config object
  const [formState, setFormState] = useState({
    seoTitle: '',
    seoDesc: '',
    isPublic: false,
    inMaintenance: false
  });

  const fetchConfig = async () => {
    setLoading(true);
    // Fetch the 'global' config
    const res = await AppConfigService.getByKey('global');
    if (res.data) {
      setConfig(res.data);
      setFormState({
        seoTitle: res.data.baseSeo.title,
        seoDesc: res.data.baseSeo.description,
        isPublic: (res.data.flags & AppConfigFlags.IsPublic) !== 0,
        inMaintenance: (res.data.flags & AppConfigFlags.InMaintenance) !== 0,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);

    // Reconstruct flags based on checkboxes
    let newFlags = AppConfigFlags.None;
    if (formState.isPublic) newFlags |= AppConfigFlags.IsPublic;
    if (formState.inMaintenance) newFlags |= AppConfigFlags.InMaintenance;

    // Fix: Using correct interface name IAppConfig for Partial type
    const updates: Partial<IAppConfig> = {
      baseSeo: {
        ...config.baseSeo,
        title: formState.seoTitle,
        description: formState.seoDesc
      },
      flags: newFlags
    };

    await AppConfigService.update(config.id, updates);
    
    // Refresh to verify
    await fetchConfig();
    setSaving(false);
  };

  if (loading) return <div className="text-slate-400 p-8">Loading configuration...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white">Global Settings</h1>
           <p className="text-slate-400 text-sm">Manage application defaults and global flags.</p>
        </div>
        <Button onClick={fetchConfig} variant="ghost">
          <RefreshCw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Config Column */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-6 text-brand-400">
              <Globe className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-white">General & SEO</h2>
            </div>
            
            <div className="space-y-4">
              <Input 
                label="Application Title Template" 
                value={formState.seoTitle}
                onChange={(e) => setFormState(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="%s | My App"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">Meta Description</label>
                <textarea 
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-brand-500 outline-none min-h-[100px]"
                  value={formState.seoDesc}
                  onChange={(e) => setFormState(prev => ({ ...prev, seoDesc: e.target.value }))}
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-6 text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
            </div>
            
            <div className="p-4 border border-red-900/50 bg-red-900/10 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Maintenance Mode</h3>
                <p className="text-slate-400 text-sm mt-1">
                  When enabled, all public routes will show a maintenance page.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formState.inMaintenance}
                  onChange={(e) => setFormState(prev => ({ ...prev, inMaintenance: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </Card>
        </div>

        {/* Sidebar / Actions */}
        <div className="space-y-6">
           <Card>
              <h3 className="font-semibold text-white mb-4">Publishing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Visibility
                  </span>
                  <span className={formState.isPublic ? "text-green-400" : "text-yellow-400"}>
                    {formState.isPublic ? "Public" : "Private"}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isPublic"
                    checked={formState.isPublic}
                    onChange={(e) => setFormState(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="rounded bg-slate-800 border-slate-700 text-brand-500 focus:ring-brand-500"
                  />
                  <label htmlFor="isPublic" className="text-sm text-slate-300">Make Application Public</label>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Button onClick={handleSave} isLoading={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
           </Card>

           <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Configuration Key</h4>
              <code className="text-xs bg-slate-950 p-2 rounded block text-brand-300 font-mono">
                {config?.key || '...'}
              </code>
              <p className="text-xs text-slate-600 mt-2">
                Use this key to fetch configuration in your frontend API calls.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
