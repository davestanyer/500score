import React from 'react';
import { Level, Suit } from '../types/game';

interface BidSelectorProps {
  level: Level | null;
  suit: Suit;
  onLevelChange: (level: Level | null) => void;
  onSuitChange: (suit: Suit) => void;
  disabled?: boolean;
}

const LEVELS: Level[] = [6, 7, 8, 9, 10];
const SUITS: Suit[] = ['♠️', '♣️', '♦️', '♥️', 'No-Trump', 'Misere', 'Open Misere'];

export default function BidSelector({ level, suit, onLevelChange, onSuitChange, disabled }: BidSelectorProps) {
  const isMisereBid = suit === 'Misere' || suit === 'Open Misere';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suit
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUITS.map((s) => (
              <button
                key={s}
                onClick={() => onSuitChange(s)}
                disabled={disabled}
                className={`px-4 py-4 rounded-2xl transition-all duration-300 transform active:scale-95 ${
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
                    <span className="text-sm font-medium">{s.replace('-', ' ')}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {!isMisereBid && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => onLevelChange(l)}
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
      </div>
    </div>
  );
}