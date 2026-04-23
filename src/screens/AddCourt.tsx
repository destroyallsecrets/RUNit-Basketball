import React, { useState } from 'react';
import { MapPin, Plus, X, Home, TreePine, Users, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useApp } from '../context/AppContext';

interface AddCourtProps {
  onClose: () => void;
  onAdd?: (court: any) => void;
}

export function AddCourt({ onClose, onAdd }: AddCourtProps) {
  const { addCourt } = useApp();
  const [step, setStep] = useState(1);
  const [court, setCourt] = useState({
    name: '',
    address: '',
    neighborhood: '',
    city: '',
    isIndoor: false,
    surfaceType: 'concrete' as const,
    skillLevel: 'Competitive' as const,
    maxPlayers: 10
  });

  const handleSubmit = () => {
    const newCourt = {
      ...court,
      id: `c${Date.now()}`,
      coordinates: { lat: 0, lng: 0 },
      currentPlayers: 0,
      waitTimeMins: 0,
      activePlayers: []
    };
    addCourt(newCourt);
    onAdd?.(newCourt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
      <div className="w-full bg-[#0A0A0A] rounded-t-2xl p-6 border border-white/10 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Add Court</h2>
          <button onClick={onClose} className="text-white/60">
            <X size={24} />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Court Name</label>
              <input
                type="text"
                value={court.name}
                onChange={(e) => setCourt({ ...court, name: e.target.value })}
                placeholder="e.g. Lincoln Park Court"
                className="w-full bg-[#161616] border border-white/10 rounded-lg h-12 px-4 text-white"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Street Address</label>
              <input
                type="text"
                value={court.address}
                onChange={(e) => setCourt({ ...court, address: e.target.value })}
                placeholder="e.g. 123 Main St"
                className="w-full bg-[#161616] border border-white/10 rounded-lg h-12 px-4 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Neighborhood</label>
                <input
                  type="text"
                  value={court.neighborhood}
                  onChange={(e) => setCourt({ ...court, neighborhood: e.target.value })}
                  placeholder="e.g. Downtown"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg h-12 px-4 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">City</label>
                <input
                  type="text"
                  value={court.city}
                  onChange={(e) => setCourt({ ...court, city: e.target.value })}
                  placeholder="e.g. Cityville"
                  className="w-full bg-[#161616] border border-white/10 rounded-lg h-12 px-4 text-white"
                />
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full bg-red-500 hover:bg-red-600 text-black font-bold h-12">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCourt({ ...court, isIndoor: false })}
                  className={`flex-1 py-4 rounded-lg font-bold border transition-colors flex flex-col items-center gap-2 ${
                    !court.isIndoor ? 'bg-red-500 border-red-500 text-black' : 'border-white/10 text-white/60'
                  }`}
                >
                  <TreePine size={24} />
                  Outdoor
                </button>
                <button
                  onClick={() => setCourt({ ...court, isIndoor: true })}
                  className={`flex-1 py-4 rounded-lg font-bold border transition-colors flex flex-col items-center gap-2 ${
                    court.isIndoor ? 'bg-red-500 border-red-500 text-black' : 'border-white/10 text-white/60'
                  }`}
                >
                  <Home size={24} />
                  Indoor
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Surface</label>
              <div className="flex flex-wrap gap-2">
                {(['concrete', 'asphalt', 'hardwood', 'synthetic'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setCourt({ ...court, surfaceType: s })}
                    className={`px-4 py-2 rounded-full font-medium border capitalize transition-colors ${
                      court.surfaceType === s ? 'bg-red-500 border-red-500 text-black' : 'border-white/10 text-white/60'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Skill Level</label>
              <div className="flex gap-2">
                {(['Casual', 'Competitive', 'Elite'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setCourt({ ...court, skillLevel: s })}
                    className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                      court.skillLevel === s ? 'bg-red-500 border-red-500 text-black' : 'border-white/10 text-white/60'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Max Players</label>
              <div className="flex gap-2">
                {[6, 8, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCourt({ ...court, maxPlayers: n })}
                    className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                      court.maxPlayers === n ? 'bg-red-500 border-red-500 text-black' : 'border-white/10 text-white/60'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-white/10 text-white font-bold h-12">
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-red-500 hover:bg-red-600 text-black font-bold h-12"
                disabled={!court.name.trim()}
              >
                Add Court
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}