import React from 'react';
import { HeartHandshake, MapPin, ShieldCheck, Users } from 'lucide-react';

const highlights = [
  {
    icon: Users,
    title: 'Your voice matters',
    description: 'Every report helps local teams understand what your community needs most.'
  },
  {
    icon: ShieldCheck,
    title: 'Transparent progress',
    description: 'Follow updates on reported problems and see how solutions move forward.'
  },
  {
    icon: MapPin,
    title: 'Local action',
    description: 'Location details help route each issue to the right district and department.'
  },
  {
    icon: HeartHandshake,
    title: 'Built together',
    description: 'Citizens, communities, and public teams work together for lasting change.'
  }
];

export const CitizenAbout = ({ setActivePage }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">About ECHELON</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-black">Change starts with one voice.</h1>
      <p className="mt-5 max-w-2xl text-blue-100 leading-relaxed">
        ECHELON connects citizens with the people and teams who can turn local problems into practical,
        measurable improvements across Jharkhand.
      </p>
      <button
        type="button"
        onClick={() => setActivePage('submit-problem')}
        className="mt-8 rounded-xl bg-white px-5 py-3 font-bold text-indigo-900 transition hover:bg-blue-50"
      >
        Report a problem <span aria-hidden="true">→</span>
      </button>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {highlights.map(({ icon: Icon, title, description }) => (
        <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Icon className="h-7 w-7 text-indigo-600" />
          <h2 className="mt-4 text-lg font-black text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        </article>
      ))}
    </div>
  </div>
);
