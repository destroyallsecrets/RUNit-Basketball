import React from 'react';
import { Court } from '../types';
import { ArrowLeft, MapPin, Users, Activity, ExternalLink, Share2, Star, Plus, Clock, Home, Car } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { useApp } from '../context/AppContext';

interface CourtDetailsProps {
  court: Court;
  onBack: () => void;
  onViewAllPlayers: (players: Court['activePlayers']) => void;
}

export function CourtDetails({ court: initialCourt, onBack, onViewAllPlayers }: CourtDetailsProps) {
  const { joinCourt, leaveCourt, toggleFavorite, isFavorite, shareContent, user, createGame } = useApp();
  const isJoined = court.activePlayers.some(p => p.id === user.id);
  const isFav = isFavorite(court.id);

  const handleCheckIn = () => {
    if (isJoined) {
      leaveCourt(court.id);
    } else {
      joinCourt(court.id);
    }
  };

  const getSkillBadge = (skill: string) => {
    switch (skill) {
      case 'Elite': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Competitive': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-green-500/20 text-green-500 border-green-500/30';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <div className="relative h-48 border-b border-white/10 shrink-0">
        {court.imageUrl ? (
          <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
        ) : (
          <div className="w-full h-full bg-[#161616] flex items-center justify-center">
            <MapPin size={48} className="text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-[#161616]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>

        <button 
          onClick={() => toggleFavorite(court.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-[#161616]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
        >
          <Star size={18} className={isFav ? 'text-yellow-500 fill-yellow-500' : 'text-white'} />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{court.name}</h1>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getSkillBadge(court.skillLevel)}`}>
                  {court.skillLevel}
                </span>
              </div>
              <div className="flex items-center text-white/60 text-sm gap-1">
                <MapPin size={14} />
                <span>{court.address}{court.neighborhood && `, ${court.neighborhood}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#161616] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-red-500" />
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Status</span>
            </div>
            <div className="text-lg font-bold text-white">{court.currentGameType || '-'}</div>
            <div className="text-xs text-white/60">{court.score || 'Waiting'}</div>
          </div>
          
          <div className="bg-[#161616] p-4 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-red-500" />
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Players</span>
            </div>
            <div className="text-lg font-bold text-white">{court.currentPlayers}/{court.maxPlayers}</div>
            <div className="text-xs text-white/60">{court.waitTimeMins === 0 ? 'Now playing' : `${court.waitTimeMins}m wait`}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 text-center">
            <div className="text-white/60 mb-1">{court.isIndoor ? <Home size={18} className="mx-auto" /> : <MapPin size={18} className="mx-auto" />}</div>
            <div className="text-xs text-white/40">Type</div>
            <div className="text-sm font-medium text-white">{court.isIndoor ? 'Indoor' : 'Outdoor'}</div>
          </div>
          
          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 text-center">
            <div className="text-white/60 mb-1"><Car size={18} className="mx-auto" /></div>
            <div className="text-xs text-white/40">Drive</div>
            <div className="text-sm font-medium text-white">{court.driveTimeMins ? `${court.driveTimeMins}m` : '-'}</div>
          </div>

          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 text-center">
            <div className="text-white/60 mb-1"><Clock size={18} className="mx-auto" /></div>
            <div className="text-xs text-white/40">Walk</div>
            <div className="text-sm font-medium text-white">{court.walkTimeMins ? `${court.walkTimeMins}m` : '-'}</div>
          </div>
        </div>

        {court.surfaceType && (
          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Surface</span>
              <span className="text-sm font-medium text-white capitalize">{court.surfaceType}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <Button 
            onClick={() => shareContent('court', court)}
            variant="outline" 
            className="flex-1 border-white/10 text-white font-bold h-10"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button 
            onClick={() => createGame(court.id, '4v4', 'Competitive')}
            className="flex-1 bg-red-600 hover:bg-red-500 text-black font-bold h-10"
          >
            <Plus size={16} className="mr-2" />
            Create Game
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-red-500 flex items-center gap-2">
              Players Here
              <span className="bg-white/5 text-white/60 text-xs px-2 py-0.5 rounded-full">{court.activePlayers.length}</span>
            </h2>
            {court.activePlayers.length > 3 && (
              <button 
                onClick={() => onViewAllPlayers(court.activePlayers)}
                className="text-[10px] text-red-500 hover:text-red-400 uppercase tracking-widest font-bold"
              >
                View All
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {court.activePlayers.slice(0, 3).map((player) => (
            <div key={player.id} className="flex items-center gap-3 p-3 bg-[#161616] rounded-lg border border-white/5">
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{player.name}</h4>
                <div className="text-[11px] text-white/40">{player.username} • {player.skillLevel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border-t border-white/10">
        <Button 
          onClick={handleCheckIn}
          className={`w-full font-bold uppercase text-xs tracking-widest h-12 ${
            isJoined 
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' 
              : 'bg-red-600 hover:bg-red-500 text-black'
          }`}
        >
          {isJoined ? 'CHECK OUT' : 'CHECK IN'}
        </Button>
      </div>
    </div>
  );
}