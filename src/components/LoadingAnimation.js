import React from 'react';

const LoadingAnimation = ({ message = "AI is thinking..." }) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <img src="60fps-slower.gif" alt="Loading animation" className="small-icon" />
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default LoadingAnimation; 