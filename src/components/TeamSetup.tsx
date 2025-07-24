import { useState } from 'react';
import { TEAM_ICONS } from '../constants/teamIcons';

interface TeamSetupProps {
  teamId: number;
  onUpdate: (icon: string) => void;
  darkMode: boolean;
}

export default function TeamSetup({ teamId, onUpdate, darkMode }: TeamSetupProps) {
  const [selectedIcon, setSelectedIcon] = useState(TEAM_ICONS[teamId].emoji);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const handleIconSelect = (emoji: string) => {
    setSelectedIcon(emoji);
    setIsIconPickerOpen(false);
    onUpdate(emoji);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
          className={`h-12 w-12 flex items-center justify-center text-2xl rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 border ${
            darkMode
              ? 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 border-gray-500'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-gray-200'
          }`}
        >
          {selectedIcon}
        </button>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Tap to change team icon</span>
        </div>
      </div>

      {isIconPickerOpen && (
        <div className={`rounded-2xl shadow-xl p-6 border backdrop-blur-sm ${
          darkMode
            ? 'bg-gray-700 border-gray-600'
            : 'bg-white border-gray-200'
        }`}>
          <h4 className={`text-sm font-semibold mb-4 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>Choose Team Icon</h4>
          <div className="grid grid-cols-6 gap-3">
            {TEAM_ICONS.map(({ emoji, name }) => (
              <button
                key={name}
                onClick={() => handleIconSelect(emoji)}
                className={`h-12 w-12 flex items-center justify-center text-2xl rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border ${
                  selectedIcon === emoji 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 border-indigo-400' 
                    : darkMode
                      ? 'bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 shadow-sm hover:shadow-md border-gray-500'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 shadow-sm hover:shadow-md border-gray-200'
                }`}
                title={name}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}