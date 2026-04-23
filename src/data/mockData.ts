import { Court, Post, ChatMessage, User, Game } from '../types';

export const currentUser: User = {
  id: 'u1',
  username: '@king_jay23',
  name: 'Jaylen Wright',
  skillLevel: 'Competitive',
  archetype: 'Buckets',
  followersCount: 1240,
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  gamesPlayed: 47,
  gamesWon: 31,
  courtStats: {
    totalVisits: 89,
    favoriteCourtId: 'c1'
  }
};

const user2: User = { 
  id: 'u2', 
  username: '@buckets_mike', 
  name: 'Mike', 
  skillLevel: 'Competitive', 
  archetype: 'Buckets', 
  followersCount: 300, 
  avatarUrl: 'https://i.pravatar.cc/150?u=u2',
  gamesPlayed: 23,
  gamesWon: 14
};

const user3: User = { 
  id: 'u3', 
  username: '@lockdown_ty', 
  name: 'Tyler', 
  skillLevel: 'Elite', 
  archetype: 'Lockdown', 
  followersCount: 890, 
  avatarUrl: 'https://i.pravatar.cc/150?u=u3',
  gamesPlayed: 156,
  gamesWon: 112
};

const user4: User = { 
  id: 'u4', 
  username: '@sharp_danny', 
  name: 'Danny', 
  skillLevel: 'Competitive', 
  archetype: 'Sharpshooter', 
  followersCount: 450, 
  avatarUrl: 'https://i.pravatar.cc/150?u=u4',
  gamesPlayed: 78,
  gamesWon: 45
};

export const mockUsers = [currentUser, user2, user3, user4];

export const mockCourts: Court[] = [
  {
    id: 'c1',
    name: 'Forest Park Court',
    address: '1200 Forest Rd',
    neighborhood: 'Westside',
    city: 'Cityville, CA',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    isIndoor: false,
    surfaceType: 'concrete',
    currentGameType: '4v4',
    skillLevel: 'Competitive',
    score: '12-10',
    currentPlayers: 8,
    maxPlayers: 8,
    waitTimeMins: 5,
    activePlayers: [user2, user3, user4],
    driveTimeMins: 12,
    walkTimeMins: 25,
    distance: 2.1
  },
  {
    id: 'c2',
    name: 'Eastside Gym',
    address: '44 East Ave',
    neighborhood: 'Downtown',
    city: 'Cityville, CA',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7150, lng: -74.0080 },
    isIndoor: true,
    surfaceType: 'hardwood',
    currentGameType: '5v5',
    skillLevel: 'Elite',
    score: 'Game Point',
    currentPlayers: 9,
    maxPlayers: 10,
    waitTimeMins: 2,
    activePlayers: [user2, currentUser],
    driveTimeMins: 8,
    walkTimeMins: 18,
    distance: 1.4
  },
  {
    id: 'c3',
    name: 'Lincoln Park',
    address: 'Lincoln Blvd',
    neighborhood: 'Northside',
    city: 'Cityville, CA',
    imageUrl: 'https://images.unsplash.com/photo-1574624683073-77d0e419b4fa?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7100, lng: -74.0020 },
    isIndoor: false,
    surfaceType: 'asphalt',
    currentGameType: '3v3',
    skillLevel: 'Casual',
    currentPlayers: 4,
    maxPlayers: 6,
    waitTimeMins: 0,
    activePlayers: [user3, user4],
    driveTimeMins: 15,
    walkTimeMins: 35,
    distance: 3.2
  },
  {
    id: 'c4',
    name: 'Riverside Courts',
    address: '88 River Walk',
    neighborhood: 'Riverside',
    city: 'Cityville, CA',
    coordinates: { lat: 40.7080, lng: -74.0100 },
    isIndoor: false,
    surfaceType: 'concrete',
    currentGameType: '4v4',
    skillLevel: 'Competitive',
    currentPlayers: 6,
    maxPlayers: 8,
    waitTimeMins: 10,
    activePlayers: [user4],
    driveTimeMins: 20,
    walkTimeMins: 45,
    distance: 4.5
  },
  {
    id: 'c5',
    name: 'Westfield Rec Center',
    address: '500 Westfield Dr',
    neighborhood: 'Westfield',
    city: 'Cityville, CA',
    coordinates: { lat: 40.7200, lng: -74.0150 },
    isIndoor: true,
    surfaceType: 'hardwood',
    currentGameType: '5v5',
    skillLevel: 'Elite',
    score: '18-15',
    currentPlayers: 10,
    maxPlayers: 10,
    waitTimeMins: 0,
    activePlayers: [user2, user3, user4, currentUser],
    driveTimeMins: 25,
    walkTimeMins: 55,
    distance: 6.1
  }
];

export const mockGames: Game[] = [
  {
    id: 'g1',
    courtId: 'c1',
    courtName: 'Forest Park Court',
    hostId: user2.id,
    host: user2,
    gameType: '4v4',
    skillLevel: 'Competitive',
    status: 'in_progress',
    maxPlayers: 8,
    currentPlayers: 7,
    players: [user2, user3, user4],
    score: '12-10',
    startTime: '3:30 PM',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'g2',
    courtId: 'c2',
    courtName: 'Eastside Gym',
    hostId: user3.id,
    host: user3,
    gameType: '5v5',
    skillLevel: 'Elite',
    status: 'waiting',
    maxPlayers: 10,
    currentPlayers: 6,
    players: [user2, currentUser],
    startTime: '5:00 PM',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'g3',
    courtId: 'c3',
    courtName: 'Lincoln Park',
    hostId: user4.id,
    host: user4,
    gameType: '3v3',
    skillLevel: 'Casual',
    status: 'waiting',
    maxPlayers: 6,
    currentPlayers: 3,
    players: [user3, user4],
    startTime: '4:30 PM',
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: currentUser.id,
    user: currentUser,
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1000&auto=format&fit=crop',
    content: 'Good runs today at Lincoln Park! Need better competition next time 💪🔥',
    locationTag: 'Lincoln Park',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    shareable: true
  },
  {
    id: 'p2',
    userId: user3.id,
    user: user3,
    imageUrl: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?q=80&w=1000&auto=format&fit=crop',
    content: 'Who wants the smoke? We got next at Eastside Gym 😤',
    locationTag: 'Eastside Gym',
    timestamp: '5 hours ago',
    likes: 56,
    comments: 12,
    shareable: true
  }
];

export const mockChatMessages: Record<string, ChatMessage[]> = {
  'c1': [
    { id: 'm1', userId: user2.id, user: user2, text: 'We need one more for 4s, who is coming?', timestamp: '2:15 PM' },
    { id: 'm2', userId: user3.id, user: user3, text: 'On my way, 5 mins away.', timestamp: '2:16 PM' },
    { id: 'm3', userId: user4.id, user: user4, text: 'I call next game!', timestamp: '2:20 PM' }
  ]
};