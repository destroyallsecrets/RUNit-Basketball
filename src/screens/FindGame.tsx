import React, { useState } from 'react';
import { MapPin, Search, SlidersHorizontal, Users } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

interface FindGameProps {
  onCourtSelect: (courtId: string) => void;
}

export function FindGame({ onCourtSelect }: FindGameProps) {
  const { courts } = useApp();
  const [format, setFormat] = useState('Any Format');
  const [skill, setSkill] = useState('All Levels');

  const filteredCourts = courts.filter(c => {
    if (format !== 'Any Format' && c.currentGameType !== format) return false;
    if (skill !== 'All Levels' && c.skillLevel !== skill) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A]">
        <h1 className="text-sm font-bold tracking-widest uppercase text-white shrink-0">Join a Run</h1>
        <p className="text-white/40 text-[10px] mt-1 font-mono">SOCIAL UTILITY FOR HOOPERS</p>
        
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input 
              placeholder="Search city, zip, or court..." 
              className="bg-[#161616] border-white/10 text-white pl-10 focus-visible:ring-orange-500 placeholder:text-white/40 rounded-md"
            />
          </div>
          <Button size="icon" variant="outline" className="shrink-0 border-white/10 bg-[#161616] text-white/60 hover:text-white rounded-md h-10 w-10">
            <SlidersHorizontal size={18} />
          </Button>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {['Any Format', '3v3', '4v4', '5v5'].map(f => (
             <button 
                key={f} 
                onClick={() => setFormat(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${format === f ? 'bg-orange-600 border-orange-600 text-black' : 'bg-[#161616] border-white/10 text-slate-300 hover:bg-white/5'}`}>
               {f}
             </button>
          ))}
          {['All Levels', 'Casual', 'Competitive', 'Elite'].map(s => (
             <button 
                key={s} 
                onClick={() => setSkill(s)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${skill === s ? 'bg-orange-600 border-orange-600 text-black' : 'bg-[#161616] border-white/10 text-slate-300 hover:bg-white/5'}`}>
               {s}
             </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide p-4">
        <h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Courts Nearby (Active)</h2>
        <div className="space-y-4">
          {filteredCourts.filter(c => c.currentPlayers > 0).map(court => (
            <button 
              key={court.id} 
              onClick={() => onCourtSelect(court.id)}
              className="w-full text-left bg-[#161616] rounded-lg border border-white/10 overflow-hidden flex flex-col group transition-all hover:border-white/30"
            >
              <div className="flex">
                <div className="w-1/3 aspect-[4/3] bg-white/5 shrink-0">
                  <img src={court.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={court.name} />
                </div>
                <div className="p-4 flex flex-col justify-center flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold text-white uppercase leading-tight">{court.name}</h3>
                  </div>
                  <div className="flex items-center text-xs text-white/60 gap-1 mb-3">
                    <MapPin size={12} />
                    <span>{court.address.split(',')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 px-2 py-1 rounded text-xs font-bold font-mono">
                      <span>{court.currentGameType}</span>
                    </div>
                    {court.currentPlayers < 10 ? (
                      <div className="flex gap-1 items-center text-xs text-green-400 font-medium">
                        <Users size={12} />
                        Need {10 - court.currentPlayers} more
                      </div>
                    ) : (
                       <div className="text-xs text-white/40 font-medium">{court.waitTimeMins}m wait</div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
