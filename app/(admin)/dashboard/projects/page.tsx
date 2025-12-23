import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Briefcase } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { ProjectService, ProjectCard, IProject } from '../../../../plugins/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await ProjectService.findAllMy();
      if (res.data) setProjects(res.data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Workspace</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your active Plugin Pods and domain modules.</p>
        </div>
        <Button className="h-10 px-6">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input placeholder="Search projects..." className="pl-10 h-10 w-full" />
        </div>
        <Button variant="secondary" className="h-10">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-900/50 rounded-xl border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
           <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-4" />
           <h3 className="text-white font-medium">No projects found</h3>
           <p className="text-slate-500 text-sm mt-1">Get started by creating your first Plugin Pod.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}