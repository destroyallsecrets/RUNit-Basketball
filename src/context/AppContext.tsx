import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Court, Post, ChatMessage, User, Game } from '../types';
import { mockCourts, mockPosts, mockChatMessages, mockGames, currentUser } from '../data/mockData';

export type SortOption = 'distance' | 'skill' | 'active' | 'favorites';
export type SkillFilter = 'all' | 'Casual' | 'Competitive' | 'Elite';

interface AppContextType {
  courts: Court[];
  games: Game[];
  posts: Post[];
  chats: Record<string, ChatMessage[]>;
  user: User;
  favorites: string[];
  sortBy: SortOption;
  filterSkill: SkillFilter;
  searchQuery: string;
  
  setSortBy: (sort: SortOption) => void;
  setFilterSkill: (skill: SkillFilter) => void;
  setSearchQuery: (query: string) => void;
  
  toggleFavorite: (courtId: string) => boolean;
  isFavorite: (courtId: string) => boolean;
  
  joinCourt: (courtId: string) => void;
  leaveCourt: (courtId: string) => void;
  
  createGame: (courtId: string, gameType: Court['currentGameType'], skillLevel: Court['skillLevel']) => void;
  joinGame: (gameId: string) => void;
  leaveGame: (gameId: string) => void;
  
  likePost: (postId: string) => void;
  createPost: (content: string, imageUrl?: string) => void;
  deletePost: (postId: string) => void;
  
  sendMessage: (courtId: string, text: string) => void;
  
  addCourt: (court: Omit<Court, 'id'>) => void;
  updateCourt: (courtId: string, updates: Partial<Court>) => void;
  removeCourt: (courtId: string) => void;
  
  updateProfile: (updates: Partial<User>) => void;
  
  shareContent: (type: 'court' | 'game' | 'post' | 'profile', content: any) => Promise<void>;
  
  clearCache: () => void;
  syncData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`runit_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`runit_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save local:', e);
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [courts, setCourts] = useState<Court[]>(() => loadLocal('courts', mockCourts));
  const [games, setGames] = useState<Game[]>(() => loadLocal('games', mockGames));
  const [posts, setPosts] = useState<Post[]>(() => loadLocal('posts', mockPosts));
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(() => loadLocal('chats', mockChatMessages));
  const [favorites, setFavorites] = useState<string[]>(() => loadLocal('favorites', []));
  const [sortBy, setSortBy] = useState<SortOption>(() => loadLocal('sortBy', 'distance'));
  const [filterSkill, setFilterSkill] = useState<SkillFilter>(() => loadLocal('filterSkill', 'all'));
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User>(() => loadLocal('user', user));
  
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

  useEffect(() => saveLocal('courts', courts), [courts]);
  useEffect(() => saveLocal('games', games), [games]);
  useEffect(() => saveLocal('posts', posts), [posts]);
  useEffect(() => saveLocal('chats', chats), [chats]);
  useEffect(() => saveLocal('favorites', favorites), [favorites]);
  useEffect(() => saveLocal('sortBy', sortBy), [sortBy]);
  useEffect(() => saveLocal('filterSkill', filterSkill), [filterSkill]);
  useEffect(() => saveLocal('user', user), [user]);

  const toggleFavorite = useCallback((courtId: string) => {
    setFavorites(prev => {
      if (prev.includes(courtId)) {
        return prev.filter(id => id !== courtId);
      }
      return [...prev, courtId];
    });
  }, []);

  const isFavorite = useCallback((courtId: string) => {
    return favorites.includes(courtId);
  }, [favorites]);

  const joinCourt = useCallback((courtId: string) => {
    setCourts(prev => prev.map(c => {
      if (c.id === courtId && c.currentPlayers < c.maxPlayers) {
        const isAlreadyIn = c.activePlayers.some(p => p.id === user.id);
        if (!isAlreadyIn) {
          return {
            ...c,
            currentPlayers: c.currentPlayers + 1,
            activePlayers: [...c.activePlayers, user]
          };
        }
      }
      return c;
    }));
  }, []);

  const leaveCourt = useCallback((courtId: string) => {
    setCourts(prev => prev.map(c => {
      if (c.id === courtId) {
        return {
          ...c,
          currentPlayers: Math.max(0, c.currentPlayers - 1),
          activePlayers: c.activePlayers.filter(p => p.id !== user.id)
        };
      }
      return c;
    }));
  }, []);

