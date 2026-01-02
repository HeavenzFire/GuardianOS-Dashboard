
import React from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck, RefreshCw, FileCode, Play, Trash2, Cpu } from 'lucide-react';
import { GuardianState } from '../types';

interface DashboardProps {
  state: GuardianState;
  onCorrupt: () => void;
  onHeal: () => void;
  onStartBreathing: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onCorrupt, onHeal, onStartBreathing }) => {
  const isHealthy = state.integrityScore === 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Integrity & Hardware Monitor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border transition-all duration-500 ${isHealthy ? 'bg-emerald-950/20 border-emerald-500/30 shadow-lg shadow-emerald-500/5' : 'bg-red-950/20 border-red-500/30 shadow-lg shadow-red-500/10'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Integrity</span>
            {isHealthy ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
          </div>
          <div className="text-3xl font-bold text-white mb-1">{state.integrityScore}%</div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${isHealthy ? 'bg-emerald-500' : 'bg-red-500'}`} 
              style={{ width: `${state.integrityScore}%` }}
            />
          </div>
          <p className="text-[10px] mt-2 opacity-50 mono">MD5: Verified against /etc/system.sha256</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Hardware Node</span>
            <Cpu className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="mono opacity-60">GPIO 17 (Button)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">LISTENING</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="mono opacity-60">OverlayFS</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">READ-ONLY</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Recovery Actions</span>
          <div className="flex space-x-2">
            {!isHealthy ? (
              <button 
                onClick={onHeal}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Self-Heal</span>
              </button>
            ) : (
              <button 
                onClick={onCorrupt}
                className="flex-1 bg-red-600/10 hover:bg-red-600/20 border border-red-500/40 text-red-400 font-bold py-2 rounded-xl flex items-center justify-center space-x-2 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Simulate Bit-Rot</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Orchestrator Section */}
      <div className="p-8 bg-emerald-600/10 border border-emerald-500/20 rounded-3xl text-center space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Play className="w-32 h-32" />
        </div>
        <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 animate-pulse">
          <Play className="w-8 h-8 text-emerald-400" fill="currentColor" />
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Main Controller Operational</h2>
          <p className="max-w-md mx-auto text-gray-400 text-sm leading-relaxed">
            System is idling in <span className="text-emerald-400 mono">main.py</span> mode. Awaiting physical button trigger or manual override to start the <span className="text-emerald-400">breathing_guide.py</span> routine.
          </p>
        </div>
        <button 
          onClick={onStartBreathing}
          className="relative z-10 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95 border border-emerald-400/20"
        >
          SIMULATE BUTTON PRESS (GPIO 17)
        </button>
      </div>

      {/* File Integrity Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center">
            <FileCode className="w-4 h-4 mr-2 text-emerald-400" />
            VFS Integrity Monitor
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold border border-emerald-500/20">LIVE</span>
        </div>
        <div className="divide-y divide-white/10">
          {state.files.map((file, idx) => (
            <div key={idx} className="px-6 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
              <div className="flex flex-col">
                <span className="mono text-xs text-gray-300 group-hover:text-emerald-400 transition-colors">{file.path}</span>
                <span className="mono text-[9px] text-gray-600 uppercase tracking-tighter">SHA256: {file.hash}</span>
              </div>
              <div className="flex items-center space-x-3">
                {file.status === 'verified' && (
                  <div className="flex items-center text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> OK
                  </div>
                )}
                {file.status === 'corrupted' && (
                  <div className="flex items-center text-red-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" /> FAILED
                  </div>
                )}
                {file.status === 'restoring' && (
                  <div className="flex items-center text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" /> RESTORING
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
