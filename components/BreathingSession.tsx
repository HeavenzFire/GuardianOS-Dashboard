
import React, { useState, useEffect } from 'react';
import { X, Wind, Heart } from 'lucide-react';
import { Language } from '../types';

interface BreathingSessionProps {
  language: Language;
  onClose: () => void;
}

const BreathingSession: React.FC<BreathingSessionProps> = ({ language, onClose }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    const runCycle = () => {
      // Inhale: 4s
      setPhase('inhale');
      setProgress(0);
      let p = 0;
      timer = setInterval(() => {
        p += 1;
        setProgress(p);
        if (p >= 100) {
          clearInterval(timer);
          // Hold: 4s
          setPhase('hold');
          p = 100;
          timer = setInterval(() => {
            if (p <= 0) {
              clearInterval(timer);
              // Exhale: 4s
              setPhase('exhale');
              p = 100;
              timer = setInterval(() => {
                p -= 1;
                setProgress(p);
                if (p <= 0) {
                  clearInterval(timer);
                  // Repeat
                  runCycle();
                }
              }, 40);
            }
            p -= 1;
          }, 40);
        }
      }, 40);
    };

    runCycle();
    return () => clearInterval(timer);
  }, []);

  const getLabel = () => {
    if (language === 'es') {
      switch (phase) {
        case 'inhale': return 'INHALA';
        case 'hold': return 'MANTÉN';
        case 'exhale': return 'EXHALA';
        default: return '';
      }
    }
    switch (phase) {
      case 'inhale': return 'INHALE';
      case 'hold': return 'HOLD';
      case 'exhale': return 'EXHALE';
      default: return '';
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#0a0a0a]/95 flex flex-col items-center justify-center animate-in fade-in duration-500 p-8 text-center">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
      >
        <X className="w-6 h-6 text-gray-400" />
      </button>

      <div className="space-y-12">
        <div className="flex flex-col items-center space-y-2">
          <Heart className="w-10 h-10 text-red-500 animate-pulse" />
          <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">
            {getLabel()}
          </h2>
          <p className="text-emerald-500 mono text-xs tracking-widest uppercase opacity-60">
            Running: /opt/guardian_os/breathing_guide.py
          </p>
        </div>

        {/* The Breathing Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Animated Background Rings */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-emerald-500/20 transition-transform duration-1000 ease-in-out"
            style={{ transform: `scale(${0.5 + (progress / 100) * 0.5})` }}
          />
          <div 
            className="absolute inset-0 rounded-full border border-emerald-500/10 animate-ping"
          />
          
          {/* Main Visualizer */}
          <div 
            className="w-full h-full rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.3)] transition-transform duration-75"
            style={{ 
              transform: `scale(${0.4 + (progress / 100) * 0.6})`,
              opacity: phase === 'hold' ? 1 : 0.8 
            }}
          >
            <Wind className="w-16 h-16 text-emerald-400" />
          </div>
        </div>

        <div className="max-w-xs mx-auto text-gray-500 text-sm leading-relaxed italic">
          {language === 'es' 
            ? "Una respiración. Un momento. Un acto de cuidado." 
            : "One breath. One moment. One act of care."}
        </div>
      </div>
    </div>
  );
};

export default BreathingSession;
