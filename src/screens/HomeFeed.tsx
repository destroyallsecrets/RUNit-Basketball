import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Send, Trash2, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useApp } from '../context/AppContext';
import { Post } from '../types';

interface PostDetailsProps {
  post: Post;
  onBack: () => void;
}

function PostDetails({ post, onBack }: PostDetailsProps) {
  const { likePost, shareContent, user } = useApp();

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <header className="px-4 py-4 pt-safe border-b border-white/10 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-white">Post</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12 border border-white/10">
              <AvatarImage src={post.user.avatarUrl} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold text-white">{post.user.name}</h3>
              <p className="text-xs text-white/40">{post.user.username}</p>
            </div>
          </div>

          {post.imageUrl && (
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-4">
              <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
            </div>
          )}

          <p className="text-white text-sm leading-relaxed mb-4">{post.content}</p>

          <div className="flex items-center gap-4 text-white/50 text-xs mb-4 pb-4 border-b border-white/10">
            <span>{post.locationTag}</span>
            <span>•</span>
            <span>{post.timestamp}</span>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <button onClick={() => likePost(post.id)} className="flex items-center gap-2 text-white/60 hover:text-red-500">
              <Heart size={20} />
              <span>{post.likes} likes</span>
            </button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white">
              <MessageCircle size={20} />
              <span>{post.comments} comments</span>
            </button>
          </div>

          <Button 
            onClick={() => shareContent('post', post)}
            className="w-full bg-red-600 hover:bg-red-500 text-black font-bold h-12"
          >
            <Share2 size={18} className="mr-2" />
            Share Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export function HomeFeed() {
  const { posts, likePost, createPost, deletePost, shareContent, user } = useApp();
  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const submitPost = () => {
    if (!newPost.trim()) return;
    createPost(newPost);
    setNewPost('');
  };

  if (selectedPost) {
    return <PostDetails post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="bg-red-600 px-3 py-1 rounded-sm text-black font-black italic tracking-tighter text-xl inline-block uppercase">RUNIT</div>
      </header>

      <div className="bg-[#161616] p-4 border-b border-white/10 flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-white/10">
            <AvatarImage src={user.avatarUrl} />
          </Avatar>
          <Input 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitPost()}
            placeholder="Share a moment..." 
            className="bg-[#0A0A0A] border-white/10 text-white rounded-full h-10 px-4 focus-visible:ring-red-500" 
          />
          <Button onClick={submitPost} size="icon" className="rounded-full bg-red-600 hover:bg-red-500 text-black h-10 w-10 shrink-0">
            <Send size={16} />
          </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#161616] rounded-lg overflow-hidden border border-white/10">
              <button onClick={() => setSelectedPost(post)} className="w-full text-left">
                <div className="p-4 flex items-center gap-3">
                  <Avatar className="ring-2 ring-white/5">
                    <AvatarImage src={post.user.avatarUrl} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      {post.user.username}
                      <span className="text-[9px] bg-red-500/20 text-red-500 border border-red-500/20 px-1 py-0.5 rounded tracking-widest uppercase">
                        {post.user.skillLevel}
                      </span>
                    </h3>
                    <div className="flex items-center text-[10px] text-white/40 gap-1 mt-0.5">
                      <MapPin size={12} />
                      <span>{post.locationTag} • {post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </button>

              {post.imageUrl && (
                <button onClick={() => setSelectedPost(post)} className="w-full">
                  <div className="aspect-square w-full bg-white/5">
                    <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
                  </div>
                </button>
              )}

              <div className="p-4 space-y-3">
                <p className="text-white/80 text-[11px] leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 text-white/60">
                  <button onClick={() => likePost(post.id)} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </button>
                  <button onClick={() => setSelectedPost(post)} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </button>
                  <button 
                    onClick={() => shareContent('post', post)} 
                    className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto"
                  >
                    <Share2 size={18} />
                  </button>
                  {post.userId === user.id && (
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}