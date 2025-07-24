import React from 'react';

interface ConfirmResetModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-96 mx-4 shadow-2xl border border-gray-200 transform scale-100 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Every sunset is an opportunity to reset</h2>
        <p className="mb-8 text-gray-600 text-lg">Are you sure you want to reset the game? This action cannot be undone.</p>
        <div className="flex gap-4">
          <button
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md border border-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
            onClick={onConfirm}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetModal;