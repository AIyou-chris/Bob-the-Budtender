import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import VoiceChatModal from './VoiceChatModal';

const FloatingMic = () => {
  const [isListening, setIsListening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showVoiceChatModal, setShowVoiceChatModal] = useState(false);

  useEffect(() => {
    // Continuous color animation
    const colorInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    if (isListening) {
      // Simulate audio level animation
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const handleMicClick = () => {
    setShowVoiceChatModal(true);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
      {/* Animated rainbow background rings */}
      <div className="absolute inset-0 rounded-full animate-spin" style={{ animation: 'spin 8s linear infinite' }}>
        <div 
          className="absolute inset-0 rounded-full opacity-30 blur-sm"
          style={{
            background: `conic-gradient(from ${animationPhase}deg, #ff0080, #ff8000, #ffff00, #80ff00, #00ff80, #0080ff, #8000ff, #ff0080)`
          }}
        />
      </div>
      
      {/* Secondary animated ring */}
      <div className="absolute inset-0 rounded-full animate-pulse">
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-md"
          style={{
            background: `conic-gradient(from ${-animationPhase}deg, #f8980d, #00ff80, #0080ff, #ff0080, #f8980d)`
          }}
        />
      </div>
      
      {/* Floating particles effect */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-60"
          style={{
            background: `hsl(${(animationPhase + i * 60) % 360}, 70%, 60%)`,
            left: `${50 + 30 * Math.cos((animationPhase + i * 60) * Math.PI / 180)}%`,
            top: `${50 + 30 * Math.sin((animationPhase + i * 60) * Math.PI / 180)}%`,
            transform: 'translate(-50%, -50%)',
            animation: `float-${i} 3s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      
      {/* Floating mic button */}
      <div
        className={`relative transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulsing rings when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-40 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 opacity-20 animate-ping" style={{ animationDelay: '1s' }}></div>
          </>
        )}
        
        {/* Audio level visualization */}
        {isListening && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-100"
                style={{
                  height: `${Math.max(4, (audioLevel + i * 10) % 20)}px`,
                  opacity: audioLevel > i * 15 ? 1 : 0.3,
                  background: `hsl(${(animationPhase + i * 30) % 360}, 70%, 60%)`
                }}
              />
            ))}
          </div>
        )}

        {/* Main mic button */}
        <button
          onClick={handleMicClick}
          className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden ${
            'text-white'
          } ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}
          style={{
            background: `linear-gradient(135deg, hsl(${animationPhase % 120 + 120}, 70%, 50%), hsl(${(animationPhase + 60) % 120 + 120}, 70%, 60%))`
          }}
        >
          {/* Animated overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${50 + 20 * Math.cos(animationPhase * Math.PI / 180)}% ${50 + 20 * Math.sin(animationPhase * Math.PI / 180)}%, rgba(255,255,255,0.3) 0%, transparent 50%)`
            }}
          />
          
          <Mic className="h-7 w-7 relative z-10" />
        </button>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
            Talk to Bob
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}

        {/* Bob's face indicator */}
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden">
          <img 
            src="/Bob the budtender1.png" 
            alt="Bob"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Add custom keyframes for floating particles */}
      <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-10px); } }
        @keyframes float-1 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-8px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-12px); } }
        @keyframes float-3 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-6px); } }
        @keyframes float-4 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-14px); } }
        @keyframes float-5 { 0%, 100% { transform: translate(-50%, -50%) translateY(0px); } 50% { transform: translate(-50%, -50%) translateY(-9px); } }
      `}</style>
    </div>

      {/* Voice Chat Modal */}
      <VoiceChatModal 
        isOpen={showVoiceChatModal}
        onClose={() => setShowVoiceChatModal(false)}
        storeId="demo-dispensary"
      />
    </>
  );
};

export default FloatingMic;