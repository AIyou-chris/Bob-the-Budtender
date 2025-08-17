import React from 'react';

interface BobAvatarProps {
  isThinking: boolean;
  isSpeaking: boolean;
}

const BobAvatar: React.FC<BobAvatarProps> = ({ isThinking, isSpeaking }) => {
  return (
    <div className="relative">
      <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-green-400 transition-transform duration-300 ${
        isSpeaking ? 'scale-110' : isThinking ? 'scale-105' : 'scale-100'
      } ${isSpeaking ? 'shadow-lg shadow-orange-400/50' : ''}`}>
        <img 
          src="/Bob the budtender1.png" 
          alt="Bob the Budtender"
          className="w-full h-full object-cover"
        />
      </div>
      
      {isSpeaking && (
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
      
      {isThinking && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
          <div className="w-3 h-3 bg-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Glowing effect when speaking to match Bob's orange eyes */}
      {isSpeaking && (
        <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-pulse"></div>
      )}
    </div>
  );
};

export default BobAvatar;