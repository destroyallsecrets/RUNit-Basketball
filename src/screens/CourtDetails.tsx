import React from 'react';
import { Court } from '../types';
import { ArrowLeft, MapPin, Users, Activity, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { useApp } from '../context/AppContext';

interface CourtDetailsProps {
  court: Court;
  onBack: () => void;
}

export function CourtDetails({ court: initialCourt, onBack }: CourtDetailsProps) {
  const { joinCourt, user, courts } = useApp();
  const court = courts.find(c => c.id === initialCourt.id) || initialCourt;
  const isJoined = court.activePlayers.some(p => p.id === user.id);
  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <div className="relative h-64 border-b border-white/10 shrink-0">
        <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-[#161616]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-white">{court.name}</h1>
              <div className="flex items-center text-slate-300 text-sm gap-1 mt-1">
                <MapPin size={14} />
                <span>{court.address}</span>
              </div>
            </div>
            <button onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({ title: 'RunIt Court', text: `Run happening at ${court.name} - ${court.address}` });
                } catch (e) {}
              } else {
                alert('Sharing is not supported on this device/browser.');
              }
            }} className="bg-[#161616]/80 backdrop-blur-md border border-white/20 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-[#161616]">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide p-4 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#161616] p-4 rounded-lg border border-white/10 flex items-center gap-3">
             <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
               <Activity size={24} />
             </div>
             <div>
               <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Status</div>
               <div className="text-sm font-bold text-white leading-tight">{court.currentGameType} Game</div>
               <div className="text-[10px] text-orange-500 font-mono">{court.score || 'Waiting'}</div>
             </div>
          </div>
          
          <div className="bg-[#161616] p-4 rounded-lg border border-white/10 flex items-center gap-3">
             <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
               <Users size={24} />
             </div>
             <div>
               <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Players</div>
               <div className="text-lg font-bold text-white leading-tight">{court.currentPlayers} / 10</div>
               <div className="text-sm text-white/60">{court.waitTimeMins}m wait</div>
             </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-orange-500 mb-3 flex items-center gap-2">
            Players On Court
            <span className="bg-white/5 text-slate-300 text-xs px-2 py-0.5 rounded-full">{court.activePlayers.length}</span>
          </h2>
          <Button variant="ghost" className="text-orange-500 text-sm font-semibold h-auto p-0 hover:bg-transparent hover:text-orange-400">View All</Button>
        </div>

        <div className="space-y-3 mb-8">
          {court.activePlayers.map((player) => (
            <div key={player.id} className="flex items-center gap-3 p-3 bg-[#161616] rounded-md border border-white/10">
               <Avatar className="w-12 h-12 border-2 border-white/20">
                  <AvatarImage src={player.avatarUrl} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide">
                   <h4 className="text-[10px] font-mono text-white flex items-center gap-2">
                     {player.name}
                     {player.skillLevel === 'Elite' && <span className="bg-orange-500/20 border border-orange-500/20 text-orange-500 text-[9px] px-1 py-0.5 rounded ml-auto uppercase tracking-widest">Elite</span>}
                   </h4>
                   <div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{player.username}</div>
                </div>
                <Button size="sm" variant="outline" className="border-white/20 text-slate-300 hover:bg-white/5 hover:text-white">Profile</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border-t border-white/10 z-50">
        <Button 
          onClick={() => joinCourt(court.id)}
          className={`w-full text-black font-black uppercase text-xs tracking-widest h-12 rounded-md ${isJoined ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-orange-600 hover:bg-orange-500'}`}
        >
          {isJoined ? 'LEAVE COURT' : 'CHECK IN / JOIN RUN'}
        </Button>
      </div>
    </div>
  );
}
