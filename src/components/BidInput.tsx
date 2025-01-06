import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Bid, Level, Suit, Team } from '../types/game';
import { teamName } from '../utils/scoring';

interface BidInputProps {
  teams: Team[];
  onBidSubmit: (bid: Bid) => void;
  disabled: boolean;
}

export default function BidInput({ teams, onBidSubmit, disabled }: BidInputProps) {
  const [level, setLevel] = useState<Level | null>(6);
  const [suit, setSuit] = useState<Suit>('Spades');
  const [team, setTeam] = useState<Team>(teams[0]);
  const [tricksWon, setTricksWon] = useState<number>(0);

  const LEVELS: Level[] = [6, 7, 8, 9, 10];
  const SUITS: Suit[] = ['Spades', 'Clubs', 'Diamonds', 'Hearts', 'No-Trump', 'Misere', 'Open Misere'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBidSubmit({ level, suit, team, tricksWon });
    // Reset form after submission
    setTricksWon(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <PlayCircle className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">New Round</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUITS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSuit(s);
                  if (s === 'Misere' || s === 'Open Misere') {
                    setLevel(null);
                  }
                }}
                disabled={disabled}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  suit === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {suit !== 'Misere' && suit !== 'Open Misere' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <div className="grid grid-cols-5 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  disabled={disabled}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    level === l
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bidding Team
            </label>
            <div className="grid grid-cols-2 gap-2">
              {teams.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTeam(t)}
                  disabled={disabled}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    team === t
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {teamName(t)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tricks Won
          </label>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTricksWon(i)}
                disabled={disabled}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  tricksWon === i
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {i}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Points for non-bidding team: {(10 - tricksWon) * 10}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        Submit Round
      </button>
    </form>
  );
}