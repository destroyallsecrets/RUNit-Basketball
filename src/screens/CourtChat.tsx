import React, { useState } from 'react';
import { ArrowLeft, Send, Mic } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useApp } from '../context/AppContext';

interface CourtChatProps {
  // If courtId is not provided, show the list of chats. If provided, show the specific chat.
  courtId?: string;
  onBack?: () => void;
  onChatSelect: (courtId: string) => void;
}

export function CourtChat({ courtId, onBack, onChatSelect }: CourtChatProps) {
  const { courts, chats, user: currentUser, sendMessage } = useApp();
  const [newMessage, setNewMessage] = useState('');

  if (!courtId) {
    // List view
    return (
<div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
        <header className="px-4 py-4 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A]">
          <h1 className="text-xl font-bold tracking-tight text-white">Chats</h1>
          <p className="text-white/40 text-[10px] mt-1">Court Conversations</p>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
           {courts.length === 0 ? (
             <div className="text-center py-12 text-white/40">
               <p className="text-sm">No chats yet</p>
               <p className="text-[10px] text-white/30 mt-1">Join a court to start chatting</p>
             </div>
           ) : (
            courts.map(court => {
              const lastMsg = chats[court.id]?.slice(-1)[0];
              return (
              <button 
                 key={court.id}
                 onClick={() => onChatSelect(court.id)}
                 className="w-full flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors rounded-lg mb-2"
              >
                 <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden shrink-0 bg-[#161616] flex items-center justify-center">
                   {court.imageUrl ? (
                     <img src={court.imageUrl} className="w-full h-full object-cover" alt={court.name} />
                   ) : (
                     <span className="text-lg">🏀</span>
                   )}
                 </div>
                 <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-center mb-1">
                       <h3 className="text-sm font-bold text-white truncate">{court.name}</h3>
                       {lastMsg && <span className="text-[10px] text-white/40">{lastMsg.timestamp}</span>}
                    </div>
                    <p className="text-xs text-white/50 truncate">{lastMsg?.text || 'No messages yet'}</p>
                 </div>
              </button>
              );
            })
           )}
        </div>
      </div>
    );
  }

  const court = courts.find(c => c.id === courtId);
  const messages = chats[courtId] || [];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(courtId, newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <header className="px-4 py-3 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A] flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 text-white/60 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
          <img src={court?.imageUrl} className="w-full h-full object-cover" alt="Court" />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide">
           <h2 className="text-xs font-bold text-white tracking-widest uppercase leading-tight">{court?.name}</h2>
           <div className="text-xs text-green-400 flex items-center gap-1.5 mt-0.5">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
             {court?.currentPlayers} Players Online
           </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => {
            const isMe = msg.userId === currentUser.id;
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                {!isMe && (
                  <Avatar className="w-8 h-8 mt-auto shrink-0 border border-white/20">
                    <AvatarImage src={msg.user.avatarUrl} />
                    <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  {!isMe && <span className="text-[10px] text-white/40 mb-1 ml-1">{msg.user.username}</span>}
                  <div className={`p-3 rounded-2xl ${isMe ? 'bg-red-600 text-white rounded-br-sm' : 'bg-white/5 text-slate-200 rounded-bl-sm'} text-sm`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/30 mt-1 mr-1">{msg.timestamp}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-4 bg-[#0A0A0A] border-t border-white/10 flex gap-2 items-center z-50">
        <div className="flex-1 relative flex items-center">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..." 
            className="bg-[#161616] border-white/10 text-white rounded-full h-11 pr-12 focus-visible:ring-orange-500 placeholder:text-white/40"
          />
          <button className="absolute right-3 text-white/60 hover:text-white">
             <Mic size={20} />
          </button>
        </div>
        <Button 
          onClick={handleSend}
          className="w-10 h-10 rounded bg-red-600 hover:bg-red-500 text-black p-0 flex items-center justify-center shrink-0"
        >
          <Send size={18} className="translate-x-[1px] translate-y-[-1px]" />
        </Button>
      </div>
    </div>
  );
}
