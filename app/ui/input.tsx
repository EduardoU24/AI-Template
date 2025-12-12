import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
    <input 
      className={`bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 ${className}`}
      {...props}
    />
  </div>
);