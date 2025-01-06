import React from 'react';

const LoadingAnimation = ({ message = "AI is thinking..." }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="animate-container w-3 h-3 relative">
        <div className="animate-circle"></div>
        <div className="animate-circle delay-150"></div>
        <div className="animate-circle delay-300"></div>
        <div className="animate-circle delay-450"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default LoadingAnimation; 