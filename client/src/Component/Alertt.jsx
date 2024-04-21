// Alert.js
import React from 'react';

const Alert = ({ message, type }) => {
 const alertClass = type === 'error' ? 'bg-red-500' : 'bg-green-500';
 const textClass = type === 'error' ? 'text-white' : 'text-black';

 return (
    <div className={`p-4 rounded-lg ${alertClass} ${textClass}`}>
      {message}
    </div>
 );
};

export default Alert;
