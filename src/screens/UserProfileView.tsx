import React from 'react';
import { User } from '../types';
import { ArrowLeft, Trophy, Star, MapPin, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { useApp } from '../context/AppContext';

interface UserProfileViewProps {
  user: User;
  onBack: () => void;
}

export function UserProfileView({ user, onBack }: UserProfileViewProps) {
  const { shareContent } = useApp();

  const winRate = user.gamesPlayed ? Math.round((user.gamesWon || 0) / user.gamesPlayed * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <header className="px-4 py-4 pt-safe border-b border-white/10 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-white">Profile</h1>
        </div>
        <button onClick={() => shareContent('profile', user)} className="p-2 text-white/60 hover:text-white">
          <Share2 size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-2 border-red-500">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-white">{user.name}</h2>
              <p className="text-sm text-white/40">{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#161616] p-4 rounded-lg border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{user.followersCount?.toLocaleString() || 0}</div>
              <div className="text-[10px] text-white/40 uppercase">Followers</div>
            </div>
            <div className="bg-[#161616] p-4 rounded-lg border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{user.gamesPlayed || 0}</div>
              <div className="text-[10px] text-white/40 uppercase">Games</div>
            </div>
            <div className="bg-[#161616] p-4 rounded-lg border border-white/10 text-center">
              <div className="text-2xl font-bold text-white">{winRate}%</div>
              <div className="text-[10px] text-white/40 uppercase">Win Rate</div>
            </div>
          </div>

          <div className="bg-[#161616] rounded-lg border border-white/10 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} className="text-red-500" />
              <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Stats</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Games Played</span>
                <span className="text-white font-medium">{user.gamesPlayed || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Games Won</span>
                <span className="text-green-500 font-medium">{user.gamesWon || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Current Streak</span>
                <span className="text-white font-medium">-</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold">
              {user.skillLevel}
            </div>
            <div className="bg-[#161616] border border-white/10 text-white/60 px-3 py-1 rounded-full text-xs font-bold">
              {user.archetype}
            </div>
          </div>

          {user.courtStats?.totalVisits && (
            <div className="bg-[#161616] rounded-lg border border-white/10 p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-red-500" />
                <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Court Activity</span>
              </div>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Total Visits</span>
                  <span className="text-white font-medium">{user.courtStats.totalVisits}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#161616] rounded-lg border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-red-500" />
              <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Badges</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-lg">🏀</div>
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-lg">🔥</div>
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-lg">🌳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}