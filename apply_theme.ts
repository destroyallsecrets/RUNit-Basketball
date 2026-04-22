import fs from 'fs';

const replacements = [
  { from: /bg-stone-950/g, to: 'bg-[#0A0A0A]' },
  { from: /bg-stone-900/g, to: 'bg-[#161616]' },
  { from: /bg-stone-800/g, to: 'bg-white/5' },
  { from: /ring-stone-800/g, to: 'ring-white/5' },
  { from: /border-stone-800/g, to: 'border-white/10' },
  { from: /border-stone-700/g, to: 'border-white/20' },
  { from: /border-stone-600/g, to: 'border-white/30' },
  { from: /text-stone-100/g, to: 'text-white' },
  { from: /text-stone-200/g, to: 'text-slate-200' },
  { from: /text-stone-300/g, to: 'text-slate-300' },
  { from: /text-stone-400/g, to: 'text-white/60' },
  { from: /text-stone-500/g, to: 'text-white/40' },
  { from: /text-stone-600/g, to: 'text-white/30' }
];

const screenFiles = [
  'src/screens/HomeFeed.tsx',
  'src/screens/CourtMap.tsx',
  'src/screens/CourtDetails.tsx',
  'src/screens/FindGame.tsx',
  'src/screens/CourtChat.tsx',
  'src/screens/PlayerProfile.tsx',
];

for (const file of screenFiles) {
  let content = fs.readFileSync(file, 'utf8');
  for (const rep of replacements) {
    content = content.replace(rep.from, rep.to);
  }
  
  if (file.includes('HomeFeed.tsx')) {
    content = content.replace(
      '<h1 className="text-2xl font-black italic tracking-tighter text-white">RUN<span className="text-orange-500">IT</span>.</h1>',
      '<div className="bg-orange-600 px-3 py-1 rounded-sm text-black font-black italic tracking-tighter text-xl inline-block uppercase">RUNIT</div>'
    );
    content = content.replace(/rounded-xl/g, 'rounded-lg');
  }
  if (file.includes('CourtMap.tsx')) {
    content = content.replace(/bg-\[\#1a1c1d\]/g, 'bg-[#111]');
    content = content.replace(/rounded-2xl/g, 'rounded-lg');
    content = content.replace(/rounded-xl/g, 'rounded-md');
  }
  if (file.includes('CourtDetails.tsx')) {
    content = content.replace(/rounded-2xl/g, 'rounded-lg');
    content = content.replace(/rounded-xl/g, 'rounded-md');
  }
  if (file.includes('FindGame.tsx')) {
    content = content.replace(/rounded-2xl/g, 'rounded-lg');
    content = content.replace(/rounded-xl/g, 'rounded-md');
  }
  if (file.includes('PlayerProfile.tsx')) {
    content = content.replace(/rounded-xl/g, 'rounded-lg');
    content = content.replace(/rounded-2xl/g, 'rounded-lg');
  }

  fs.writeFileSync(file, content);
}
console.log('Theme applied successfully.');
