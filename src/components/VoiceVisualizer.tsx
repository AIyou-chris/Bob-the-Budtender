import React from 'react';

const VoiceVisualizer = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm text-orange-600 mr-2">Bob is speaking...</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 bg-orange-400 rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 16 + 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;