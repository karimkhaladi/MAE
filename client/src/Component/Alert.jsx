import React from 'react';
import { IoCloseCircleOutline, IoCheckmarkCircleOutline, IoWarningOutline } from 'react-icons/io5';

function Alert({ message, type, onClose }) {
  const alertStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  };

  const iconStyles = {
    success: <IoCheckmarkCircleOutline className="mr-2 text-green-600" size={20} />,
    error: <IoCloseCircleOutline className="mr-2 text-red-600" size={20} />,
    warning: <IoWarningOutline className="mr-2 text-yellow-600" size={20} />,
  };

  return (
    <div
      className={`flex justify-between items-center p-4 mb-4 border-l-4 ${alertStyles[type]} rounded-lg shadow-lg transition-all duration-300`}
      style={{ opacity: message ? 1 : 0 }}
    >
      <div className="flex items-center">
        {iconStyles[type]}
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-lg text-gray-600 hover:text-gray-800"
        aria-label="Close alert"
      >
        &times;
      </button>
    </div>
  );
}

export default Alert;
