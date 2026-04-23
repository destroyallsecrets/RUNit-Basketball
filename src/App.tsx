/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HomeFeed } from './screens/HomeFeed';
import { CourtList } from './screens/CourtList';
import { CourtDetails } from './screens/CourtDetails';
import { FindGame } from './screens/FindGame';
import { GameDetails } from './screens/GameDetails';
import { PlayerProfile } from './screens/PlayerProfile';
import { CourtChat } from './screens/CourtChat';
import { ViewAllPlayers } from './screens/ViewAllPlayers';
import { ShareableCard } from './screens/ShareableCard';
import { Navigation } from './components/Navigation';
import { AppProvider, useApp } from './context/AppContext';
import { User, Court, Game } from './types';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { ArrowLeft, MapPin, Star, Home, Car, Clock, Plus, Camera, X } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [viewAllPlayers, setViewAllPlayers] = useState<User[] | null>(null);
  const [shareCardData, setShareCardData] = useState<{ type: 'court' | 'game' | 'profile'; data: Court | Game | User } | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCourtSelect = (courtId: string) => {
    setSelectedCourtId(courtId);
    setCurrentScreen('court-details');
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentScreen('game-details');
  };

  const handleChatSelect = (courtId: string) => {
    setSelectedCourtId(courtId);
    setCurrentScreen('chat-details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeFeed />;
      case 'courts':
        return <CourtList onCourtSelect={handleCourtSelect} />;
      case 'play':
        return <FindGame onCourtSelect={handleCourtSelect} onGameSelect={handleGameSelect} />;
      case 'chats':
        return <CourtChat onChatSelect={handleChatSelect} />;
      case 'chat-details':
        return <CourtChat courtId={selectedCourtId!} onBack={() => setCurrentScreen('chats')} onChatSelect={handleChatSelect} />;
      case 'profile':
        return <PlayerProfile />;
      case 'court-details':
        return selectedCourtId ? (
          <InlineCourtDetails 
            courtId={selectedCourtId} 
            onBack={() => setCurrentScreen('courts')} 
            setViewAllPlayers={setViewAllPlayers}
            setScreen={setCurrentScreen}
          />
        ) : <div className="p-4 text-white/60">Select a court</div>;
      case 'game-details':
        return <GameDetailsWrapper gameId={selectedGameId!} onBack={() => setCurrentScreen('play')} />;
      case 'view-all-players':
        return <ViewAllPlayers 
          players={viewAllPlayers!} 
          onBack={() => setViewAllPlayers(null)} 
          onPlayerClick={(player) => {
            console.log('Player clicked:', player);
          }}
        />;
      case 'share-card':
        return (
          <div className="flex flex-col h-full bg-black/90">
            <header className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
              <h1 className="text-lg font-bold text-white">Share Card</h1>
              <button onClick={() => setShareCardData(null)} className="p-2 text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 flex items-start justify-center">
              {shareCardData && <ShareableCard type={shareCardData.type} data={shareCardData.data} />}
            </div>
            <div className="p-4 border-t border-white/10">
              <p className="text-center text-white/50 text-xs mb-2">Screenshot this card to share</p>
              <Button onClick={() => setShareCardData(null)} className="w-full bg-white/10 text-white font-bold h-10">
                Done
              </Button>
            </div>
          </div>
        );
      default:
        return <HomeFeed />;
    }
  };

  return (
    <AppProvider>
      <div className="bg-[#0A0A0A] min-h-screen flex justify-center w-full font-sans text-slate-300">
        <div className="w-full max-w-md bg-[#0A0A0A] h-[100dvh] relative flex flex-col shadow-2xl border-x border-white/5 overflow-hidden">
          {isOffline && (
            <div className="bg-red-600 text-black text-[10px] font-bold text-center py-1 uppercase tracking-widest z-[999] absolute top-0 w-full">
              Offline Mode Active
            </div>
          )}
          <div className={`flex-1 overflow-hidden flex flex-col relative w-full h-full min-h-0 ${isOffline ? 'pt-6' : ''}`}>
            {renderScreen()}
          </div>
          
          {!['court-details', 'chat-details', 'game-details', 'view-all-players', 'share-card'].includes(currentScreen) && (
            <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          )}
        </div>
      </div>
    </AppProvider>
  );
}

