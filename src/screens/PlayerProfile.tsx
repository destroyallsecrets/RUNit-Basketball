import React, { useState } from 'react';
import { Settings, PlayCircle, Trophy, BarChart3, ChevronRight, Save, Trash2, Database, Share2, Edit2, Plus, X, Camera } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useApp } from '../context/AppContext';
import { ShareableCard } from './ShareableCard';

export function PlayerProfile() {
  const { user, updateProfile, clearCache, shareContent, courtStats, gamesPlayed, gamesWon } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [editedUser, setEditedUser] = useState({
    skillLevel: user.skillLevel,
    archetype: user.archetype
  });

  const winRate = gamesPlayed && gamesWon ? Math.round((gamesWon / gamesPlayed) * 100) : 66;

  const highlights = [
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=300&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574624683073-77d0e419b4fa?q=80&w=300&auto=format&fit=crop',
  ];

  const handleSave = () => {
    updateProfile(editedUser);
    setShowEdit(false);
  };

  if (showShareCard) {
    return (
      <div className="flex flex-col h-full bg-black">
        <header className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-sm font-bold text-white">Screenshot to Share</h1>
          <button onClick={() => setShowShareCard(false)} className="p-2 text-white/60">
            <X size={20} />
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <ShareableCard type="profile" data={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 pt-safe flex justify-between items-center relative z-10">
        <h1 className="text-[10px] font-mono font-bold text-red-400 tracking-widest">{user.username}</h1>
        <button onClick={() => setShowEdit(true)} className="text-white/60 hover:text-white">
          <Settings size={22} />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-24 h-24 border-[3px] border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-4 text-center justify-around text-white">
              <div>
                <div className="text-lg font-black">{user.followersCount?.toLocaleString() || 0}</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Followers</div>
              </div>
              <div>
                <div className="text-xl font-bold">{gamesPlayed || 0}</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Runs</div>
              </div>
              <div>
                <div className="text-xl font-bold">{winRate}%</div>
                <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Wins</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-sm text-white font-bold tracking-widest uppercase leading-tight">{user.name}</h2>
            <p className="text-white/40 font-mono text-[10px] mt-1">Hooper. Looking for competitive runs. 📍</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5">
              {user.skillLevel}
            </div>
            <div className="bg-[#161616] border border-white/10 text-white/60 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              {user.archetype}
            </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <Button 
              onClick={() => setShowEdit(true)}
              className="flex-1 bg-[#161616] border border-white/10 text-white font-bold h-10"
            >
              <Edit2 size={16} className="mr-2" />
              Edit
            </Button>
            <Button 
              onClick={() => shareContent('profile', user)}
              variant="outline" 
              className="bg-[#161616] border-white/10 text-white font-bold h-10"
            >
              <Share2 size={16} className="mr-2" />
            </Button>
            <Button 
              onClick={() => setShowShareCard(true)}
              variant="outline" 
              className="bg-[#161616] border-white/10 text-white font-bold h-10 px-3"
            >
              <Camera size={18} />
            </Button>
          </div>

          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none h-12 p-0 justify-start gap-6">
              <TabsTrigger value="highlights" className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <PlayCircle size={16} /> Highlights
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <BarChart3 size={16} /> Data
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <Trophy size={16} /> Badges
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="highlights" className="mt-4 outline-none">
              <div className="grid grid-cols-3 gap-1">
                {highlights.map((h, i) => (
                  <div key={i} className="aspect-[3/4] bg-[#161616] relative group cursor-pointer overflow-hidden border border-white/10">
                    <img src={h} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Highlight" />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-4 border border-white/5 bg-[#161616] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                <Database size={20} className="text-red-500" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Local Data</h3>
              </div>
              <p className="text-[10px] font-mono text-white/40 mb-6 leading-relaxed">
                All data stored locally on device. Works offline.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded border border-white/5">
                  <div>
                    <div className="text-[10px] text-white font-bold uppercase tracking-widest">Total Visits</div>
                    <div className="text-[9px] text-green-400 font-mono mt-0.5">LOCAL</div>
                  </div>
                  <Save size={16} className="text-white/20" />
                </div>
                
                <Button 
                  onClick={() => {
                    if (window.confirm('Clear all cached data?')) {
                      clearCache();
                    }
                  }}
                  variant="outline" 
                  className="w-full bg-[#0A0A0A] border-red-500/20 text-red-500 hover:bg-red-500/10 font-bold text-[10px] h-10 tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} /> Clear Data
                </Button>
              </div>
            </TabsContent>
            
<TabsContent value="achievements" className="mt-4 space-y-2">
               {[
                 { name: 'First Win', icon: '🏀', unlocked: true, desc: 'Won your first game' },
                 { name: '10 Games', icon: '🔥', unlocked: true, desc: 'Played 10 games' },
                 { name: 'Park Regular', icon: '🌳', unlocked: true, desc: '5 visits to same court' },
                 { name: 'MVP', icon: '⭐', unlocked: false, desc: 'Win 5 in a row' },
                 { name: 'Floor General', icon: '🎯', unlocked: false, desc: '50 games played' },
                 { name: 'Elite Status', icon: '👑', unlocked: false, desc: 'Reach Elite level' },
               ].map((badge, i) => (
                 <div key={i} className={`bg-[#161616] border p-4 rounded-lg flex items-center justify-between ${badge.unlocked ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
                   <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${badge.unlocked ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-white/30'}`}>
                       {badge.icon}
                     </div>
                     <div>
                       <div className="font-bold text-slate-200">{badge.name}</div>
                       <div className="text-xs text-white/40 mt-0.5">
                         {badge.unlocked ? badge.desc : '🔒 ' + badge.desc}
                       </div>
                     </div>
                   </div>
                   {badge.unlocked && <ChevronRight size={16} className="text-white/30" />}
                 </div>
               ))}
             </TabsContent>
          </Tabs>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
          <div className="w-full bg-[#0A0A0A] rounded-t-2xl p-6 border border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Edit Profile</h2>
              <button onClick={() => setShowEdit(false)} className="text-white/60">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Skill Level</label>
                <div className="flex gap-2">
                  {(['Casual', 'Competitive', 'Elite'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setEditedUser({ ...editedUser, skillLevel: s })}
                      className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                        editedUser.skillLevel === s 
                          ? 'bg-red-500 border-red-500 text-black' 
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Archetype</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Buckets', 'Lockdown', 'Sharpshooter', 'Floor General', 'Two-Way'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => setEditedUser({ ...editedUser, archetype: a })}
                      className={`py-2 rounded-lg font-bold border text-xs transition-colors ${
                        editedUser.archetype === a 
                          ? 'bg-red-500 border-red-500 text-black' 
                          : 'border-white/10 text-white/60'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleSave}
                className="w-full bg-red-500 hover:bg-red-600 text-black font-bold h-12 mt-4"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}