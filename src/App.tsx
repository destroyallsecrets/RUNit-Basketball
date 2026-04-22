/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HomeFeed } from './screens/HomeFeed';
import { CourtMap } from './screens/CourtMap';
import { CourtDetails } from './screens/CourtDetails';
import { FindGame } from './screens/FindGame';
import { PlayerProfile } from './screens/PlayerProfile';
import { CourtChat } from './screens/CourtChat';
import { Navigation } from './components/Navigation';
import { AppProvider, useApp } from './context/AppContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
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
  
  const handleChatSelect = (courtId: string) => {
    setSelectedCourtId(courtId);
    setCurrentScreen('chat-details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeFeed />;
      case 'map':
        return <CourtMap onCourtSelect={handleCourtSelect} />;
      case 'play':
        return <FindGame onCourtSelect={handleCourtSelect} />;
      case 'chats':
        return <CourtChat onChatSelect={handleChatSelect} />;
      case 'chat-details':
         return <CourtChat courtId={selectedCourtId!} onBack={() => setCurrentScreen('chats')} onChatSelect={handleChatSelect} />;
      case 'profile':
        return <PlayerProfile />;
      case 'court-details':
        // Find the court from mockData, wait... I don't import mockData here.
        // Let's just create a wrapper or import mockCourts.
        return <CourtDetailsWrapper courtId={selectedCourtId!} onBack={() => setCurrentScreen('map')} />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <AppProvider>
      <div className="bg-[#0A0A0A] min-h-screen flex justify-center w-full font-sans text-slate-300">
        <div className="w-full max-w-md bg-[#0A0A0A] h-[100dvh] relative flex flex-col shadow-2xl border-x border-white/5 overflow-hidden">
          {isOffline && (
            <div className="bg-orange-600 text-black text-[10px] font-bold text-center py-1 uppercase tracking-widest z-[999] absolute top-0 w-full">
              Offline Mode Active
            </div>
          )}
          <div className={`flex-1 overflow-hidden flex flex-col relative w-full h-full min-h-0 ${isOffline ? 'pt-6' : ''}`}>
            {renderScreen()}
          </div>
          
          {/* Hide bottom nav on specific screens if needed, otherwise show */}
          {!['court-details', 'chat-details'].includes(currentScreen) && (
            <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
          )}
        </div>
      </div>
    </AppProvider>
  );
}

// Quick wrapper to avoid parsing all mockData in App just for one prop
function CourtDetailsWrapper({ courtId, onBack }: { courtId: string, onBack: () => void }) {
  const { courts } = useApp();
  const court = courts.find(c => c.id === courtId);
  if (!court) return <div>Court not found</div>;
  
  // Custom navigation
  // Need to import CourtDetails here since we defined it as wrapper above
  return <CourtDetails court={court} onBack={onBack} />;
}
