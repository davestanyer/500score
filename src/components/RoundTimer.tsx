import React from 'react';
import { Clock } from 'lucide-react';

interface RoundTimerProps {
  duration: number;
  isActive: boolean;
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function RoundTimer({ duration, isActive }: RoundTimerProps) {
  if (!isActive) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 shadow-sm">
      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md">
        <Clock className="w-4 h-4 text-white" />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-600">Round Time</span>
        <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}