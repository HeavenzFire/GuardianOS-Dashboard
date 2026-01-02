
import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface TerminalProps {
  onLanguageSelect: (lang: Language) => void;
  bootLogs: string[];
}

const Terminal: React.FC<TerminalProps> = ({ onLanguageSelect, bootLogs }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (lang: Language) => {
    setIsTransitioning(true);
    setTimeout(() => onLanguageSelect(lang), 800);
  };

  return (
    <div className={`flex-1 bg-black rounded-3xl border border-emerald-900/30 p-8 mono text-emerald-500 overflow-hidden relative terminal-glow transition-opacity duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="space-y-1 mb-10 opacity-60">
        {bootLogs.map((log, i) => (
          <div key={i} className="text-[10px] leading-tight select-none">{log}</div>
        ))}
        <div className="w-2 h-4 bg-emerald-500 inline-block animate-pulse ml-1 align-middle"></div>
      </div>

      {showMenu && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <pre className="text-[9px] sm:text-xs leading-none mb-8 tracking-tighter sm:tracking-normal overflow-x-auto">
{`┌────────────────────────────────────────────────┐
│ GUARDIANOS ETHICS STATEMENT                    │
├────────────────────────────────────────────────┤
│ This device is:                                │
│ • OFFLINE — never connects to the internet     │
│ • DATA-FREE — collects nothing, stores nothing │
│ • SELF-HEALING — always returns to a safe state│
│ • BILINGUAL — serves all children equally      │
│                                                │
│ It exists solely to help a child breathe.      │
│                                                │
│ One breath. One moment. One act of care.       │
│                                                │
│ [HARDWARE BUTTON PIN 11 / GPIO 17]             │
│ CLICK: English | HOLD (3s): Español            │
└────────────────────────────────────────────────┘`}
          </pre>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => handleSelect('en')}
              className="group flex-1 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-400 px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 text-emerald-400 hover:text-white"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>[ ENGLISH ]</span>
              </div>
              <div className="text-[9px] opacity-40 group-hover:opacity-100 mt-1 uppercase tracking-widest font-normal">Short Press</div>
            </button>
            <button 
              onClick={() => handleSelect('es')}
              className="group flex-1 bg-amber-600/10 hover:bg-amber-600 border border-amber-500/40 hover:border-amber-400 px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 text-amber-400 hover:text-white"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>[ ESPAÑOL ]</span>
              </div>
              <div className="text-[9px] opacity-40 group-hover:opacity-100 mt-1 uppercase tracking-widest font-normal">Long Press (3s)</div>
            </button>
          </div>
        </div>
      )}
      
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Secure Shell active</span>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)] animate-pulse"></div>
      </div>
    </div>
  );
};

export default Terminal;
