import React from 'react';
import { Undo, Redo } from 'lucide-react';

interface UndoRedoProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function UndoRedo({ onUndo, onRedo, canUndo, canRedo }: UndoRedoProps) {
  return (
    <div className="flex gap-1 sm:gap-3">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-gray-200"
        title="Undo last action"
      >
        <Undo className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Undo</span>
      </button>
      
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border border-gray-200"
        title="Redo last undone action"
      >
        <Redo className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Redo</span>
      </button>
    </div>
  );
}