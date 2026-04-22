import fs from 'fs';

const screens = ['HomeFeed', 'CourtDetails', 'FindGame', 'CourtChat', 'PlayerProfile'];

for (const screen of screens) {
  const path = `src/screens/${screen}.tsx`;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    
    // Remove ScrollArea import
    content = content.replace(/import \{ ScrollArea \} from '\.\.\/components\/ui\/scroll-area';\n/g, '');
    
    // Replace ScrollArea wrapping blocks with standard divs
    content = content.replace(/<ScrollArea/g, '<div');
    content = content.replace(/<\/ScrollArea>/g, '</div>');
    
    // Substitute the flex-1 classes to force native scrolling momentum
    content = content.replace(/className="flex-1"/g, 'className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide"');
    content = content.replace(/className="flex-1 p-4"/g, 'className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide p-4"');
    content = content.replace(/className="flex-1 p-4 pb-24"/g, 'className="flex-1 overflow-y-auto overscroll-y-contain scrollbar-hide p-4 pb-24"');
    
    fs.writeFileSync(path, content);
  }
}
console.log('ScrollArea removed successfully.');
