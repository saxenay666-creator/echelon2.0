import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const BackButton = ({ onClick, label = "Back" }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
