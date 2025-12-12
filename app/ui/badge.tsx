import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-slate-700 text-slate-300' }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
    {children}
  </span>
);