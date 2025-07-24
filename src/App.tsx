import React, { useState, useEffect } from "react";
import PlayerSetup from "./components/PlayerSetup";
import Scoreboard from "./components/Scoreboard";
import BidInput from "./components/BidInput";
import ScoringTable from "./components/ScoringTable";
import Header from "./components/Header";
import { Team, Round, Bid } from "./types/game";
import { calculateRoundScore, isGameOver } from "./utils/scoring";
import RoundHistory from "./components/RoundHistory";
import RoundTimer from "./components/RoundTimer";
import GameExportImport from "./components/GameExportImport";
import { v4 as uuidv4 } from "uuid";

// Assume these are the expected schema versions or some checksum
const CURRENT_SCHEMA_VERSION = "2.0";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("500-dark-mode");
    return saved ? JSON.parse(saved) : false;
  });
  const [teams, setTeams] = useState<Team[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState(-1);
  const [roundStartTime, setRoundStartTime] = useState<number | null>(null);
  const [roundDuration, setRoundDuration] = useState(0);
  const [gameHistory, setGameHistory] = useState<{ teams: Team[]; rounds: Round[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Load game state from localStorage
    const savedState = localStorage.getItem("500-game-state");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        // Check if the schema version matches
        if (parsedState.schemaVersion === CURRENT_SCHEMA_VERSION) {
          const { teams: savedTeams, rounds: savedRounds } = parsedState;

          setTeams(savedTeams);
          setRounds(savedRounds);
          setGameStarted(true);

          const [isOver, winner] = isGameOver(savedTeams.map((t) => t.score));
          setGameOver(isOver);
          setWinningTeam(winner);
        } else {
          console.warn("Schema version mismatch. Clearing invalid data.");
          localStorage.removeItem("500-game-state");
        }
      } catch (error) {
        console.error(
          "Failed to parse saved state. Clearing invalid data.",
          error
        );
        localStorage.removeItem("500-game-state");
      }
    }
  }, []);

  useEffect(() => {
    // Save game state to localStorage
    if (gameStarted) {
      localStorage.setItem(
        "500-game-state",
        JSON.stringify({ schemaVersion: CURRENT_SCHEMA_VERSION, teams, rounds })
      );
    }
  }, [teams, rounds, gameStarted]);

  useEffect(() => {
    // Save dark mode preference
    localStorage.setItem("500-dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Timer for current round
    let interval: NodeJS.Timeout;
    if (roundStartTime && !gameOver) {
      interval = setInterval(() => {
        setRoundDuration(Date.now() - roundStartTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [roundStartTime, gameOver]);

  const saveToHistory = (teams: Team[], rounds: Round[]) => {
    const newHistory = gameHistory.slice(0, historyIndex + 1);
    newHistory.push({ teams: [...teams], rounds: [...rounds] });
    setGameHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handlePlayerSetup = (newTeams: Team[]) => {
    setTeams(newTeams);
    setGameStarted(true);
    setRoundStartTime(Date.now());
    saveToHistory(newTeams, []);
  };

  const handleBidSubmit = (bid: Bid) => {
    const [biddingTeamScore, nonBiddingTeamScore] = calculateRoundScore(bid);
    const newRound: Round = {
      id: uuidv4(),
      bid,
      timestamp: Date.now(),
      biddingTeamScore,
      nonBiddingTeamScore,
    };

    // Update teams with new scores
    const updatedTeams = teams.map((team, idx) => ({
      ...team,
      score:
        team.score +
        (idx === bid.team.id ? biddingTeamScore : nonBiddingTeamScore),
    }));

    const newRounds = [...rounds, newRound];
    setRounds(newRounds);
    setTeams(updatedTeams);
    saveToHistory(updatedTeams, newRounds);

    const [isOver, winner] = isGameOver(updatedTeams.map((t) => t.score));
    if (isOver) {
      setGameOver(true);
      setWinningTeam(winner);
      setRoundStartTime(null);
    } else {
      // Start timer for next round
      setRoundStartTime(Date.now());
    }
  };

  const handleReset = () => {
    localStorage.removeItem("500-game-state");
    setTeams([]);
    setRounds([]);
    setGameStarted(false);
    setGameOver(false);
    setWinningTeam(-1);
    setRoundStartTime(null);
    setRoundDuration(0);
    setGameHistory([]);
    setHistoryIndex(-1);
  };

  const onDeleteRound = (round: Round) => {
    const updatedRounds = rounds.filter((r) => r.id !== round.id);

    // Recalculate scores
    const updatedTeams = teams.map((team) => {
      let score = 0;
      updatedRounds.forEach((r) => {
        if (r.bid.team.id === team.id) {
          score += r.biddingTeamScore;
        } else {
          score += r.nonBiddingTeamScore;
        }
      });

      return { ...team, score };
    });

    setRounds(updatedRounds);
    setTeams(updatedTeams);
    saveToHistory(updatedTeams, updatedRounds);

    const [isOver, winner] = isGameOver(updatedTeams.map((t) => t.score));
    setGameOver(isOver);
    setWinningTeam(winner);
    
    if (isOver) {
      setRoundStartTime(null);
    } else if (updatedRounds.length === 0) {
      setRoundStartTime(Date.now());
    }
  };

  const handleGameImport = (data: { teams: Team[]; rounds: Round[] }) => {
    setTeams(data.teams);
    setRounds(data.rounds);
    setGameStarted(true);
    setGameHistory([data]);
    setHistoryIndex(0);
    
    const [isOver, winner] = isGameOver(data.teams.map((t) => t.score));
    setGameOver(isOver);
    setWinningTeam(winner);
    
    if (!isOver) {
      setRoundStartTime(Date.now());
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = gameHistory[newIndex];
      setTeams(state.teams);
      setRounds(state.rounds);
      setHistoryIndex(newIndex);
      
      const [isOver, winner] = isGameOver(state.teams.map((t) => t.score));
      setGameOver(isOver);
      setWinningTeam(winner);
      
      if (!isOver && state.rounds.length > 0) {
        setRoundStartTime(Date.now());
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < gameHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const state = gameHistory[newIndex];
      setTeams(state.teams);
      setRounds(state.rounds);
      setHistoryIndex(newIndex);
      
      const [isOver, winner] = isGameOver(state.teams.map((t) => t.score));
      setGameOver(isOver);
      setWinningTeam(winner);
      
      if (!isOver && state.rounds.length > 0) {
        setRoundStartTime(Date.now());
      }
    }
  };

  const handleEditRound = (updatedRound: Round) => {
    const updatedRounds = rounds.map(r => r.id === updatedRound.id ? updatedRound : r);
    
    // Recalculate all scores from scratch
    const updatedTeams = teams.map((team) => {
      let score = 0;
      updatedRounds.forEach((r) => {
        if (r.bid.team.id === team.id) {
          const [biddingScore] = calculateRoundScore(r.bid);
          score += biddingScore;
        } else {
          const [, nonBiddingScore] = calculateRoundScore(r.bid);
          score += nonBiddingScore;
        }
      });

      return { ...team, score };
    });

    setRounds(updatedRounds);
    setTeams(updatedTeams);
    saveToHistory(updatedTeams, updatedRounds);

    const [isOver, winner] = isGameOver(updatedTeams.map((t) => t.score));
    setGameOver(isOver);
    setWinningTeam(winner);
    
    if (isOver) {
      setRoundStartTime(null);
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          gameStarted={gameStarted}
          onReset={handleReset}
          teams={teams}
          rounds={rounds}
          onGameImport={handleGameImport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < gameHistory.length - 1}
        />

        {!gameStarted ? (
          <PlayerSetup onComplete={handlePlayerSetup} darkMode={darkMode} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-8">
            <div className="space-y-4 sm:space-y-8">
              <Scoreboard
                teams={teams}
                gameOver={gameOver}
                winningTeam={winningTeam}
              />
              <RoundTimer 
                duration={roundDuration} 
                isActive={roundStartTime !== null && !gameOver} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <BidInput
                  teams={teams}
                  onBidSubmit={handleBidSubmit}
                  disabled={gameOver}
                />
                <ScoringTable />
              </div>
              {rounds.length > 0 && (
                <RoundHistory
                  rounds={rounds}
                  teams={teams}
                  onDelete={onDeleteRound}
                  onEdit={handleEditRound}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
