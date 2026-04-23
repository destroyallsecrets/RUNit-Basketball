import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Users, Star, ChevronDown, ChevronUp, Plus, Share2, Filter, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useApp, SortOption, SkillFilter } from '../context/AppContext';
import { AddCourt } from './AddCourt';

interface CourtListProps {
  onCourtSelect: (courtId: string) => void;
}

export function CourtList({ onCourtSelect }: CourtListProps) {
  const { courts, favorites, sortBy, filterSkill, searchQuery, setSortBy, setFilterSkill, setSearchQuery, toggleFavorite, isFavorite, shareContent } = useApp();
  const [expandedCourt, setExpandedCourt] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddCourt, setShowAddCourt] = useState(false);

  const filteredCourts = useMemo(() => {
    let result = [...courts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query) ||
        c.neighborhood?.toLowerCase().includes(query) ||
        c.city?.toLowerCase().includes(query)
      );
    }
    
    if (filterSkill !== 'all') {
      result = result.filter(c => c.skillLevel === filterSkill);
    }
    
    if (sortBy === 'distance') {
      result.sort((a, b) => (a.distance || 999) - (b.distance || 999));
    } else if (sortBy === 'skill') {
      const skillOrder = { Casual: 0, Competitive: 1, Elite: 2 };
      result.sort((a, b) => skillOrder[a.skillLevel] - skillOrder[b.skillLevel]);
    } else if (sortBy === 'active') {
      result.sort((a, b) => b.currentPlayers - a.currentPlayers);
    } else if (sortBy === 'favorites') {
      result.sort((a, b) => {
        const aFav = favorites.includes(a.id) ? 0 : 1;
        const bFav = favorites.includes(b.id) ? 0 : 1;
        return aFav - bFav;
      });
    }
    
    return result;
  }, [courts, searchQuery, filterSkill, sortBy, favorites]);

  const getSkillColor = (skill: string) => {
    switch (skill) {
      case 'Elite': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'Competitive': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-green-500/20 text-green-500 border-green-500/30';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <header className="px-4 py-4 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold tracking-tight text-white">Courts</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowAddCourt(true)}
              className="p-2 rounded-full border border-white/10 text-white/60"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-full border ${showFilters ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'border-white/10 text-white/60'}`}
            >
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search courts, neighborhoods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161616] border border-white/10 rounded-lg h-10 px-4 pr-10 text-white placeholder:text-white/40 text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {showFilters && (
          <div className="mt-3 space-y-3 p-3 bg-[#161616] rounded-lg border border-white/10">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {(['distance', 'skill', 'active', 'favorites'] as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      sortBy === opt 
                        ? 'bg-red-500 border-red-500 text-black' 
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Skill Level</label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'Casual', 'Competitive', 'Elite'] as SkillFilter[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilterSkill(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      filterSkill === opt 
                        ? 'bg-red-500 border-red-500 text-black' 
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {opt === 'all' ? 'All' : opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {filteredCourts.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <MapPin size={32} className="mx-auto mb-2 opacity-50" />
            <p>No courts found</p>
          </div>
        ) : (
          filteredCourts.map((court) => {
            const isExpanded = expandedCourt === court.id;
            const isFav = isFavorite(court.id);
            
            return (
              <div 
                key={court.id}
                className={`bg-[#161616] rounded-lg border transition-all ${
                  isExpanded ? 'border-white/20' : 'border-white/5'
                }`}
              >
                <button
                  onClick={() => setExpandedCourt(isExpanded ? null : court.id)}
                  className="w-full p-3 flex items-center gap-3"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{court.name}</h3>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getSkillColor(court.skillLevel)}`}>
                        {court.skillLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-white/50">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {court.distance ? `${court.distance} mi` : court.neighborhood || court.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {court.currentPlayers}/{court.maxPlayers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {court.waitTimeMins === 0 ? 'Now' : `${court.waitTimeMins}m`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(court.id);
                      }}
                      className={`p-2 rounded-full ${isFav ? 'text-yellow-500' : 'text-white/30'}`}
                    >
                      <Star size={18} fill={isFav ? 'currentColor' : 'none'} />
                    </button>
                    {isExpanded ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3 border-t border-white/5 pt-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#0A0A0A] p-2 rounded-lg text-center">
                        <Users size={16} className="mx-auto mb-1 text-white/60" />
                        <div className="text-lg font-bold text-white">{court.currentPlayers}</div>
                        <div className="text-[9px] text-white/40 uppercase">Players</div>
                      </div>
                      <div className="bg-[#0A0A0A] p-2 rounded-lg text-center">
                        <div className="text-lg font-bold text-white">{court.isIndoor ? 'Indoor' : 'Outdoor'}</div>
                        <div className="text-[9px] text-white/40 uppercase">Type</div>
                      </div>
                      <div className="bg-[#0A0A0A] p-2 rounded-lg text-center">
                        <div className="text-lg font-bold text-white">{court.currentGameType || '-'}</div>
                        <div className="text-[9px] text-white/40 uppercase">Format</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-white/60 space-y-1">
                      <div className="flex justify-between">
                        <span>Address:</span>
                        <span className="text-white">{court.address}</span>
                      </div>
                      {court.neighborhood && (
                        <div className="flex justify-between">
                          <span>Area:</span>
                          <span className="text-white">{court.neighborhood}</span>
                        </div>
                      )}
                      {court.city && (
                        <div className="flex justify-between">
                          <span>City:</span>
                          <span className="text-white">{court.city}</span>
                        </div>
                      )}
                      {court.driveTimeMins && (
                        <div className="flex justify-between">
                          <span>Drive:</span>
                          <span className="text-white">{court.driveTimeMins} min</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => onCourtSelect(court.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-black font-bold h-10"
                      >
                        View Details
                      </Button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          shareContent('court', court);
                        }}
                        className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {showAddCourt && <AddCourt onClose={() => setShowAddCourt(false)} />}
    </div>
  );
}