function InlineCourtDetails({ courtId, onBack, setViewAllPlayers, setScreen }: { 
  courtId: string, 
  onBack: () => void;
  setViewAllPlayers: (players: User[]) => void;
  setScreen: (s: string) => void;
}) {
  const { courts, user, joinCourt, leaveCourt, toggleFavorite, isFavorite, createGame } = useApp();
  const court = courts.find(c => c.id === courtId);
  
  if (!court) {
    return (
      <div className="flex flex-col h-full bg-[#0A0A0A] p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 text-white/60 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-white">Court Not Found</h1>
        </div>
        <p className="text-white/50">This court may have been removed.</p>
      </div>
    );
  }

  const isJoined = court.activePlayers.some(p => p.id === user.id);
  const isFav = isFavorite(court.id);

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <div className="relative h-40 border-b border-white/10 shrink-0">
        {court.imageUrl ? (
          <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
        ) : (
          <div className="w-full h-full bg-[#161616] flex items-center justify-center">
            <MapPin size={40} className="text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        <button onClick={onBack} className="absolute top-3 left-3 w-9 h-9 bg-[#161616]/80 rounded-full flex items-center justify-center text-white border border-white/20">
          <ArrowLeft size={18} />
        </button>

        <button onClick={() => toggleFavorite(court.id)} className="absolute top-3 right-3 w-9 h-9 bg-[#161616]/80 rounded-full flex items-center justify-center border border-white/20">
          <Star size={16} className={isFav ? 'text-yellow-500 fill-yellow-500' : 'text-white'} />
        </button>

        <div className="absolute bottom-3 left-3 right-3">
          <h1 className="text-xl font-bold text-white">{court.name}</h1>
          <div className="flex items-center text-white/60 text-xs gap-1 mt-0.5">
            <MapPin size={12} />
            <span>{court.address}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 text-center">
            <div className="text-lg font-bold text-white">{court.currentPlayers}/{court.maxPlayers}</div>
            <div className="text-[10px] text-white/40 uppercase">Players</div>
          </div>
          <div className="bg-[#161616] p-3 rounded-lg border border-white/10 text-center">
            <div className="text-lg font-bold text-white">{court.currentGameType || '-'}</div>
            <div className="text-[10px] text-white/40 uppercase">Format</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#161616] p-2 rounded-lg border border-white/10 text-center">
            <div className="text-white/60"><Home size={16} className="mx-auto mb-1" /></div>
            <div className="text-xs text-white/40">{court.isIndoor ? 'Indoor' : 'Outdoor'}</div>
          </div>
          <div className="bg-[#161616] p-2 rounded-lg border border-white/10 text-center">
            <div className="text-white/60"><Car size={16} className="mx-auto mb-1" /></div>
            <div className="text-xs text-white/40">{court.driveTimeMins ? `${court.driveTimeMins}m` : '-'}</div>
          </div>
          <div className="bg-[#161616] p-2 rounded-lg border border-white/10 text-center">
            <div className="text-white/60"><Clock size={16} className="mx-auto mb-1" /></div>
            <div className="text-xs text-white/40">{court.walkTimeMins ? `${court.walkTimeMins}m` : '-'}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={() => createGame(court.id, '4v4', 'Competitive')} className="flex-1 bg-red-600 text-black font-bold h-10">
            <Plus size={16} className="mr-1" />Create Game
          </Button>
          <Button 
            onClick={() => {
              setShareCardData({ type: 'court', data: court });
              setScreen('share-card');
            }} 
            variant="outline" 
            className="border-white/10 text-white font-bold h-10 px-3"
          >
            <Camera size={18} />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] uppercase font-bold text-red-500">Players ({court.activePlayers.length})</h2>
          {court.activePlayers.length > 3 && (
            <button onClick={() => { setViewAllPlayers(court.activePlayers); setScreen('view-all-players'); }} className="text-[10px] text-red-500 font-bold">
              View All
            </button>
          )}
        </div>

        <div className="space-y-2">
          {court.activePlayers.slice(0, 4).map((player) => (
            <div key={player.id} className="flex items-center gap-2 p-2 bg-[#161616] rounded-lg border border-white/5">
              <Avatar className="w-8 h-8 border border-white/10">
                <AvatarImage src={player.avatarUrl} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{player.name}</div>
                <div className="text-[10px] text-white/40">{player.skillLevel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border-t border-white/10">
        <Button 
          onClick={() => isJoined ? leaveCourt(court.id) : joinCourt(court.id)}
          className={`w-full font-bold h-12 ${isJoined ? 'bg-white/10 text-white border border-white/20' : 'bg-red-600 text-black'}`}
        >
          {isJoined ? 'CHECK OUT' : 'CHECK IN'}
        </Button>
      </div>
    </div>
  );
}

function GameDetailsWrapper({ gameId, onBack }: { gameId: string, onBack: () => void }) {
  const { games, setCurrentScreen, setViewAllPlayers } = useApp();
  const game = games.find(g => g.id === gameId);
  if (!game) return <div className="p-4 text-white/60">Game not found</div>;
  return <GameDetails 
    game={game} 
    onBack={onBack}
    onViewAllPlayers={(players) => {
      setViewAllPlayers(players);
      setCurrentScreen('view-all-players');
    }}
  />;
}