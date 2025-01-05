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
const SUITS: Suit[] = ['Spades', 'Clubs', 'Diamonds', 'Hearts', 'No-Trump', 'Misere', 'Open Misere'];

export default function BidSelector({ level, suit, onLevelChange, onSuitChange, disabled }: BidSelectorProps) {
  const isMisereBid = suit === 'Misere' || suit === 'Open Misere';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suit
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SUITS.map((s) => (
              <button
                key={s}
                onClick={() => onSuitChange(s)}
                disabled={disabled}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  suit === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {s.replace('-', ' ')}
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