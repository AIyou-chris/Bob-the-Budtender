import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, User, Bot } from 'lucide-react';
import BobAvatar from './BobAvatar';
import VoiceVisualizer from './VoiceVisualizer';
import { useChat } from '../hooks/useChat';
import { startSpeechRecognition } from '../lib/elevenlabs';

interface ChatInterfaceProps {
  storeId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ storeId }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, isSpeaking, sendMessage } = useChat(storeId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string, isVoice = false) => {
    setInputText('');
    sendMessage(text, isVoice);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      const transcript = await startSpeechRecognition();
      handleSendMessage(transcript, true);
    } catch (error) {
      console.error('Speech recognition error:', error);
      alert('Voice recognition failed. Please try again or type your message.');
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col relative">
      {/* Cannabis Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Cannabis Leaves */}
        <div className="absolute top-20 left-10 opacity-8 animate-float-slow">
          <Leaf className="h-12 w-12 text-green-300 transform rotate-12" />
        </div>
        <div className="absolute top-40 right-20 opacity-6 animate-float">
          <Leaf className="h-8 w-8 text-emerald-400 transform -rotate-45" />
        </div>
        <div className="absolute bottom-32 left-1/4 opacity-5 animate-float-slower">
          <Leaf className="h-16 w-16 text-green-400 transform rotate-90" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-7 animate-float">
          <Leaf className="h-10 w-10 text-emerald-300 transform -rotate-12" />
        </div>
        
        {/* Cannabis Tech Icons */}
        <div className="absolute top-60 left-1/3 opacity-4 animate-float-slow">
          <Brain className="h-8 w-8 text-green-300" />
        </div>
        <div className="absolute bottom-40 right-1/4 opacity-5 animate-float">
          <MessageCircle className="h-6 w-6 text-emerald-400" />
        </div>
        <div className="absolute top-1/2 left-20 opacity-3 animate-float-slower">
          <Bot className="h-10 w-10 text-green-400" />
        </div>
        
        {/* Gradient Cannabis Orbs */}
        <div className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-4 animate-pulse blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-3 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
        
        {/* Cannabis Dots Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-green-300 rounded-full animate-pulse"
              style={{ 
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Cannabis Geometric Shapes */}
        <div className="absolute top-16 right-16 w-12 h-12 border-2 border-green-300 rounded-full opacity-8 animate-float"></div>
        <div className="absolute bottom-20 left-16 w-8 h-8 border-2 border-emerald-400 rounded-lg opacity-6 animate-float-slow transform rotate-45"></div>
        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-green-400 rounded-full opacity-5 animate-float-slower"></div>
      </div>

      <div className="bg-white rounded-t-xl shadow-lg border-t-4 border-green-500 p-4 mb-4">
        <div className="flex items-center space-x-4">
          <BobAvatar isThinking={isLoading} isSpeaking={isSpeaking} />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Bob the Bartender</h2>
            <p className="text-green-600">AI Budtender • Store: {storeId}</p>
            {isSpeaking && <VoiceVisualizer />}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-lg border overflow-hidden flex flex-col relative z-10">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === 'user' ? 'You' : 'Bob'}
                  </span>
                  {message.isVoice && <Volume2 className="h-3 w-3" />}
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-green-600" />
                  <span className="text-xs opacity-75">Bob is thinking...</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Ask Bob about strains, edibles, CBD, or anything cannabis..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={startListening}
              disabled={isListening}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;