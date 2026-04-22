import React from 'react';
import { MapPin, Users, Clock, Navigation2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

interface CourtMapProps {
  onCourtSelect: (courtId: string) => void;
}

export function CourtMap({ onCourtSelect }: CourtMapProps) {
  const { courts } = useApp();
  const [selectedCourtId, setSelectedCourtId] = React.useState<string | null>(null);
  
  const selectedCourt = selectedCourtId ? courts.find(c => c.id === selectedCourtId) : null;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-safe relative">
      <header className="absolute top-0 w-full p-4 z-40 bg-gradient-to-b from-stone-950/80 to-transparent">
        <div className="bg-[#161616] rounded-full py-2 px-4 border border-white/10 flex items-center gap-2">
          <MapPin size={18} className="text-orange-500" />
          <span className="text-white/60 font-mono font-bold text-[10px] tracking-widest uppercase">Finding courts near you...</span>
        </div>
      </header>

      {/* Mock Map Background */}
      <div className="flex-1 bg-[#111] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full opacity-50 scale-150" />
        <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full opacity-50" />

        {/* Mock Pins */}
        {courts.map((court, i) => {
          // just pseudo-random positions for mock map based on index
          const positions = [
            { top: '40%', left: '30%' },
            { top: '60%', left: '60%' },
            { top: '30%', left: '70%' },
          ];
          const pos = positions[i % positions.length];
          const isSelected = selectedCourtId === court.id;
          
          return (
             <button
              key={court.id}
              onClick={() => setSelectedCourtId(court.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className={`p-2 rounded-full mb-1 transition-all ${isSelected ? 'bg-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/5 group-hover:bg-stone-700'} border-2 ${isSelected ? 'border-orange-400' : 'border-white/30'}`}>
                <MapPin size={20} className={isSelected ? 'text-white' : 'text-slate-300'} />
              </div>
              <div className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded border ${isSelected ? 'bg-orange-500 border-orange-500 text-black' : 'bg-black/80 border-white/10 text-emerald-400'}`}>
                {court.currentPlayers} / 10
              </div>
            </button>
          )
        })}
      </div>

      {/* Court Card Popover */}
      {selectedCourt && (
        <div className="absolute bottom-[80px] w-full px-4 z-40 transition-all transform duration-300 translate-y-0">
          <div className="bg-[#161616] rounded-lg border border-white/10 p-4 shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white uppercase mb-1">{selectedCourt.name}</h3>
                <div className="flex items-center text-white/60 text-xs gap-1">
                  <Navigation2 size={12} className="rotate-45" />
                  <span>{selectedCourt.address} • 2.1 mi</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
                {selectedCourt.skillLevel}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#0A0A0A] p-2 rounded-lg flex flex-col items-center justify-center">
                <Users size={16} className="text-white/60 mb-1" />
                <span className="text-xl font-black text-white">{selectedCourt.currentPlayers}</span>
                <span className="text-[10px] text-white/40 uppercase">Players</span>
              </div>
              <div className="bg-[#0A0A0A] p-2 rounded-lg flex flex-col items-center justify-center">
                <div className="text-white/60 mb-1 font-mono text-sm leading-4">{selectedCourt.currentGameType}</div>
                <span className="text-xl font-black text-white">{selectedCourt.score || '0-0'}</span>
                <span className="text-[10px] text-white/40 uppercase">Status</span>
              </div>
              <div className="bg-[#0A0A0A] p-2 rounded-lg flex flex-col items-center justify-center">
                <Clock size={16} className="text-white/60 mb-1" />
                <span className="text-xl font-black text-white">{selectedCourt.waitTimeMins}</span>
                <span className="text-[10px] text-white/40 uppercase">Wait Time</span>
              </div>
            </div>

            <Button 
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold h-12 rounded-md text-lg"
              onClick={() => onCourtSelect(selectedCourt.id)}
            >
              COURT DETAILS
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
