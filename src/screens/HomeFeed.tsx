import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

export function HomeFeed() {
  const { posts, likePost, createPost, user } = useApp();
  const [newPost, setNewPost] = useState('');

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'RunIt Post', text });
      } catch (e) {
        console.log('Share canceled or failed');
      }
    } else {
      alert('Sharing is not supported on this device/browser.');
    }
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    createPost(newPost);
    setNewPost('');
  };
  
  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="bg-orange-600 px-3 py-1 rounded-sm text-black font-black italic tracking-tighter text-xl inline-block uppercase">RUNIT</div>
      </header>

      <div className="bg-[#161616] p-4 border-b border-white/10 flex items-center gap-3">
         <Avatar className="w-10 h-10 border border-white/10">
           <AvatarImage src={user.avatarUrl} />
         </Avatar>
         <Input 
           value={newPost}
           onChange={(e) => setNewPost(e.target.value)}
           onKeyDown={(e) => e.key === 'Enter' && submitPost()}
           placeholder="Start a run or share an update..." 
           className="bg-[#0A0A0A] border-white/10 text-white rounded-full h-10 px-4 focus-visible:ring-orange-500" 
         />
         <Button onClick={submitPost} size="icon" className="rounded-full bg-orange-600 hover:bg-orange-500 text-black h-10 w-10 shrink-0">
           <Send size={16} />
         </Button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide">
        <div className="flex flex-col gap-6 p-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#161616] rounded-lg overflow-hidden border border-white/10">
              <div className="p-4 flex items-center gap-3">
                <Avatar className="ring-2 ring-white/5">
                  <AvatarImage src={post.user.avatarUrl} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    {post.user.username}
                    <span className="text-[9px] bg-orange-500/20 text-orange-500 border border-orange-500/20 px-1 py-0.5 rounded ml-auto tracking-widest uppercase">
                      {post.user.skillLevel}
                    </span>
                  </h3>
                  <div className="flex items-center text-[10px] font-mono text-white/40 gap-1 mt-0.5">
                    <MapPin size={12} />
                    <span>{post.locationTag} • {post.timestamp}</span>
                  </div>
                </div>
              </div>

              {post.imageUrl && (
                <div className="aspect-square w-full bg-white/5 border-y border-white/5">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-4 space-y-3">
                <p className="text-white/80 text-[11px] leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-6 text-white/60">
                  <button onClick={() => likePost(post.id)} className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
                    <Heart size={20} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button onClick={() => handleShare(post.content)} className="flex items-center gap-1.5 hover:text-slate-200 transition-colors ml-auto">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
