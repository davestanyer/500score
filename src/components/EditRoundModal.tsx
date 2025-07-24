import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Round, Team, Bid, Level, Suit } from '../types/game';

interface EditRoundModalProps {
  round: Round;
  teams: Team[];
  onSave: (updatedRound: Round) => void;
  onCancel: () => void;
}

export default function EditRoundModal({ round, teams, onSave, onCancel }: EditRoundModalProps) {
  const [level, setLevel] = useState<Level | null>(round.bid.level);
  const [suit, setSuit] = useState<Suit>(round.bid.suit);
  const [team, setTeam] = useState<Team>(round.bid.team);
  const [tricksWon, setTricksWon] = useState<number>(round.bid.tricksWon);

  const LEVELS: Level[] = [6, 7, 8, 9, 10];
  const SUITS: Suit[] = ['♠️', '♣️', '♦️', '♥️', 'No-Trump', 'Misere', 'Open Misere'];

  // Update team reference when teams prop changes
  useEffect(() => {
    const currentTeam = teams.find(t => t.id === round.bid.team.id);
    if (currentTeam) {
      setTeam(currentTeam);
    }
  }, [teams, round.bid.team.id]);

  const handleSave = () => {
    const updatedBid: Bid = {
      level,
      suit,
      team,
      tricksWon
    };

    const updatedRound: Round = {
      ...round,
      bid: updatedBid
    };

    onSave(updatedRound);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Edit Round</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suit
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUITS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSuit(s);
                    if (s === 'Misere' || s === 'Open Misere') {
                      setLevel(null);
                    } else if (!level) {
                      setLevel(6);
                    }
                  }}
                  className={`px-4 py-4 rounded-2xl transition-all duration-300 transform active:scale-95 ${
                    suit === s
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200 hover:scale-102'
                  }`}
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
              <label className="block text-sm font-semibold text-gray-800 mb-4">
                Level
              </label>
              <div className="grid grid-cols-5 gap-3">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`px-4 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform active:scale-95 ${
                      level === l
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200 hover:scale-102'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-4">
              Bidding Team
            </label>
            <div className="grid grid-cols-1 gap-3">
              {teams.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTeam(t)}
                  className={`px-6 py-4 text-left rounded-2xl transition-all duration-300 transform active:scale-95 ${
                    team.id === t.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="font-medium">{t.players.join(' & ')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-4">
              Tricks Won
            </label>
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {Array.from({ length: 11 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTricksWon(i)}
                  className={`px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base font-bold rounded-2xl transition-all duration-300 transform active:scale-95 ${
                    tricksWon === i
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200 hover:scale-102'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:from-gray-200 hover:to-gray-300 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}