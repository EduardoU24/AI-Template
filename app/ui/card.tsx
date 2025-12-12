import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 ${className}`}>
    {children}
  </div>
);