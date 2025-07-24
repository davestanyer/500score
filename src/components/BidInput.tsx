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
  const [suit, setSuit] = useState<Suit>('♠️');
  const [team, setTeam] = useState<Team>(teams[0]);
  const [tricksWon, setTricksWon] = useState<number>(0);

  const LEVELS: Level[] = [6, 7, 8, 9, 10];
  const SUITS: Suit[] = ['♠️', '♣️', '♦️', '♥️', 'No-Trump', 'Misere', 'Open Misere'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBidSubmit({ level, suit, team, tricksWon });
    // Reset form after submission
    setTricksWon(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 sm:p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4 sm:mb-8">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
          <PlayCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">New Round</h2>
      </div>

      <div className="space-y-4 sm:space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-4">
            Suit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
                className={`px-3 py-3 sm:px-4 sm:py-4 rounded-2xl transition-all duration-300 transform active:scale-95 ${
                  suit === s
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
              >
                <div className="flex flex-col items-center gap-1">
                  {s === '♠️' || s === '♣️' || s === '♦️' || s === '♥️' ? (
                    <>
                      <div className={`text-2xl ${suit === s ? 'filter drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]' : ''}`}>
                        {s}
                      </div>
                      <span className="text-xs font-medium">{
                        s === '♠️' ? 'Spades' :
                        s === '♣️' ? 'Clubs' :
                        s === '♦️' ? 'Diamonds' :
                        s === '♥️' ? 'Hearts' : s
                      }</span>
                    </>
                  ) : (
                    <span className="text-sm font-medium">{s}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {suit !== 'Misere' && suit !== 'Open Misere' && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-4">
              Level
            </label>
            <div className="grid grid-cols-5 gap-3">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  disabled={disabled}
                  className={`px-4 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform active:scale-95 ${
                    level === l
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                  } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-4">
            Bidding Team
          </label>
          <div className="grid grid-cols-1 gap-3">
            {teams.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTeam(t)}
                disabled={disabled}
                className={`px-6 py-4 text-left rounded-2xl transition-all duration-300 transform active:scale-95 ${
                  team === t
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <span className="font-medium">{teamName(t)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2 sm:mb-4">
            Tricks Won
          </label>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTricksWon(i)}
                disabled={disabled}
                className={`px-2 py-2 sm:px-4 sm:py-4 text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform active:scale-95 ${
                  tricksWon === i
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              Points for non-bidding team: <span className="font-bold text-blue-900">{ level ? (10 - tricksWon) * 10 : 0}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 sm:mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-6 rounded-2xl font-semibold text-base sm:text-lg shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:scale-100"
      >
        Submit Round
      </button>
    </form>
  );
}