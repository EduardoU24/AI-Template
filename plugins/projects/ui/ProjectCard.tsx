import React from 'react';
import { Briefcase, MoreVertical, ExternalLink } from 'lucide-react';
import { Card } from '../../../app/ui/card';
import { Badge } from '../../../app/ui/badge';
import { IProject, ProjectFlags } from '../data';

interface ProjectCardProps {
  project: IProject;
  onEdit?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit }) => {
  const isPublic = (project.flags & ProjectFlags.IsPublic) !== 0;
  const isArchived = (project.flags & ProjectFlags.IsArchived) !== 0;

  return (
    <Card className={`group hover:border-brand-500/30 transition-all ${isArchived ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-brand-500/10 rounded-lg text-brand-500">
          <Briefcase className="w-5 h-5" />
        </div>
        <div className="flex gap-2">
          {isPublic && <Badge color="bg-blue-500/10 text-blue-400">Public</Badge>}
          {isArchived && <Badge color="bg-slate-700 text-slate-400">Archived</Badge>}
          <button className="text-slate-500 hover:text-white p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
        {project.name}
      </h3>
      <p className="text-sm text-slate-400 mb-6 line-clamp-2">
        {project.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span className="font-mono text-brand-400">{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-500 transition-all duration-500" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-600 font-mono uppercase">
          ID: {project.id}
        </span>
        <button className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 font-medium">
          Manage <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </Card>
  );
};