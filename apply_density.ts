import fs from 'fs';

let content = fs.readFileSync('src/screens/HomeFeed.tsx', 'utf8');
content = content.replace(
  '<h3 className="font-semibold text-white flex items-center gap-2">',
  '<h3 className="text-xs font-mono font-bold text-white flex items-center gap-2">'
);
content = content.replace(
  '<span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-medium">',
  '<span className="text-[9px] bg-orange-500/20 text-orange-500 border border-orange-500/20 px-1 py-0.5 rounded ml-auto tracking-widest uppercase">'
);
content = content.replace(
  '<div className="flex items-center text-xs text-white/40 gap-1 mt-0.5">',
  '<div className="flex items-center text-[10px] font-mono text-white/40 gap-1 mt-0.5">'
);
content = content.replace(
  '<p className="text-slate-300 text-sm">{post.content}</p>',
  '<p className="text-white/80 text-[11px] leading-relaxed">{post.content}</p>'
);
content = content.replace(
  '<div className="aspect-square w-full bg-white/5">',
  '<div className="aspect-square w-full bg-white/5 border-y border-white/5">'
);
fs.writeFileSync('src/screens/HomeFeed.tsx', content);

let courtDetails = fs.readFileSync('src/screens/CourtDetails.tsx', 'utf8');
courtDetails = courtDetails.replace(
    '<div className="text-xs text-white/40 uppercase font-bold tracking-wider">Status</div>',
    '<div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Status</div>'
);
courtDetails = courtDetails.replace(
    '<div className="text-lg font-bold text-white leading-tight">',
    '<div className="text-sm font-bold text-white leading-tight">'
);
courtDetails = courtDetails.replace(
    '<div className="text-sm text-white/60 font-mono">',
    '<div className="text-[10px] text-orange-500 font-mono">'
);
courtDetails = courtDetails.replace(
    '<div className="text-xs text-white/40 uppercase font-bold tracking-wider">Players</div>',
    '<div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Players</div>'
);
courtDetails = courtDetails.replace(
    '<h2 className="text-xl font-bold text-white flex items-center gap-2">',
    '<h2 className="text-[10px] uppercase font-bold tracking-widest text-orange-500 mb-3 flex items-center gap-2">'
);
courtDetails = courtDetails.replace(
    '<h4 className="font-bold text-white flex items-center gap-2">',
    '<h4 className="text-[10px] font-mono text-white flex items-center gap-2">'
);
courtDetails = courtDetails.replace(
    '<span className="bg-yellow-500/20 text-yellow-500 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Elite</span>',
    '<span className="bg-orange-500/20 border border-orange-500/20 text-orange-500 text-[9px] px-1 py-0.5 rounded ml-auto uppercase tracking-widest">Elite</span>'
);
courtDetails = courtDetails.replace(
    '<div className="text-xs text-white/60">{player.username} • {player.archetype}</div>',
    '<div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{player.username}</div>'
);
courtDetails = courtDetails.replace(
    '<Button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg h-14 rounded-md shadow-[0_0_20px_rgba(249,115,22,0.3)]">',
    '<Button className="w-full bg-orange-600 text-black font-black uppercase text-xs tracking-widest h-12 rounded-md">'
);
fs.writeFileSync('src/screens/CourtDetails.tsx', courtDetails);

let courtMap = fs.readFileSync('src/screens/CourtMap.tsx', 'utf8');
courtMap = courtMap.replace(
  '<span className="text-slate-300 font-medium text-sm">Finding courts near you...</span>',
  '<span className="text-white/60 font-mono font-bold text-[10px] tracking-widest uppercase">Finding courts near you...</span>'
);
courtMap = courtMap.replace(
  '<div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? \'bg-orange-500 text-white\' : \'bg-[#161616] text-white/60\'}`}>',
  '<div className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded border ${isSelected ? \'bg-orange-500 border-orange-500 text-black\' : \'bg-black/80 border-white/10 text-emerald-400\'}`}>'
);
courtMap = courtMap.replace(
  '<h3 className="text-xl font-bold text-white mb-1">{selectedCourt.name}</h3>',
  '<h3 className="text-sm font-bold text-white uppercase mb-1">{selectedCourt.name}</h3>'
);
courtMap = courtMap.replace(
  '<span className="text-sm font-bold text-white">{selectedCourt.currentPlayers}</span>',
  '<span className="text-xl font-black text-white">{selectedCourt.currentPlayers}</span>'
);
courtMap = courtMap.replace(
  '<span className="text-sm font-bold text-white uppercase">{selectedCourt.score || \'Waiting\'}</span>',
  '<span className="text-xl font-black text-white">{selectedCourt.score || \'0-0\'}</span>'
);
courtMap = courtMap.replace(
  '<span className="text-sm font-bold text-white">{selectedCourt.waitTimeMins}m</span>',
  '<span className="text-xl font-black text-white">{selectedCourt.waitTimeMins}</span>'
);
courtMap = courtMap.replace(
  '<Button \\n              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold h-12 rounded-md text-lg"\\n              onClick={() => onCourtSelect(selectedCourt.id)}\\n            >',
  '<Button \\n              className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black uppercase text-xs tracking-widest h-10 rounded-md"\\n              onClick={() => onCourtSelect(selectedCourt.id)}\\n            >'
);
courtMap = courtMap.replace(
  '<div className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold font-mono">',
  '<div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">'
);

fs.writeFileSync('src/screens/CourtMap.tsx', courtMap);

let findGame = fs.readFileSync('src/screens/FindGame.tsx', 'utf8');
findGame = findGame.replace(
  '<h1 className="text-2xl font-black text-white shrink-0">Join a Run.</h1>',
  '<h1 className="text-sm font-bold tracking-widest uppercase text-white shrink-0">Join a Run</h1>'
);
findGame = findGame.replace(
  '<p className="text-white/60 text-sm mt-1">Find active games matching your skill level.</p>',
  '<p className="text-white/40 text-[10px] mt-1 font-mono">SOCIAL UTILITY FOR HOOPERS</p>'
);
findGame = findGame.replace(
  '<h2 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">Courts Nearby (Active)</h2>',
  '<h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4">Courts Nearby (Active)</h2>'
);
findGame = findGame.replace(
  '<h3 className="font-bold text-white leading-tight">{court.name}</h3>',
  '<h3 className="text-xs font-bold text-white uppercase leading-tight">{court.name}</h3>'
);
fs.writeFileSync('src/screens/FindGame.tsx', findGame);

console.log("Done");
