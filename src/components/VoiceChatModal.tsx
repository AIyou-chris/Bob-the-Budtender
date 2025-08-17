import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, MessageCircle, Send, Volume2 } from 'lucide-react';
import BobAvatar from './BobAvatar';
import VoiceVisualizer from './VoiceVisualizer';
import { useChat } from '../hooks/useChat';
import { startSpeechRecognition } from '../lib/elevenlabs';

interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeId: string;
}

const VoiceChatModal: React.FC<VoiceChatModalProps> = ({ isOpen, onClose, storeId }) => {
  const [mode, setMode] = useState<'voice' | 'chat'>('voice');
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  
  const { messages, isLoading, isSpeaking, sendMessage } = useChat(storeId);

  useEffect(() => {
    if (isOpen) {
      // Continuous color animation
      const colorInterval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(colorInterval);
    }
  }, [isOpen]);

  const startListening = async () => {
    try {
      setIsListening(true);
      const transcript = await startSpeechRecognition();
      await sendMessage(transcript, true);
    } catch (error) {
      console.error('Speech recognition error:', error);
      alert('Voice recognition failed. Please try again or use text chat.');
    } finally {
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await sendMessage(inputText, false);
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <span className="font-semibold">
                {mode === 'voice' ? 'Voice Assistant' : 'Chat Assistant'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex mt-3 bg-white bg-opacity-20 rounded-lg p-1">
            <button
              onClick={() => setMode('voice')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                mode === 'voice'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Mic className="h-4 w-4 inline mr-1" />
              Voice
            </button>
            <button
              onClick={() => setMode('chat')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                mode === 'chat'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-1" />
              Chat
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'voice' ? (
            <div className="text-center">
              {/* Voice Animation */}
              <div className="relative mb-6">
                {/* Animated rainbow background rings */}
                <div className="absolute inset-0 rounded-full animate-spin" style={{ animation: 'spin 8s linear infinite' }}>
                  <div 
                    className="absolute inset-0 rounded-full opacity-30 blur-sm w-32 h-32 mx-auto"
                    style={{
                      background: `conic-gradient(from ${animationPhase}deg, #ff0080, #ff8000, #ffff00, #80ff00, #00ff80, #0080ff, #8000ff, #ff0080)`
                    }}
                  />
                </div>
                
                {/* Secondary animated ring */}
                <div className="absolute inset-0 rounded-full animate-pulse">
                  <div 
                    className="absolute inset-0 rounded-full opacity-20 blur-md w-32 h-32 mx-auto"
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
                      left: `${50 + 20 * Math.cos((animationPhase + i * 60) * Math.PI / 180)}%`,
                      top: `${50 + 20 * Math.sin((animationPhase + i * 60) * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `float-${i} 3s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}

                {/* Central microphone button */}
                <div className="relative w-32 h-32 mx-auto">
                  {/* Pulsing rings when listening */}
                  {(isListening || isSpeaking) && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-40 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </>
                  )}

                  <button
                    onClick={startListening}
                    disabled={isListening || isLoading}
                    className="relative w-full h-full rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-white"
                    style={{
                      background: isListening || isSpeaking
                        ? `conic-gradient(from ${animationPhase}deg, #ff0080, #ff8000, #ffff00, #80ff00, #00ff80, #0080ff, #8000ff, #ff0080)`
                        : `linear-gradient(135deg, hsl(${animationPhase % 120 + 120}, 70%, 50%), hsl(${(animationPhase + 60) % 120 + 120}, 70%, 60%))`
                    }}
                  >
                    {isListening ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </button>

                  {/* Bob's avatar in corner */}
                  <div className="absolute -bottom-2 -right-2">
                    <BobAvatar isThinking={isLoading} isSpeaking={isSpeaking} />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                {isListening ? (
                  <p className="text-purple-600 font-medium">Listening...</p>
                ) : isSpeaking ? (
                  <VoiceVisualizer />
                ) : isLoading ? (
                  <p className="text-gray-600">Bob is thinking...</p>
                ) : (
                  <p className="text-gray-600">Ready to help!</p>
                )}
              </div>

              {/* Introduction */}
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <p className="text-gray-700 text-sm">
                  Hi! I'm your AI Cannabis Assistant. I can help you learn about strains, products, and everything cannabis-related. What would you like to know?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto space-y-3 border rounded-lg p-3 bg-gray-50">
                {messages.slice(-5).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-800 border'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
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
  );
};

export default VoiceChatModal;