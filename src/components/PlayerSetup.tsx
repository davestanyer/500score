import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Team } from '../types/game';
import TeamSetup from './TeamSetup';
import { TEAM_ICONS } from '../constants/teamIcons';

interface PlayerSetupProps {
  onComplete: (teams: Team[]) => void;
}

export default function PlayerSetup({ onComplete }: PlayerSetupProps) {
  const [playerCount, setPlayerCount] = useState<4 | 6>(4);
  const [players, setPlayers] = useState<string[]>(Array(playerCount).fill(''));
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2']);
  const [teamIcons, setTeamIcons] = useState([TEAM_ICONS[0].emoji, TEAM_ICONS[1].emoji]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teams: Team[] = [];
    const playersPerTeam = playerCount / 2;
    
    for (let i = 0; i < 2; i++) {
      teams.push({
        id: i,
        name: teamNames[i],
        icon: teamIcons[i],
        score: 0,
        players: players.slice(i * playersPerTeam, (i + 1) * playersPerTeam)
      });
    }
    
    onComplete(teams);
  };

  const handleTeamUpdate = (teamIndex: number, name: string, icon: string) => {
    setTeamNames(prev => {
      const updated = [...prev];
      updated[teamIndex] = name;
      return updated;
    });
    setTeamIcons(prev => {
      const updated = [...prev];
      updated[teamIndex] = icon;
      return updated;
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Player Setup</h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className={`flex-1 py-2 px-4 rounded-md ${
                playerCount === num
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {num} Players
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {[0, 1].map(teamIndex => (
          <div key={teamIndex} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Team {teamIndex + 1}</h3>
            <TeamSetup
              teamId={teamIndex}
              defaultName={teamNames[teamIndex]}
              onUpdate={(name, icon) => handleTeamUpdate(teamIndex, name, icon)}
            />
            <div className="mt-4 space-y-4">
              {players
                .slice(teamIndex * (playerCount / 2), (teamIndex + 1) * (playerCount / 2))
                .map((player, playerIndex) => (
                  <div key={playerIndex}>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Start Game
      </button>
    </div>
  );
}