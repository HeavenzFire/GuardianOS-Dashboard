
import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Activity, RefreshCw } from 'lucide-react';
import { Language, SystemState, GuardianState, SystemFile } from './types';
import Terminal from './components/Terminal';
import Dashboard from './components/Dashboard';
import AIConsultant from './components/AIConsultant';
import BreathingSession from './components/BreathingSession';

const INITIAL_FILES: SystemFile[] = [
  { path: "/opt/guardian_os/main.py", status: 'verified', hash: "a3f8..." },
  { path: "/opt/guardian_os/boot_menu.py", status: 'verified', hash: "9e12..." },
  { path: "/opt/guardian_os/breathing_guide.py", status: 'verified', hash: "4d7c..." },
  { path: "/opt/guardian_os/audio/en_breathing.wav", status: 'verified', hash: "2b91..." },
  { path: "/opt/guardian_os/audio/es_breathing.wav", status: 'verified', hash: "fe44..." },
  { path: "/etc/fstab", status: 'verified', hash: "110c..." },
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<GuardianState>({
    language: null,
    state: SystemState.BOOTING,
    integrityScore: 100,
    files: INITIAL_FILES
  });

  const [bootLog, setBootLog] = useState<string[]>(["[SYSTEM] Initializing GuardianOS Kernel...", "[SYSTEM] Loading OverlayFS..."]);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    if (appState.state === SystemState.BOOTING) {
      const timer = setTimeout(() => {
        setBootLog(prev => [...prev, "[OK] Self-heal logic active.", "[SYSTEM] Executing: python3 /opt/guardian_os/boot_menu.py"]);
        setAppState(prev => ({ ...prev, state: SystemState.COVENANT }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [appState.state]);

  const handleLanguageSelect = (lang: Language) => {
    setBootLog(prev => [...prev, `[OK] Language selected: ${lang}`, "[SYSTEM] Starting main.py service...", "[SYSTEM] Listening on GPIO 17..."]);
    // Short delay to simulate service start
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        language: lang,
        state: SystemState.OPERATIONAL
      }));
    }, 800);
  };

  const simulateCorruption = () => {
    setAppState(prev => {
      const newFiles = [...prev.files];
      newFiles[1] = { ...newFiles[1], status: 'corrupted' };
      return { ...prev, files: newFiles, integrityScore: 85 };
    });
  };

  const triggerSelfHeal = () => {
    setAppState(prev => ({
      ...prev,
      files: prev.files.map(f => ({ ...f, status: f.status === 'corrupted' ? 'restoring' : f.status }))
    }));

    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        files: prev.files.map(f => ({ ...f, status: 'verified' })),
        integrityScore: 100
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-gray-300 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Left Column: Core System */}
      <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 overflow-y-auto max-h-screen relative">
        <header className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">GuardianOS</h1>
              <p className="text-xs text-emerald-500 uppercase tracking-widest font-semibold">Ethical Core • v1.0.4</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">System Armed</span>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col min-h-0 space-y-6">
          {appState.state === SystemState.COVENANT ? (
            <Terminal 
              onLanguageSelect={handleLanguageSelect} 
              bootLogs={bootLog}
            />
          ) : appState.state === SystemState.OPERATIONAL ? (
            <Dashboard 
              state={appState} 
              onCorrupt={simulateCorruption} 
              onHeal={triggerSelfHeal} 
              onStartBreathing={() => setIsBreathingActive(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin" />
              <p className="mono text-emerald-500 tracking-tighter">INITIATING SECURE BOOT...</p>
            </div>
          )}
        </main>

        {isBreathingActive && (
          <BreathingSession 
            language={appState.language} 
            onClose={() => setIsBreathingActive(false)} 
          />
        )}
      </div>

      {/* Right Column: AI Consultant */}
      <div className="w-full md:w-96 bg-white/5 border-l border-white/10 p-4 md:p-6 flex flex-col space-y-6 shrink-0">
        <AIConsultant systemContext={JSON.stringify(appState)} />
        
        <div className="mt-auto space-y-4">
          <div className="p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/20">
            <h3 className="text-emerald-400 font-semibold mb-2 flex items-center text-sm uppercase tracking-wider">
              <BookOpen className="w-4 h-4 mr-2" /> 
              The Covenant
            </h3>
            <p className="text-xs leading-relaxed italic opacity-80 text-gray-400">
              GuardianOS is a promise to the vulnerable. No logs. No trackers. Just software that knows how to care when it's needed most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
