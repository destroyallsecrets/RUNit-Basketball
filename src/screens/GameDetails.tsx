import React, { useState } from 'react';
import { Game } from '../types';
import { ArrowLeft, Trophy, Users, Clock, MapPin, Share2, UserPlus, UserMinus, Eye, Camera, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { useApp } from '../context/AppContext';
import { ShareableCard } from './ShareableCard';

interface GameDetailsProps {
  game: Game;
  onBack: () => void;
  onViewAllPlayers?: (players: Game['players']) => void;
}

export function GameDetails({ game, onBack, onViewAllPlayers }: GameDetailsProps) {
  const { user, joinGame, leaveGame, shareContent, courts } = useApp();
  const [showShareCard, setShowShareCard] = useState(false);
  const court = courts.find(c => c.id === game.courtId);
  const isJoined = game.players.some(p => p.id === user.id);
  const isFull = game.currentPlayers >= game.maxPlayers;

  if (showShareCard) {
    return (
      <div className="flex flex-col h-full bg-black">
        <header className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-sm font-bold text-white">Screenshot to Share</h1>
          <button onClick={() => setShowShareCard(false)} className="p-2 text-white/60">
            <X size={20} />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <ShareableCard type="game" data={game} />
        </div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (game.status) {
      case 'in_progress': return { text: 'LIVE', color: 'bg-red-500 text-white', dot: true };
      case 'waiting': return { text: 'WAITING', color: 'bg-green-500/20 text-green-500', dot: false };
      default: return { text: 'COMPLETED', color: 'bg-white/10 text-white/50', dot: false };
    }
  };

  const getSkillBadge = (skill: string) => {
    switch (skill) {
      case 'Elite': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Competitive': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-green-500/20 text-green-500 border-green-500/30';
    }
  };

  const status = getStatusInfo();

  const handleJoinLeave = () => {
    if (isJoined) {
      leaveGame(game.id);
    } else {
      joinGame(game.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <header className="px-4 py-4 pt-safe border-b border-white/10 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{game.courtName}</h1>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Trophy size={12} />
            <span>{game.gameType}</span>
            <span>•</span>
            <span>{game.startTime}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold ${status.color}`}>
          {status.text}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="bg-[#161616] rounded-lg border border-white/10 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getSkillBadge(game.skillLevel)}`}>
              {game.skillLevel}
            </span>
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs text-white/60">{game.gameType}</span>
          </div>
          
          {game.score && (
            <div className="text-center py-4 border-t border-white/5">
              <div className="text-4xl font-black text-white">{game.score}</div>
              <div className="text-xs text-white/40 mt-1">CURRENT SCORE</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{game.currentPlayers}</div>
              <div className="text-[10px] text-white/40 uppercase">Players</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{game.maxPlayers}</div>
              <div className="text-[10px] text-white/40 uppercase">Max</div>
            </div>
          </div>
        </div>

        {court && (
          <div className="bg-[#161616] rounded-lg border border-white/10 p-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
              <MapPin size={16} className="text-red-500" />
              <span>Court Location</span>
            </div>
            <div className="font-medium text-white">{court.name}</div>
            <div className="text-xs text-white/40">{court.address}</div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <Button 
            onClick={() => shareContent('game', game)}
            variant="outline" 
            className="flex-1 border-white/10 text-white font-bold h-10"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button 
            onClick={() => setShowShareCard(true)}
            variant="outline" 
            className="border-white/10 text-white font-bold h-10 px-3"
          >
            <Camera size={18} />
          </Button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-red-500">
              Players ({game.currentPlayers}/{game.maxPlayers})
            </h2>
            {game.players.length > 3 && onViewAllPlayers && (
              <button 
                onClick={() => onViewAllPlayers(game.players)}
                className="text-[10px] text-red-500 hover:text-red-400 uppercase tracking-widest font-bold flex items-center gap-1"
              >
                <Eye size={12} />
                View All
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {game.players.slice(0, 3).map((player) => (
            <div key={player.id} className="flex items-center gap-3 p-3 bg-[#161616] rounded-lg border border-white/5">
              <Avatar className="w-10 h-10 border border-white/10">
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{player.name}</h4>
                <div className="text-[11px] text-white/40">{player.username}</div>
              </div>
              {player.id === game.hostId && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-500">HOST</span>
              )}
            </div>
          ))}

          {game.currentPlayers < game.maxPlayers && (
            <div className="flex items-center gap-3 p-3 border border-dashed border-white/10 rounded-lg text-white/30">
              <div className="w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                <Users size={18} />
              </div>
              <div className="text-sm">
                {game.maxPlayers - game.currentPlayers} spots open
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border-t border-white/10">
        <Button 
          onClick={handleJoinLeave}
          disabled={isFull && !isJoined}
          className={`w-full font-bold h-12 ${
            isJoined 
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' 
              : 'bg-red-600 hover:bg-red-500 text-black'
          }`}
        >
          {isJoined ? (
            <>
              <UserMinus size={18} className="mr-2" />
              LEAVE GAME
            </>
          ) : isFull ? (
            'GAME FULL'
          ) : (
            <>
              <UserPlus size={18} className="mr-2" />
              JOIN GAME
            </>
          )}
        </Button>
      </div>
    </div>
  );
}