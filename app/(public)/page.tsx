import React from 'react';
import { Layout, Database, Shield, Terminal, Zap, Code, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Link } from 'react-router-dom';
import { LANDING_PAGE_CONTENT } from '../../data/page-landing';

// Map string icon names to components
const ICON_MAP: Record<string, LucideIcon> = {
  Layout, Database, Shield, Terminal, Zap, Code
};

const Feature: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => {
  const IconComponent = ICON_MAP[icon] || Terminal;
  
  return (
    <Card className="hover:border-brand-500/50 transition-colors group">
      <div className="mb-4 p-3 bg-slate-800 rounded-lg w-fit text-brand-500 group-hover:text-brand-400 group-hover:bg-slate-800/80 transition-colors">
        <IconComponent className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </Card>
  );
};

export default function LandingPage() {
  const { hero, features } = LANDING_PAGE_CONTENT;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-brand-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            {hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {hero.title} <br />
            <span className="text-brand-500">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button className="h-12 px-8 text-lg">{hero.primaryAction}</Button>
            </Link>
            <a href={hero.sourceLink} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="h-12 px-8 text-lg">{hero.secondaryAction}</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Feature 
                key={idx}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}