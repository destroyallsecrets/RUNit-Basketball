import React from 'react';
import { Home, MapPin, Play, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

export function Navigation({ currentScreen, setCurrentScreen }: NavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'play', label: 'Play', icon: Play },
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bg-[#0A0A0A] border-t border-white/10 text-white/50 pb-safe pb-4 pt-2 px-4 flex justify-between items-center fixed bottom-0 w-full max-w-md z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 w-16 transition-colors",
              isActive ? "text-orange-500" : "hover:text-white"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
