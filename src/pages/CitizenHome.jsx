import React from 'react';
import {
  Bot,
  ClipboardCheck,
  LayoutDashboard,
  Mic,
  PhoneCall,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CitizenHome = ({ setActivePage }) => {
  const { t, setIsEmergencyOpen, setIsChatbotOpen } = useApp();

  const actions = [
    {
      id: 'submit-problem',
      title: t('submitProblem'),
      description: 'Tell us what is wrong. You can speak, type, or add a photo.',
      icon: Mic,
      className: 'citizen-action citizen-action-mint',
      iconClassName: 'citizen-icon-mint'
    },
    {
      id: 'track-problem',
      title: t('trackProblem'),
      description: 'Check the latest update using your problem number.',
      icon: ClipboardCheck,
      className: 'citizen-action citizen-action-blue',
      iconClassName: 'citizen-icon-blue'
    },
    {
      id: 'emergency',
      title: t('emergency'),
      description: 'Get urgent help from police, ambulance, or disaster services.',
      icon: ShieldAlert,
      className: 'citizen-action citizen-action-coral',
      iconClassName: 'citizen-icon-coral'
    },
    {
      id: 'ai-helper',
      title: t('aiHelper'),
      description: 'Ask questions in your language and get simple guidance.',
      icon: Bot,
      className: 'citizen-action citizen-action-lilac',
      iconClassName: 'citizen-icon-lilac'
    },
    {
      id: 'dashboard',
      title: t('dashboard'),
      description: 'See your submitted problems and their progress.',
      icon: LayoutDashboard,
      className: 'citizen-action citizen-action-gold',
      iconClassName: 'citizen-icon-gold'
    }
  ];

  const handleAction = (id) => {
    if (id === 'emergency') {
      setIsEmergencyOpen(true);
      return;
    }
    if (id === 'ai-helper') {
      setIsChatbotOpen(true);
      return;
    }
    setActivePage(id);
  };

  return (
    <div className="citizen-shell">
      <div className="citizen-content">
        <section className="citizen-hero">
          <div className="citizen-hero-copy">
            <span className="citizen-eyebrow"><Sparkles className="w-3.5 h-3.5" /> ECHELON Citizen Help</span>
            <h1>Your Voice can<br /><span>Create Real Change</span></h1>
            <p>Report local problems, suggest ideas, and be a part of building a smarter, stronger and more inclusive India.</p>
            <button type="button" onClick={() => setActivePage('submit-problem')} className="citizen-hero-button">Report a Problem <span>→</span></button>
          </div>
          <div className="citizen-hero-art" aria-hidden="true">
            <div className="citizen-cloud citizen-cloud-one" />
            <div className="citizen-cloud citizen-cloud-two" />
            <div className="citizen-map-shape">✦</div>
            <div className="citizen-art-orbit"><HeartIcon /><Sparkles /><BuildingIcon /></div>
            <div className="citizen-art-slogan">Real Problems.<br />Smart Solutions.<br />Greater Impact.</div>
          </div>
        </section>

        <section className="citizen-action-grid">
          {actions.map(({ id, title, description, icon: Icon, className, iconClassName }) => (
            <button key={id} type="button" onClick={() => handleAction(id)} className={`${className} citizen-action-card`}>
              <span className={`citizen-action-icon ${iconClassName}`}><Icon className="w-6 h-6" /></span>
              <span className="citizen-action-copy">
                <span className="block text-xl font-black">{title}</span>
                <span className="block mt-1 text-xs leading-relaxed">{description}</span>
              </span>
              <span className="citizen-action-arrow">→</span>
            </button>
          ))}
        </section>

        <div className="citizen-bottom-strip">
          <span>—</span><span>Empowering Citizens</span><b>•</b><span>Connecting Ideas</span><b>•</b><span>Building a Better Tomorrow</span><span>—</span>
        </div>
        <section className="citizen-help-note">
          <PhoneCall className="w-5 h-5" />
          <span><strong>Need immediate help?</strong> For life-threatening emergencies, call 112.</span>
        </section>
      </div>
    </div>
  );
};

const HeartIcon = () => <span className="citizen-orbit-icon">♡</span>;
const BuildingIcon = () => <span className="citizen-orbit-icon">⌂</span>;
