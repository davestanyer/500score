import { Trophy } from 'lucide-react';
import { Team } from '../types/game';
import { teamName } from '../utils/scoring';

interface ScoreboardProps {
  teams: Team[];
  gameOver: boolean;
  winningTeam: number;
}

export default function Scoreboard({ teams, gameOver, winningTeam }: ScoreboardProps) {
  return (
    <div className="space-y-6">
      {/* Team Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`p-4 rounded-lg transition-all duration-300 ${
              gameOver && team.id === winningTeam
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{team.icon}</span>
                <h3 className="text-lg font-bold">{teamName(team)}</h3>
              </div>
              {gameOver && team.id === winningTeam && (
                <Trophy className="w-6 h-6 text-yellow-500" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {team.players.map((player, idx) => (
                <span key={idx} className="text-sm px-2 py-1 bg-gray-100 rounded">
                  {player}
                </span>
              ))}
            </div>
            
            <div className="text-2xl font-bold">
              <span className={team.score >= 0 ? 'text-green-600' : 'text-red-600'}>
                {team.score}
              </span>
              <span className="text-sm text-gray-500 ml-1">points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}