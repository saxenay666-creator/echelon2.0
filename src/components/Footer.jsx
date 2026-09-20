import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Globe2, 
  ExternalLink,
  Twitter,
  Linkedin,
  Youtube,
  Github
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer = ({ setActivePage }) => {
  const { isProblemSubmitter } = useApp();
  const isSubmitter = isProblemSubmitter();

  return (
    <footer className="bg-gradient-to-b from-white via-orange-50/40 to-rose-50/50 text-slate-700 border-t border-orange-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-cyan-400 p-0.5 shadow-md shadow-orange-100 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-rose-600 text-lg tracking-tighter">
                  E
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                ECHELON
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              National Multi-Stakeholder Civic Engine. Connecting ground citizen demands with university engineering prototypes, corporate manufacturing, and district government execution.
            </p>
            <div className="flex items-center gap-2.5 text-slate-500 pt-1">
              <a href="#" className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition shadow-xs">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition shadow-xs">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition shadow-xs">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition shadow-xs">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-orange-600 transition-colors">
                  Home Portal
                </button>
              </li>
              {isSubmitter && (
                <li>
                  <button onClick={() => setActivePage('submit-problem')} className="hover:text-orange-600 transition-colors">
                    Submit Ground Problem
                  </button>
                </li>
              )}
              {!isSubmitter && (
                <>
                  <li>
                    <button onClick={() => setActivePage('explore-problems')} className="hover:text-orange-600 transition-colors">
                      Explore Ground Challenges
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActivePage('explore-solutions')} className="hover:text-orange-600 transition-colors">
                      Explore Solutions & TRL
                    </button>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => setActivePage('track-problem')} className="hover:text-orange-600 transition-colors">
                  Track Problem Status
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-orange-600 transition-colors">
                  How ECHELON Works
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-orange-600 transition-colors">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & Support */}
          <div>
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Policies & Safety</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">About Vision & Mission</span>
              </li>
              <li>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Privacy & Data Governance</span>
              </li>
              <li>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Open Innovation Charter</span>
              </li>
              <li>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">NIRF & AICTE Integration</span>
              </li>
              <li>
                <span className="hover:text-orange-600 transition-colors cursor-pointer">Toll-Free Helpdesk: 1800-11-2026</span>
              </li>
            </ul>
          </div>

          {/* Col 4: National Mandate & SOS */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">National Grid</h4>
            <div className="p-4 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">Live Innovation Telemetry</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Integrated with 240+ academic institutions, 165+ industry partners, and grassroots administration across India.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm flex items-center justify-between">
              <span className="text-xs font-bold">Emergency Helplines</span>
              <span className="text-xs font-mono font-black bg-white/20 px-2 py-0.5 rounded">112 / 108</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 ECHELON Platform. Designed for Indian Civic Transformation & Industrial Co-Creation.</p>
          <div className="flex items-center gap-4 text-slate-600 font-semibold">
            <span>Security Certified</span>
            <span>•</span>
            <span>Digital India Compatible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
