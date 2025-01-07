import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import ConfirmResetModal from "./ConfirmResetModal";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  gameStarted: boolean;
  onReset: () => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  gameStarted,
  onReset,
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
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <h1
          className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          500 Scoring App
        </h1>
        {gameStarted && (
          <button
            onClick={handleReset}
            className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors mr-4"
          >
            Reset Game
          </button>
        )}
        {showResetModal && (
          <ConfirmResetModal onConfirm={confirmReset} onCancel={cancelReset} />
        )}
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${
          darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-200 text-gray-700"
        }`}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </div>
  );
}
