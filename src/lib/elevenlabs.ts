import axios from 'axios';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Default voice

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export const generateSpeech = async (
  text: string,
  voiceSettings: VoiceSettings = {
    stability: 0.75,
    similarity_boost: 0.75,
    style: 0.5,
    use_speaker_boost: true
  }
): Promise<ArrayBuffer> => {
  if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY.includes('your_elevenlabs')) {
    throw new Error('ElevenLabs API key not configured. Please set VITE_ELEVENLABS_API_KEY in your .env file with a valid API key from https://elevenlabs.io');
  }
  
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: voiceSettings
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );

    return response.data;
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      if (status === 401) {
        throw new Error(`ElevenLabs API key is invalid or unauthorized. Please check your API key at https://elevenlabs.io and update VITE_ELEVENLABS_API_KEY in your .env file. Then restart your dev server.`);
      } else if (status === 403) {
        throw new Error(`ElevenLabs API access forbidden. Your account may not have access to this voice or feature. Check your subscription at https://elevenlabs.io`);
      } else if (status === 429) {
        throw new Error(`ElevenLabs API rate limit exceeded. Please wait a moment and try again, or upgrade your plan at https://elevenlabs.io`);
      } else {
        const message = error.response?.data?.detail || error.message;
        throw new Error(`ElevenLabs API error (${status}): ${message}`);
      }
    }
    throw new Error(`Failed to generate speech: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const playAudioFromBuffer = (audioBuffer: ArrayBuffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play();
    } catch (error) {
      reject(error);
    }
  });
};

// Speech recognition helper
export const startSpeechRecognition = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event: any) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onend = () => {
      // Recognition ended
    };

    recognition.start();
  });
};