import { Court, Post, ChatMessage, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  username: '@king_jay23',
  name: 'Jaylen Wright',
  skillLevel: 'Competitive',
  archetype: 'Buckets',
  followersCount: 1240,
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
};

const user2: User = { id: 'u2', username: '@buckets_mike', name: 'Mike', skillLevel: 'Competitive', archetype: 'Buckets', followersCount: 300, avatarUrl: 'https://i.pravatar.cc/150?u=u2' };
const user3: User = { id: 'u3', username: '@lockdown_ty', name: 'Tyler', skillLevel: 'Elite', archetype: 'Lockdown', followersCount: 890, avatarUrl: 'https://i.pravatar.cc/150?u=u3' };
const user4: User = { id: 'u4', username: '@sharp_danny', name: 'Danny', skillLevel: 'Competitive', archetype: 'Sharpshooter', followersCount: 450, avatarUrl: 'https://i.pravatar.cc/150?u=u4' };

export const mockUsers = [currentUser, user2, user3, user4];

export const mockCourts: Court[] = [
  {
    id: 'c1',
    name: 'Forest Park Court',
    address: '1200 Forest Rd, Cityville',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    isIndoor: false,
    currentGameType: '4v4',
    skillLevel: 'Competitive',
    score: '12-10',
    currentPlayers: 8,
    waitTimeMins: 5,
    activePlayers: [user2, user3, user4],
  },
  {
    id: 'c2',
    name: 'Eastside Gym',
    address: '44 East Ave, Cityville',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7150, lng: -74.0080 },
    isIndoor: true,
    currentGameType: '5v5',
    skillLevel: 'Elite',
    score: 'Game Point',
    currentPlayers: 9,
    waitTimeMins: 2,
    activePlayers: [user2, currentUser],
  },
  {
    id: 'c3',
    name: 'Lincoln Park',
    address: 'Lincoln Blvd',
    imageUrl: 'https://images.unsplash.com/photo-1574624683073-77d0e419b4fa?q=80&w=1000&auto=format&fit=crop',
    coordinates: { lat: 40.7100, lng: -74.0020 },
    isIndoor: false,
    currentGameType: '3v3',
    skillLevel: 'Casual',
    currentPlayers: 4,
    waitTimeMins: 0,
    activePlayers: [user3, user4],
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
  }
];

export const mockChatMessages: Record<string, ChatMessage[]> = {
  'c1': [
    { id: 'm1', userId: user2.id, user: user2, text: 'We need one more for 4s, who is coming?', timestamp: '2:15 PM' },
    { id: 'm2', userId: user3.id, user: user3, text: 'On my way, 5 mins away.', timestamp: '2:16 PM' },
    { id: 'm3', userId: user4.id, user: user4, text: 'I call next game!', timestamp: '2:20 PM' }
  ]
};
