import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Team } from '../types/game';
import TeamSetup from './TeamSetup';
import { TEAM_ICONS } from '../constants/teamIcons';

interface PlayerSetupProps {
  onComplete: (teams: Team[]) => void;
  darkMode: boolean;
}

export default function PlayerSetup({ onComplete, darkMode }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState<4 | 6>(4);
  const [players, setPlayers] = useState<string[]>(Array(playerCount).fill(''));
  const [teamIcons, setTeamIcons] = useState([TEAM_ICONS[0].emoji, TEAM_ICONS[1].emoji]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teams: Team[] = [];
    const playersPerTeam = playerCount / 2;
    
    for (let i = 0; i < 2; i++) {
      teams.push({
        id: i,
        icon: teamIcons[i],
        score: 0,
        players: players.slice(i * playersPerTeam, (i + 1) * playersPerTeam)
      });
    }
    
    onComplete(teams);
  };

  const handleTeamUpdate = (teamIndex: number, icon: string) => {
    setTeamIcons(prev => {
      const updated = [...prev];
      updated[teamIndex] = icon;
      return updated;
    });
  };

  return (
    <div className={`max-w-lg mx-auto p-8 rounded-2xl shadow-xl border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${
          darkMode 
            ? 'text-white' 
            : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
        }`}>Player Setup</h2>
      </div>
      
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Number of Players
        </label>
        <div className="flex gap-4">
          {[4, 6].map(num => (
            <button
              key={num}
              onClick={() => {
                setPlayerCount(num as 4 | 6);
                setPlayers(Array(num).fill(''));
              }}
              className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                playerCount === num
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {num} Players
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {[0, 1].map(teamIndex => (
          <div key={teamIndex} className={`p-6 rounded-2xl border ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {teamIndex + 1}
              </span>
              Team {teamIndex + 1}
            </h3>
            <TeamSetup
              teamId={teamIndex}
              onUpdate={(icon) => handleTeamUpdate(teamIndex, icon)}
              darkMode={darkMode}
            />
            <div className="mt-4 space-y-4">
              {players
                .slice(teamIndex * (playerCount / 2), (teamIndex + 1) * (playerCount / 2))
                .map((player, playerIndex) => (
                  <div key={playerIndex}>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Player {playerIndex + 1}
                    </label>
                    <input
                      type="text"
                      required
                      value={player}
                      onChange={(e) => {
                        const newPlayers = [...players];
                        newPlayers[teamIndex * (playerCount / 2) + playerIndex] = e.target.value;
                        setPlayers(newPlayers);
                      }}
                      className={`mt-1 block w-full px-4 py-3 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'text-gray-200 bg-gray-700 border-gray-600 placeholder-gray-400 hover:border-gray-500'
                          : 'text-gray-900 bg-white border-gray-200 placeholder-gray-500 hover:border-gray-300'
                      }`}
                      placeholder={`Enter player ${playerIndex + 1}'s name`}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Start Game
      </button>
    </div>
  );
}