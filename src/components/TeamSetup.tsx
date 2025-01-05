import React, { useState } from 'react';
import { TEAM_ICONS } from '../constants/teamIcons';

interface TeamSetupProps {
  teamId: number;
  defaultName: string;
  onUpdate: (name: string, icon: string) => void;
}

export default function TeamSetup({ teamId, defaultName, onUpdate }: TeamSetupProps) {
  const [name, setName] = useState(defaultName);
  const [selectedIcon, setSelectedIcon] = useState(TEAM_ICONS[teamId].emoji);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onUpdate(newName, selectedIcon);
  };

  const handleIconSelect = (emoji: string) => {
    setSelectedIcon(emoji);
    setIsIconPickerOpen(false);
    onUpdate(name, emoji);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
          className="h-10 w-10 flex items-center justify-center text-xl bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {selectedIcon}
        </button>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter team name"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {isIconPickerOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="grid grid-cols-6 gap-2">
            {TEAM_ICONS.map(({ emoji, name }) => (
              <button
                key={name}
                onClick={() => handleIconSelect(emoji)}
                className="h-10 w-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded-md transition-colors"
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