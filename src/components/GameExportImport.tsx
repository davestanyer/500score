import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Team, Round } from '../types/game';

interface GameExportImportProps {
  teams: Team[];
  rounds: Round[];
  onImport: (data: { teams: Team[]; rounds: Round[] }) => void;
}

export default function GameExportImport({ teams, rounds, onImport }: GameExportImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const gameData = {
      teams,
      rounds,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `500score-game-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const gameData = JSON.parse(e.target?.result as string);
        
        // Validate the imported data
        if (gameData.teams && gameData.rounds && Array.isArray(gameData.teams) && Array.isArray(gameData.rounds)) {
          onImport({ teams: gameData.teams, rounds: gameData.rounds });
        } else {
          alert('Invalid game file format');
        }
      } catch (error) {
        alert('Error reading game file');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-1 sm:gap-3">
      <button
        onClick={handleExport}
        disabled={teams.length === 0}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-xl sm:rounded-2xl hover:from-blue-200 hover:to-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-blue-200"
      >
        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Export Game</span>
        <span className="sm:hidden">Export</span>
      </button>
      
      <label className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-xl sm:rounded-2xl hover:from-green-200 hover:to-green-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-green-200">
        <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Import Game</span>
        <span className="sm:hidden">Import</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}