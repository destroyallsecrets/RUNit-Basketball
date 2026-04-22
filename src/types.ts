export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  skillLevel: 'Casual' | 'Competitive' | 'Elite';
  archetype: 'Buckets' | 'Lockdown' | 'Sharpshooter' | 'Floor General' | 'Two-Way';
  followersCount: number;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  coordinates: { lat: number; lng: number };
  isIndoor: boolean;
  currentGameType?: '3v3' | '4v4' | '5v5';
  skillLevel: 'Casual' | 'Competitive' | 'Elite';
  score?: string; // e.g. "12-10"
  currentPlayers: number;
  waitTimeMins: number;
  activePlayers: User[];
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl?: string;
  content: string;
  locationTag: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  user: User;
  text: string;
  timestamp: string;
}
