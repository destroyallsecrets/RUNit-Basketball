import React, { createContext, useContext, useState, useEffect } from 'react';
import { Court, Post, ChatMessage, User } from '../types';
import { mockCourts, mockPosts, mockChatMessages, currentUser } from '../data/mockData';

interface AppContextType {
  courts: Court[];
  posts: Post[];
  chats: Record<string, ChatMessage[]>;
  user: User;
  joinCourt: (courtId: string) => void;
  likePost: (postId: string) => void;
  createPost: (content: string) => void;
  sendMessage: (courtId: string, text: string) => void;
  clearCache: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for local storage parsing safely
function loadLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [courts, setCourts] = useState<Court[]>(() => loadLocal('runit_courts', mockCourts));
  const [posts, setPosts] = useState<Post[]>(() => loadLocal('runit_posts', mockPosts));
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(() => loadLocal('runit_chats', mockChatMessages));

  useEffect(() => {
    localStorage.setItem('runit_courts', JSON.stringify(courts));
  }, [courts]);

  useEffect(() => {
    localStorage.setItem('runit_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('runit_chats', JSON.stringify(chats));
  }, [chats]);

  const clearCache = () => {
    localStorage.clear();
    setCourts(mockCourts);
    setPosts(mockPosts);
    setChats(mockChatMessages);
  };

  const joinCourt = (courtId: string) => {
    setCourts(prev => prev.map(c => {
      if (c.id === courtId) {
        const isAlreadyIn = c.activePlayers.some(p => p.id === currentUser.id);
        if (isAlreadyIn) {
          // Leave court
          return {
            ...c,
            currentPlayers: Math.max(0, c.currentPlayers - 1),
            activePlayers: c.activePlayers.filter(p => p.id !== currentUser.id)
          };
        }
        // Join court
        return {
          ...c,
          currentPlayers: c.currentPlayers + 1,
          activePlayers: [...c.activePlayers, currentUser]
        };
      }
      return c;
    }));
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const createPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser,
      content,
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      locationTag: 'Just Posted',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const sendMessage = (courtId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      user: currentUser,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChats(prev => ({
      ...prev,
      [courtId]: [...(prev[courtId] || []), newMessage]
    }));
  };

  return (
    <AppContext.Provider value={{ courts, posts, chats, user: currentUser, joinCourt, likePost, createPost, sendMessage, clearCache }}>
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
