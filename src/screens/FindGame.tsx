import React, { useState, useMemo } from 'react';
import { MapPin, Search, Users, Clock, Plus, Share2, Trophy, X, ChevronRight } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useApp } from '../context/AppContext';

interface FindGameProps {
  onCourtSelect: (courtId: string) => void;
  onGameSelect: (gameId: string) => void;
}

export function FindGame({ onCourtSelect, onGameSelect }: FindGameProps) {
  const { courts, games, filterSkill, setFilterSkill, createGame, joinGame, shareContent } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'3v3' | '4v4' | '5v5'>('4v4');
  const [newGameSkill, setNewGameSkill] = useState<'Casual' | 'Competitive' | 'Elite'>('Competitive');
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);

  const filteredGames = useMemo(() => {
    let result = [...games];
    if (filterSkill !== 'all') {
      result = result.filter(g => g.skillLevel === filterSkill);
    }
    return result.sort((a, b) => {
      if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
      if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;
      return 0;
    });
  }, [games, filterSkill]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return { text: 'LIVE', color: 'bg-red-500 text-white' };
      case 'waiting':
        return { text: 'WAITING', color: 'bg-green-500/20 text-green-500' };
      default:
        return { text: 'DONE', color: 'bg-white/10 text-white/50' };
    }
  };

  const handleCreateGame = () => {
    if (!selectedCourtId) {
      setSelectedCourtId(courts[0]?.id);
      return;
    }
    createGame(selectedCourtId, selectedFormat, newGameSkill);
    setShowCreate(false);
    setSelectedCourtId(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Play</h1>
            <p className="text-white/40 text-[10px] font-mono">FIND • JOIN • CREATE</p>
          </div>
          <Button 
            onClick={() => setShowCreate(true)}
            className="bg-red-500 hover:bg-red-600 text-black font-bold h-10 px-4"
          >
            <Plus size={18} className="mr-1" />
            Create
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {(['all', 'Casual', 'Competitive', 'Elite'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSkill(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filterSkill === s 
                  ? 'bg-red-500 border-red-500 text-black' 
                  : 'border-white/10 text-white/60 hover:border-white/30'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredGames.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <Trophy size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No games available</p>
            <button onClick={() => setShowCreate(true)} className="text-red-500 text-sm mt-2 underline">
              Create one
            </button>
          </div>
        ) : (
          filteredGames.map((game) => {
            const status = getStatusBadge(game.status);
            
            return (
              <div 
                key={game.id}
                className="bg-[#161616] rounded-lg border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => onGameSelect(game.id)}
                  className="w-full p-4 flex items-center gap-3"
                >
                  <div className={`px-2 py-1 rounded text-[10px] font-bold ${status.color}`}>
                    {status.text}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{game.courtName}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                        game.skillLevel === 'Elite' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                        game.skillLevel === 'Competitive' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                        'bg-green-500/20 text-green-500 border-green-500/30'
                      }`}>
                        {game.skillLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-white/50">
                      <span className="flex items-center gap-1">
                        <Trophy size={12} />
                        {game.gameType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {game.currentPlayers}/{game.maxPlayers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {game.startTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-white/30" />
                </button>
                
                <div className="flex gap-2 px-4 pb-4 border-t border-white/5 pt-3">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      joinGame(game.id);
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-black font-bold h-9"
                  >
                    Join Game
                  </Button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      shareContent('game', game);
                    }}
                    className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div className="pt-4 border-t border-white/5">
          <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Courts</h2>
          <div className="space-y-2">
            {courts.slice(0, 4).map((court) => (
              <button
                key={court.id}
                onClick={() => onCourtSelect(court.id)}
                className="w-full p-3 bg-[#161616] rounded-lg border border-white/5 flex items-center gap-3"
              >
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-white text-sm">{court.name}</h3>
                  <p className="text-[11px] text-white/40">{court.neighborhood || court.city}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60">{court.currentPlayers}/{court.maxPlayers} players</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="w-full bg-[#0A0A0A] rounded-t-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Create Game</h2>
              <button onClick={() => setShowCreate(false)} className="text-white/60">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Select Court</label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {courts.slice(0, 5).map((court) => (
                    <button
                      key={court.id}
                      onClick={() => setSelectedCourtId(court.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        selectedCourtId === court.id || (!selectedCourtId && court.id === courts[0]?.id)
                          ? 'bg-red-500/20 border-red-500 text-white'
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      <div className="text-sm font-medium">{court.name}</div>
                      <div className="text-[10px] text-white/40">{court.neighborhood || court.city}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Format</label>
                <div className="flex gap-2">
                  {(['3v3', '4v4', '5v5'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFormat(f)}
                      className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                        selectedFormat === f 
                          ? 'bg-red-500 border-red-500 text-black' 
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Skill Level</label>
                <div className="flex gap-2">
                  {(['Casual', 'Competitive', 'Elite'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setNewGameSkill(s)}
                      className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                        newGameSkill === s 
                          ? 'bg-red-500 border-red-500 text-black' 
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleCreateGame}
                className="w-full bg-red-500 hover:bg-red-600 text-black font-bold h-12 mt-4"
              >
                Create Game
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}