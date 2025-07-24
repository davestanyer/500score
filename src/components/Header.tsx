import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import ConfirmResetModal from "./ConfirmResetModal";
import GameExportImport from "./GameExportImport";
import UndoRedo from "./UndoRedo";
import { Team, Round } from "../types/game";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  gameStarted: boolean;
  onReset: () => void;
  teams?: Team[];
  rounds?: Round[];
  onGameImport?: (data: { teams: Team[]; rounds: Round[] }) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export default function Header({
  darkMode,
  setDarkMode,
  gameStarted,
  onReset,
  teams = [],
  rounds = [],
  onGameImport,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: HeaderProps) {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    onReset();
    setShowResetModal(false);
  };

  const cancelReset = () => {
    setShowResetModal(false);
  };

  return (
    <div className="flex justify-between items-center mb-4 sm:mb-8 px-2">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="w-12 h-10 sm:w-16 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center">
              <span className="text-lg sm:text-xl font-black text-white tracking-tighter">500</span>
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
              <span className="text-xs font-bold text-white">🎯</span>
            </div>
          </div>
          <div>
            <h1 className={`text-xl sm:text-3xl font-black tracking-tight ${darkMode ? "text-white" : "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"}`}>
              500Score
            </h1>
            <p className={`text-xs font-medium hidden sm:block ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
              Card Game Scoring
            </p>
          </div>
        </div>
        {gameStarted && (
          <button
            onClick={handleReset}
            className="ml-2 sm:ml-6 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300 transition-all duration-300 font-medium shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
          >
            <span className="hidden sm:inline">Reset Game</span>
            <span className="sm:hidden">Reset</span>
          </button>
        )}
        {onGameImport && (
          <GameExportImport 
            teams={teams} 
            rounds={rounds} 
            onImport={onGameImport} 
          />
        )}
        {gameStarted && onUndo && onRedo && (
          <UndoRedo 
            onUndo={onUndo}
            onRedo={onRedo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        )}
        {showResetModal && (
          <ConfirmResetModal onConfirm={confirmReset} onCancel={cancelReset} />
        )}
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg ${
          darkMode 
            ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-200" 
            : "bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-gray-200"
        }`}
      >
        {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
    </div>
  );
}
