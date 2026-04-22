import React from 'react';
import { Settings, PlayCircle, Trophy, BarChart3, ChevronRight, Save, Trash2, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useApp } from '../context/AppContext';

export function PlayerProfile() {
  const { user: currentUser, clearCache } = useApp();

  const highlights = [
     'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=300&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=300&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1574624683073-77d0e419b4fa?q=80&w=300&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=300&auto=format&fit=crop',
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 pt-safe flex justify-between items-center relative z-10">
         <h1 className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">{currentUser.username}</h1>
         <button className="text-white/60 hover:text-white">
           <Settings size={22} />
         </button>
      </header>
      
      <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide">
        <div className="p-4">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-24 h-24 border-[3px] border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
               <AvatarImage src={currentUser.avatarUrl} />
               <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-4 text-center justify-around text-white">
               <div>
                  <div className="text-lg font-black">1.2k</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Followers</div>
               </div>
               <div>
                  <div className="text-xl font-bold">48</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Runs</div>
               </div>
               <div>
                  <div className="text-xl font-bold">8.5</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider font-bold">Rating</div>
               </div>
            </div>
          </div>

          <div className="mb-4">
             <h2 className="text-sm text-white font-bold tracking-widest uppercase leading-tight">{currentUser.name}</h2>
             <p className="text-white/40 font-mono text-[10px] mt-1">Lincoln Park regular. Looking for competitive 5s. 📍 Cityville</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
             <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5">
               Level: {currentUser.skillLevel}
             </div>
             <div className="bg-[#161616] border border-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
               Archetype: {currentUser.archetype}
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
             <Button variant="outline" className="bg-[#161616] border-white/10 bg-orange-600 border-none hover:bg-orange-500 text-white font-bold h-10">Edit Profile</Button>
             <Button 
               onClick={async () => {
                 if (navigator.share) {
                   try {
                     await navigator.share({ title: 'RunIt Profile', text: `Check out ${currentUser.username} on RunIt!` });
                   } catch (e) {}
                 } else {
                   alert('Sharing is not supported on this device/browser.');
                 }
               }}
               variant="outline" 
               className="bg-[#161616] border-white/10 text-slate-300 hover:text-white font-bold h-10"
             >
               Share Profile
             </Button>
          </div>

          <Tabs defaultValue="highlights" className="w-full">
            <TabsList className="w-full bg-transparent border-b border-white/10 rounded-none h-12 p-0 justify-start gap-6">
              <TabsTrigger value="highlights" className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <PlayCircle size={16} /> Highlights
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <BarChart3 size={16} /> Data
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 text-white/40 bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none px-0 gap-1.5 font-bold uppercase text-xs tracking-wider">
                <Trophy size={16} /> Badges
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="highlights" className="mt-4 outline-none">
               <div className="grid grid-cols-3 gap-1">
                 {highlights.map((h, i) => (
                    <div key={i} className="aspect-[3/4] bg-[#161616] relative group cursor-pointer overflow-hidden border border-white/10">
                       <img src={h} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Highlight" />
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                          <PlayCircle size={24} className="text-white/80 group-hover:text-white drop-shadow-md" />
                       </div>
                    </div>
                 ))}
               </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-4 border border-white/5 bg-[#161616] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
                 <Database size={20} className="text-orange-500" />
                 <h3 className="text-xs font-bold text-white uppercase tracking-widest">Local Data Cache</h3>
              </div>
              <p className="text-[10px] font-mono text-white/40 mb-6 leading-relaxed">
                RunIt is configured as an Offline-First PWA. Court data, chat history, and feed progress are cached locally on your device to persist between sessions without cell service.
              </p>
              
              <div className="space-y-3">
                 <div className="flex items-center justify-between bg-[#0A0A0A] p-3 rounded border border-white/5">
                   <div>
                     <div className="text-[10px] text-white font-bold uppercase tracking-widest">Offline Storage</div>
                     <div className="text-[9px] text-emerald-400 font-mono mt-0.5">SYNCHRONIZED</div>
                   </div>
                   <Save size={16} className="text-white/20" />
                 </div>
                 
                 <Button 
                   onClick={() => {
                     if (window.confirm('Are you sure you want to delete all cached court data and local history?')) {
                       clearCache();
                     }
                   }}
                   variant="outline" 
                   className="w-full bg-[#0A0A0A] border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400 font-bold text-[10px] h-10 tracking-widest uppercase flex items-center justify-center gap-2"
                 >
                   <Trash2 size={14} /> Clear Cached Data
                 </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-4 space-y-2">
               {['First Game Won', '10 Game Win Streak', 'Park Regular'].map((badge, i) => (
                 <div key={i} className="bg-[#161616] border border-white/10 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                          <Trophy size={20} />
                       </div>
                       <div>
                          <div className="font-bold text-slate-200">{badge}</div>
                          <div className="text-xs text-white/40 mt-0.5">Unlocked 2 weeks ago</div>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-white/30" />
                 </div>
               ))}
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
