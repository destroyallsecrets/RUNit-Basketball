import React from 'react';
import { Court, Game, User } from '../types';
import { MapPin, Users, Clock, Trophy, Star, CircleDot } from 'lucide-react';

interface ShareableCardProps {
  type: 'court' | 'game' | 'profile';
  data: Court | Game | User;
}

export function ShareableCard({ type, data }: ShareableCardProps) {
  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'Elite': return 'bg-red-600';
      case 'Competitive': return 'bg-blue-600';
      default: return 'bg-green-600';
    }
  };

  if (type === 'court') {
    const court = data as Court;
    return (
      <div className="w-[320px] bg-[#0A0A0A] rounded-xl border-2 border-white/20 overflow-hidden">
        <div className="bg-[#ef4444] px-4 py-2 flex items-center justify-between">
          <span className="text-black font-black text-sm tracking-wider">RUNIT</span>
          <CircleDot size={20} className="text-black" />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-lg">{court.name}</h2>
              <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
                <MapPin size={12} />
                <span>{court.address}</span>
              </div>
            </div>
            <span className={`${getSkillColor(court.skillLevel)} text-white text-[10px] font-bold px-2 py-1 rounded`}>
              {court.skillLevel}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <Users size={16} className="text-[#ef4444] mx-auto mb-1" />
              <div className="text-white font-bold">{court.currentPlayers}/{court.maxPlayers}</div>
              <div className="text-white/40 text-[10px]">PLAYERS</div>
            </div>
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <Trophy size={16} className="text-[#ef4444] mx-auto mb-1" />
              <div className="text-white font-bold">{court.currentGameType || '-'}</div>
              <div className="text-white/40 text-[10px]">FORMAT</div>
            </div>
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <Clock size={16} className="text-[#ef4444] mx-auto mb-1" />
              <div className="text-white font-bold">{court.waitTimeMins === 0 ? 'NOW' : `${court.waitTimeMins}m`}</div>
              <div className="text-white/40 text-[10px]">WAIT</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{court.isIndoor ? 'Indoor' : 'Outdoor'} • {court.surfaceType}</span>
            {court.driveTimeMins && <span>{court.driveTimeMins} min drive</span>}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'game') {
    const game = data as Game;
    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'in_progress': return 'bg-red-600 text-white';
        case 'waiting': return 'bg-green-600 text-white';
        default: return 'bg-white/20 text-white';
      }
    };
    
    return (
      <div className="w-[320px] bg-[#0A0A0A] rounded-xl border-2 border-white/20 overflow-hidden">
        <div className="bg-[#ef4444] px-4 py-2 flex items-center justify-between">
          <span className="text-black font-black text-sm tracking-wider">RUNIT GAME</span>
          <span className={`${getStatusBadge(game.status)} text-[10px] font-bold px-2 py-0.5 rounded`}>
            {game.status.toUpperCase()}
          </span>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-lg">{game.courtName}</h2>
              <div className="text-white/60 text-xs mt-1">{game.startTime}</div>
            </div>
            <span className={`${getSkillColor(game.skillLevel)} text-white text-[10px] font-bold px-2 py-1 rounded`}>
              {game.skillLevel}
            </span>
          </div>
          
          {game.score && (
            <div className="bg-[#161616] rounded-lg p-4 text-center mb-3">
              <div className="text-4xl font-black text-white">{game.score}</div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <Users size={16} className="text-[#ef4444] mx-auto mb-1" />
              <div className="text-white font-bold">{game.currentPlayers}/{game.maxPlayers}</div>
              <div className="text-white/40 text-[10px]">PLAYERS</div>
            </div>
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <Trophy size={16} className="text-[#ef4444] mx-auto mb-1" />
              <div className="text-white font-bold">{game.gameType}</div>
              <div className="text-white/40 text-[10px]">FORMAT</div>
            </div>
          </div>
          
          <div className="text-xs text-white/60 text-center">
            Join via RUNit App
          </div>
        </div>
      </div>
    );
  }

  if (type === 'profile') {
    const user = data as User;
    const winRate = user.gamesPlayed ? Math.round((user.gamesWon || 0) / user.gamesPlayed * 100) : 0;
    
    return (
      <div className="w-[320px] bg-[#0A0A0A] rounded-xl border-2 border-white/20 overflow-hidden">
        <div className="bg-[#ef4444] px-4 py-2 flex items-center justify-between">
          <span className="text-black font-black text-sm tracking-wider">RUNIT PROFILE</span>
          <Star size={20} className="text-black" fill="currentColor" />
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#161616] border-2 border-[#ef4444] flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{user.name[0]}</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{user.name}</h2>
              <div className="text-white/60 text-xs">{user.username}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <div className="text-white font-bold">{user.followersCount}</div>
              <div className="text-white/40 text-[10px]">FOLLOWERS</div>
            </div>
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <div className="text-white font-bold">{user.gamesPlayed || 0}</div>
              <div className="text-white/40 text-[10px]">GAMES</div>
            </div>
            <div className="bg-[#161616] p-3 rounded-lg text-center">
              <div className="text-green-500 font-bold">{winRate}%</div>
              <div className="text-white/40 text-[10px]">WIN RATE</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className={`${getSkillColor(user.skillLevel)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              {user.skillLevel}
            </span>
            <span className="bg-[#161616] text-white text-xs font-bold px-3 py-1 rounded-full">
              {user.archetype}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}