  const createGame = useCallback((courtId: string, gameType: Court['currentGameType'], skillLevel: Court['skillLevel']) => {
    const court = courts.find(c => c.id === courtId);
    if (!court) return;
    
    const newGame: Game = {
      id: `g${Date.now()}`,
      courtId,
      courtName: court.name,
      hostId: user.id,
      host: user,
      gameType: gameType || '4v4',
      skillLevel,
      status: 'waiting',
      maxPlayers: gameType === '5v5' ? 10 : gameType === '4v4' ? 8 : 6,
      currentPlayers: 1,
      players: [user],
      startTime: new Date(Date.now() + 3600000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      createdAt: new Date().toISOString()
    };
    setGames(prev => [newGame, ...prev]);
  }, [courts]);

  const joinGame = useCallback((gameId: string) => {
    setGames(prev => prev.map(g => {
      if (g.id === gameId && g.currentPlayers < g.maxPlayers) {
        const isAlreadyIn = g.players.some(p => p.id === user.id);
        if (!isAlreadyIn) {
          return {
            ...g,
            currentPlayers: g.currentPlayers + 1,
            players: [...g.players, user]
          };
        }
      }
      return g;
    }));
  }, []);

  const leaveGame = useCallback((gameId: string) => {
    setGames(prev => prev.map(g => {
      if (g.id === gameId) {
        return {
          ...g,
          currentPlayers: Math.max(0, g.currentPlayers - 1),
          players: g.players.filter(p => p.id !== user.id)
        };
      }
      return g;
    }));
  }, []);

  const likePost = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  }, []);

  const createPost = useCallback((content: string, imageUrl?: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: user.id,
      user: user,
      imageUrl,
      content,
      locationTag: 'Just Posted',
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shareable: true
    };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  const sendMessage = useCallback((courtId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      userId: user.id,
      user: user,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChats(prev => ({
      ...prev,
      [courtId]: [...(prev[courtId] || []), newMessage]
    }));
  }, []);

  const addCourt = useCallback((court: Court) => {
    setCourts(prev => [court, ...prev]);
  }, []);

  const updateCourt = useCallback((courtId: string, updates: Partial<Court>) => {
    setCourts(prev => prev.map(c => {
      if (c.id === courtId) {
        return { ...c, ...updates };
      }
      return c;
    }));
  }, []);

  const removeCourt = useCallback((courtId: string) => {
    setCourts(prev => prev.filter(c => c.id !== courtId));
    setFavorites(prev => prev.filter(id => id !== courtId));
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const shareContent = useCallback(async (type: 'court' | 'game' | 'post' | 'profile', content: any) => {
    let shareText = '';
    
    switch (type) {
      case 'court':
        shareText = `Check out ${content.name}! ${content.address}, ${content.city || ''} - ${content.skillLevel} court`;
        break;
      case 'game':
        shareText = `Join my game at ${content.courtName}! ${content.gameType} ${content.skillLevel} - ${content.currentPlayers}/${content.maxPlayers} players`;
        break;
      case 'post':
        shareText = `Check out this run: ${content.content} #RUNit`;
        break;
      case 'profile':
        shareText = `My stats: ${content.gamesWon} wins / ${content.gamesPlayed} games played @ ${content.username}`;
        break;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RUNit',
          text: shareText,
          url: window.location.href
        });
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(shareText);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareText);
    }
  }, []);

  const clearCache = useCallback(() => {
    localStorage.clear();
    setCourts(mockCourts);
    setGames(mockGames);
    setPosts(mockPosts);
    setChats(mockChatMessages);
    setFavorites([]);
  }, []);

  const syncData = useCallback(async () => {
    if (isOffline) return;
    console.log('Syncing data...');
  }, [isOffline]);

  return (
    <AppContext.Provider value={{
      courts,
      games,
      posts,
      chats,
      user: user,
      favorites,
      sortBy,
      filterSkill,
      searchQuery,
      setSortBy,
      setFilterSkill,
      setSearchQuery,
      toggleFavorite,
      isFavorite,
      joinCourt,
      leaveCourt,
      createGame,
      joinGame,
      leaveGame,
      likePost,
      createPost,
      deletePost,
      sendMessage,
      addCourt,
      updateCourt,
      removeCourt,
      updateProfile,
      shareContent,
      clearCache,
      syncData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}