import React from 'react';
import { BASE_SCORES } from '../constants/scoring';
import { Level } from '../types/game';

const LEVELS: Level[] = [6, 7, 8, 9, 10];
const SUITS = ['Spades', 'Clubs', 'Diamonds', 'Hearts', 'No-Trump'] as const;

export default function ScoringTable() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Scoring Reference</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                Level
              </th>
              {SUITS.map((suit) => (
                <th
                  key={suit}
                  className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500"
                >
                  {suit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((level) => (
              <tr
                key={level}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
                  {level}
                </td>
                {SUITS.map((suit) => {
                  const baseScore = BASE_SCORES[suit];
                  const score = baseScore + ((level - 6) * 100);
                  return (
                    <td
                      key={suit}
                      className="px-4 py-2 text-sm text-gray-600"
                    >
                      {score}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Misere:</span> {BASE_SCORES['Misere']} points
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Open Misere:</span> {BASE_SCORES['Open Misere']} points
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Non-bidding team earns 10 points per trick won
        </p>
      </div>
    </div>
  );
}