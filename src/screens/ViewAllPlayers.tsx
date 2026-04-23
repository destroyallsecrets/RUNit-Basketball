import React from 'react';
import { User } from '../types';
import { ArrowLeft, Users, Trophy } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

interface ViewAllPlayersProps {
  players: User[];
  title?: string;
  onBack: () => void;
  onPlayerClick?: (user: User) => void;
}

export function ViewAllPlayers({ players, title = "Players", onBack, onPlayerClick }: ViewAllPlayersProps) {
  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <header className="px-4 py-4 pt-safe border-b border-white/10 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Users size={20} className="text-red-500" />
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <span className="text-sm text-white/50">({players.length})</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {players.map((player) => (
            <div 
              key={player.id} 
              onClick={() => onPlayerClick?.(player)}
              className={`flex items-center gap-3 p-3 bg-[#161616] rounded-lg border border-white/5 cursor-pointer hover:border-white/20 transition-colors ${onPlayerClick ? 'active:bg-white/5' : ''}`}
            >
              <Avatar className="w-12 h-12 border border-white/10">
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback className="text-lg">{player.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{player.name}</h4>
                <div className="text-[11px] text-white/40">{player.username}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                    player.skillLevel === 'Elite' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                    player.skillLevel === 'Competitive' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                    'bg-green-500/20 text-green-500 border-green-500/30'
                  }`}>
                    {player.skillLevel}
                  </span>
                  <span className="text-[9px] text-white/30">{player.archetype}</span>
                </div>
              </div>
              {player.gamesWon !== undefined && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-500">
                    <Trophy size={12} />
                    <span className="text-sm font-bold">{player.gamesWon}</span>
                  </div>
                  <div className="text-[9px] text-white/30">wins</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <Users size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No players yet</p>
          </div>
        )}
      </div>
    </div>
  );
}