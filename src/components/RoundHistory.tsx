import React, { memo } from 'react';
import { Round, Team } from '../types/game';

interface RoundHistoryProps {
  rounds: Round[];
  teams: Team[];
}

const RoundHistory = memo(({ rounds, teams }: RoundHistoryProps) => {
  if (rounds.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Round History</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {rounds.map((round, index) => {
          const biddingTeam = teams[round.bid.team];
          const nonBiddingTeam = teams[round.bid.team === 0 ? 1 : 0];
          
          return (
            <div 
              key={round.id}
              className="p-3 bg-gray-50 rounded-lg text-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Round {index + 1}</span>
                <span className="text-gray-500">
                  {new Date(round.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">{biddingTeam.name}</p>
                  <p className="text-sm">
                    Bid: {round.bid.level} {round.bid.suit}
                  </p>
                  <p className={`font-medium ${
                    round.biddingTeamScore >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {round.biddingTeamScore > 0 ? '+' : ''}{round.biddingTeamScore}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-700">{nonBiddingTeam.name}</p>
                  <p className="text-sm">
                    Tricks: {round.bid.oppositionHands}
                  </p>
                  <p className="font-medium text-green-600">
                    +{round.nonBiddingTeamScore}
                  </p>
                </div>
              </div>
            </div>
          );
        }).reverse()}
      </div>
    </div>
  );
});

RoundHistory.displayName = 'RoundHistory';

export default RoundHistory;