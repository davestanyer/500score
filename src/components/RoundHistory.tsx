import { memo, useState } from "react";
import { Edit } from "lucide-react";
import { Round, Team } from "../types/game";
import { teamName, calculateRoundScore } from "../utils/scoring";
import EditRoundModal from "./EditRoundModal";

interface RoundHistoryProps {
  rounds: Round[];
  teams: Team[];
  onDelete: (round: Round) => void;
  onEdit: (round: Round) => void;
}

const RoundHistory = memo(({ rounds, teams, onDelete, onEdit }: RoundHistoryProps) => {
  const [editingRound, setEditingRound] = useState<Round | null>(null);
  
  if (rounds.length === 0) return null;

  const handleEditSave = (updatedRound: Round) => {
    onEdit(updatedRound);
    setEditingRound(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mt-6">
      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Round History</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {rounds
          .map((round, index) => {
            const biddingTeam = teams[round.bid.team.id];
            const nonBiddingTeam = teams[round.bid.team.id === 0 ? 1 : 0];
            
            // Calculate scores dynamically to reflect any edits
            const [biddingTeamScore, nonBiddingTeamScore] = calculateRoundScore(round.bid);

            return (
              <div key={round.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800 text-base">Round {index + 1}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(round.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{biddingTeam.icon}</span>
                      <p className="font-bold text-gray-800">
                        {teamName(biddingTeam)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bid: <span className="font-medium">{round.bid.level} {round.bid.suit}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Tricks: <span className="font-medium">{round.bid.tricksWon}</span>
                    </p>
                    <p
                      className={`font-bold text-lg ${
                        biddingTeamScore >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {biddingTeamScore > 0 ? "+" : ""}
                      {biddingTeamScore}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{nonBiddingTeam.icon}</span>
                      <p className="font-bold text-gray-800">
                        {teamName(nonBiddingTeam)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Tricks: <span className="font-medium">{10 - round.bid.tricksWon}</span>
                    </p>
                    <p className="font-bold text-lg text-green-600">
                      +{nonBiddingTeamScore}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setEditingRound(round)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-2xl hover:from-blue-200 hover:to-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-blue-200"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(round)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-2xl hover:from-red-200 hover:to-red-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
      
      {editingRound && (
        <EditRoundModal
          round={editingRound}
          teams={teams}
          onSave={handleEditSave}
          onCancel={() => setEditingRound(null)}
        />
      )}
    </div>
  );
});

RoundHistory.displayName = "RoundHistory";

export default RoundHistory;
