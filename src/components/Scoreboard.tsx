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
    <div className="space-y-4 sm:space-y-6">
      {/* Team Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`p-4 sm:p-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-lg border ${
              gameOver && team.id === winningTeam
                ? 'bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-400 shadow-emerald-200 scale-105'
                : 'bg-white border-gray-200 shadow-gray-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-xl sm:text-2xl">{team.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{teamName(team)}</h3>
              </div>
              {gameOver && team.id === winningTeam && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
                  <Trophy className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">WINNER</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {team.players.map((player, idx) => (
                <span key={idx} className="text-sm px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl font-medium text-gray-700 border border-gray-200 shadow-sm">
                  {player}
                </span>
              ))}
            </div>
            
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-black ${team.score >= 0 ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-red-600'} bg-clip-text text-transparent`}>
                {team.score}
              </span>
              <span className="text-lg font-medium text-gray-500 mb-1">points</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}