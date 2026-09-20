import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_SERVICES } from '../data/mockData';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  Flame, 
  UserCheck, 
  AlertTriangle, 
  Smile, 
  Radio, 
  MapPin, 
  CheckCircle, 
  Volume2 
} from 'lucide-react';

export const EmergencyModal = () => {
  const { 
    isEmergencyOpen, 
    setIsEmergencyOpen, 
    activeSOSAlert, 
    setActiveSOSAlert, 
    triggerEmergencySOS,
    currentUser 
  } = useApp();

  const [selectedService, setSelectedService] = useState(null);
  const [dispatchStatus, setDispatchStatus] = useState('idle'); // idle | connecting | dispatched

  if (!isEmergencyOpen) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-blue-600" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-600" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-pink-600" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-emerald-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-purple-600" />;
      default: return <ShieldAlert className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setDispatchStatus('connecting');
    
    // Simulate instantaneous dispatch
    setTimeout(() => {
      triggerEmergencySOS(service);
      setDispatchStatus('dispatched');
    }, 1200);
  };

  const handleReset = () => {
    setSelectedService(null);
    setDispatchStatus('idle');
    setActiveSOSAlert(null);
    setIsEmergencyOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden">
        
        {/* Header with Red Warning Strip */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🦺</span>
            <div>
              <h3 className="font-extrabold text-lg tracking-tight">EMERGENCY SOS DISPATCH</h3>
              <p className="text-xs text-red-100">National Emergency Response Integrated Grid</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {dispatchStatus === 'idle' && (
            <>
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-slate-800">
                  Select your required emergency service to trigger instantaneous nearby dispatch:
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Live GPS: <span className="font-bold text-slate-800">{currentUser.location || "Ranchi Urban Corridor (23.34°N, 85.30°E)"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {EMERGENCY_SERVICES.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => handleSelectService(srv)}
                    className="p-4 rounded-2xl border-2 border-slate-100 hover:border-red-400 hover:bg-red-50/40 text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-white shadow-xs">
                        {getIcon(srv.icon)}
                      </div>
                      <span className="text-xs font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                        {srv.number.split('/')[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-700 transition-colors">
                        {srv.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Direct Dial Police: <strong className="text-slate-900">112</strong></span>
                <span>Ambulance: <strong className="text-slate-900">108</strong></span>
              </div>
            </>
          )}

          {dispatchStatus === 'connecting' && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                <div className="w-full h-full flex items-center justify-center text-red-600">
                  <Radio className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <h4 className="font-bold text-lg text-slate-900">Transmitting Emergency Coordinates...</h4>
              <p className="text-xs text-slate-500">
                Pinging nearest police wireless control room & rapid response unit.
              </p>
            </div>
          )}

          {dispatchStatus === 'dispatched' && activeSOSAlert && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <div className="inline-flex p-2 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-emerald-900">
                  SOS Broadcast Activated ({activeSOSAlert.id})
                </h4>
                <p className="text-xs text-emerald-700 font-medium">
                  {activeSOSAlert.serviceName} has received your emergency call and GPS location.
                </p>
              </div>

              <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Service Assigned:</span>
                  <span className="font-bold text-slate-900">{activeSOSAlert.serviceName} ({activeSOSAlert.number})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Dispatched Patrol:</span>
                  <span className="font-bold text-indigo-700">{activeSOSAlert.dispatchedUnit}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Caller Identity:</span>
                  <span className="font-bold text-slate-900">{activeSOSAlert.contactName} ({activeSOSAlert.contactPhone})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Transmitted GPS:</span>
                  <span className="font-bold text-slate-900">{activeSOSAlert.userLocation}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>The control room will call your phone <strong>{currentUser.phone}</strong> in 30-45 seconds. Keep your phone line clear.</span>
              </div>

              <div className="flex gap-3">
                <a
                  href={`tel:${selectedService?.number.split('/')[0].trim()}`}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-red-500/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  Direct Phone Call ({selectedService?.number.split('/')[0].trim()})
                </a>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Close & Acknowledge
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
