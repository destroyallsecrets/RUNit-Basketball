import fs from 'fs';

let courtChat = fs.readFileSync('src/screens/CourtChat.tsx', 'utf8');
courtChat = courtChat.replace(
  '<header className="px-4 py-4 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A] text-white font-black text-2xl">',
  '<header className="px-4 py-4 pt-safe relative z-10 border-b border-white/10 bg-[#0A0A0A] text-white font-bold text-sm tracking-widest uppercase">'
);
courtChat = courtChat.replace(
  '<h3 className="font-bold text-white leading-none">{court.name}</h3>',
  '<h3 className="text-xs font-bold text-white tracking-widest uppercase leading-none">{court.name}</h3>'
);
courtChat = courtChat.replace(
  '<span className="text-xs text-white/40">2:20 PM</span>',
  '<span className="text-[10px] font-mono text-emerald-400">2:20 PM</span>'
);
courtChat = courtChat.replace(
  '<h2 className="font-bold text-white leading-tight">{court?.name}</h2>',
  '<h2 className="text-xs font-bold text-white tracking-widest uppercase leading-tight">{court?.name}</h2>'
);
courtChat = courtChat.replace(
  '<div className="bg-white/5 border-white/10 text-white rounded-full h-11 pr-12 focus-visible:ring-orange-500 placeholder:text-white/40"',
  '<div className="bg-black/50 border-white/10 text-white rounded border h-10 pr-12 focus-visible:ring-orange-500 placeholder:text-white/30 text-xs italic opacity-80"'
);
courtChat = courtChat.replace(
  'className="w-11 h-11 rounded-full bg-orange-600 hover:bg-orange-500 text-white p-0 flex items-center justify-center shrink-0"',
  'className="w-10 h-10 rounded bg-orange-600 hover:bg-orange-500 text-black p-0 flex items-center justify-center shrink-0"'
);
fs.writeFileSync('src/screens/CourtChat.tsx', courtChat);

let playerProfile = fs.readFileSync('src/screens/PlayerProfile.tsx', 'utf8');
playerProfile = playerProfile.replace(
  '<h1 className="text-xl font-bold text-white tracking-tight">{currentUser.username}</h1>',
  '<h1 className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest">{currentUser.username}</h1>'
);
playerProfile = playerProfile.replace(
  '<div className="text-xl font-bold">',
  '<div className="text-lg font-black">'
);
playerProfile = playerProfile.replace(
  '<div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">',
  '<div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">'
);
playerProfile = playerProfile.replace(
  '<h2 className="text-white font-bold text-lg leading-tight">{currentUser.name}</h2>',
  '<h2 className="text-sm text-white font-bold tracking-widest uppercase leading-tight">{currentUser.name}</h2>'
);
playerProfile = playerProfile.replace(
  '<p className="text-white/60 text-sm mt-1">',
  '<p className="text-white/40 font-mono text-[10px] mt-1">'
);
fs.writeFileSync('src/screens/PlayerProfile.tsx', playerProfile);
