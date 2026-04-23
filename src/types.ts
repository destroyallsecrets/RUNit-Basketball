export interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  skillLevel: 'Casual' | 'Competitive' | 'Elite';
  archetype: 'Buckets' | 'Lockdown' | 'Sharpshooter' | 'Floor General' | 'Two-Way';
  followersCount: number;
  gamesPlayed?: number;
  gamesWon?: number;
  courtStats?: {
    totalVisits: number;
    favoriteCourtId?: string;
  };
}

export interface Court {
  id: string;
  name: string;
  address: string;
  neighborhood?: string;
  city?: string;
  imageUrl?: string;
  coordinates: { lat: number; lng: number };
  isIndoor: boolean;
  surfaceType?: 'concrete' | 'asphalt' | 'hardwood' | 'synthetic';
  currentGameType?: '3v3' | '4v4' | '5v5';
  skillLevel: 'Casual' | 'Competitive' | 'Elite';
  score?: string;
  currentPlayers: number;
  maxPlayers: number;
  waitTimeMins: number;
  activePlayers: User[];
  driveTimeMins?: number;
  walkTimeMins?: number;
  distance?: number;
}

export interface Game {
  id: string;
  courtId: string;
  courtName: string;
  hostId: string;
  host: User;
  gameType: '3v3' | '4v4' | '5v5';
  skillLevel: 'Casual' | 'Competitive' | 'Elite';
  status: 'waiting' | 'in_progress' | 'completed';
  maxPlayers: number;
  currentPlayers: number;
  players: User[];
  score?: string;
  startTime: string;
  endTime?: string;
  createdAt: string;
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
  shareable: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  user: User;
  text: string;
  timestamp: string;
}
