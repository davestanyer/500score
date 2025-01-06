import React, { useState, useEffect } from 'react';
import PlayerSetup from './components/PlayerSetup';
import Scoreboard from './components/Scoreboard';
import BidInput from './components/BidInput';
import ScoringTable from './components/ScoringTable';
import Header from './components/Header';
import { Team, Round, Bid } from './types/game';
import { calculateRoundScore, isGameOver } from './utils/scoring';
import RoundHistory from './components/RoundHistory';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState(-1);

  useEffect(() => {
    // Load game state from localStorage
    const savedState = localStorage.getItem('500-game-state');
    if (savedState) {
      const { teams: savedTeams, rounds: savedRounds } = JSON.parse(savedState);
      setTeams(savedTeams);
      setRounds(savedRounds);
      setGameStarted(true);
      
      const [isOver, winner] = isGameOver(savedTeams.map(t => t.score));
      setGameOver(isOver);
      setWinningTeam(winner);
    }
  }, []);

  useEffect(() => {
    // Save game state to localStorage
    if (gameStarted) {
      localStorage.setItem('500-game-state', JSON.stringify({ teams, rounds }));
    }
  }, [teams, rounds, gameStarted]);

  const handlePlayerSetup = (newTeams: Team[]) => {
    setTeams(newTeams);
    setGameStarted(true);
  };

  const handleBidSubmit = (bid: Bid) => {
    const [biddingTeamScore, nonBiddingTeamScore] = calculateRoundScore(bid);
    const newRound: Round = {
      id: rounds.length,
      bid,
      timestamp: Date.now(),
      biddingTeamScore,
      nonBiddingTeamScore
    };

    // Update teams with new scores
    const updatedTeams = teams.map((team, idx) => ({
      ...team,
      score: team.score + (idx === bid.team.id ? biddingTeamScore : nonBiddingTeamScore)
    }));

    setRounds([...rounds, newRound]);
    setTeams(updatedTeams);

    const [isOver, winner] = isGameOver(updatedTeams.map(t => t.score));
    if (isOver) {
      setGameOver(true);
      setWinningTeam(winner);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('500-game-state');
    setTeams([]);
    setRounds([]);
    setGameStarted(false);
    setGameOver(false);
    setWinningTeam(-1);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <Header 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          gameStarted={gameStarted}
          onReset={handleReset}
        />

        {!gameStarted ? (
          <PlayerSetup onComplete={handlePlayerSetup} />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-6">
              <Scoreboard
                teams={teams}
                gameOver={gameOver}
                winningTeam={winningTeam}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BidInput teams={teams} onBidSubmit={handleBidSubmit} disabled={gameOver} />
                <ScoringTable />
              </div>
              {rounds.length > 0 && (
                <RoundHistory rounds={rounds} teams={teams} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}