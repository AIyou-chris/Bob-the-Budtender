import { useState, useCallback } from 'react';
import { supabase, type ChatMessage } from '../lib/supabase';
import { generateBobResponse, type ChatContext } from '../lib/openai';
import { generateSpeech, playAudioFromBuffer } from '../lib/elevenlabs';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bob';
  timestamp: Date;
  isVoice?: boolean;
}

export const useChat = (storeId: string) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm Bob, your friendly cannabis budtender. I'm here to help you find the perfect products and answer any questions about our dispensary. What can I help you with today?",
      sender: 'bob',
      timestamp: new Date(),
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Load knowledge base for context
  const loadKnowledgeBase = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('question, answer, category, tags')
        .or(`store_id.eq.${storeId},is_global.eq.true`);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      return [];
    }
  }, [storeId]);

  // Save message to database
  const saveMessage = useCallback(async (userMessage: string, botResponse: string) => {
    if (!supabase) {
      console.warn('Supabase not configured - message not saved to database');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          store_id: storeId,
          user_message: userMessage,
          bot_response: botResponse,
          session_id: sessionId,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }, [storeId, sessionId]);

  // Generate and play speech
  const speakResponse = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      const audioBuffer = await generateSpeech(text);
      await playAudioFromBuffer(audioBuffer);
    } catch (error) {
      console.error('Error generating speech:', error);
      // Fallback to browser speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }
    } finally {
      setIsSpeaking(false);
    }
  }, []);

  // Send message and get response
  const sendMessage = useCallback(async (text: string, isVoice = false, enableVoiceResponse = true) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      isVoice,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Load knowledge base and conversation history
      const knowledgeBase = await loadKnowledgeBase();
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      const context: ChatContext = {
        storeId,
        knowledgeBase,
        conversationHistory
      };

      // Generate response using OpenAI
      const botResponseText = await generateBobResponse(text, context);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bob',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Save to database
      await saveMessage(text, botResponseText);

      // Generate speech if enabled
      if (enableVoiceResponse) {
        try {
          await speakResponse(botResponseText);
        } catch (speechError) {
          console.warn('Speech generation failed, continuing without voice:', speechError);
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having some technical difficulties right now. Let me get a human budtender to help you out!",
        sender: 'bob',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [storeId, messages, loadKnowledgeBase, saveMessage, speakResponse]);

  return {
    messages,
    isLoading,
    isSpeaking,
    sendMessage
  };
};