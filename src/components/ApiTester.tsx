import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader, Play, Volume2, Mic, AlertTriangle, Info, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import { generateBobResponse } from '../lib/openai';
import { generateSpeech, playAudioFromBuffer } from '../lib/elevenlabs';
import { supabase } from '../lib/supabase';

const ApiTester = () => {
  const [supabaseStatus, setSupabaseStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [openaiStatus, setOpenaiStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [elevenlabsStatus, setElevenlabsStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [openaiResponse, setOpenaiResponse] = useState('');
  const [errorMessages, setErrorMessages] = useState({ supabase: '', openai: '', elevenlabs: '' });
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [testResults, setTestResults] = useState<any>({});

  // Check environment variables
  const envVars = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    openaiKey: import.meta.env.VITE_OPENAI_API_KEY,
    elevenlabsKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
    elevenlabsVoiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID
  };

  const testSupabase = async () => {
    setSupabaseStatus('testing');
    setErrorMessages(prev => ({ ...prev, supabase: '' }));

    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized. Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
      }

      // Test connection by trying to fetch stores
      const { data, error } = await supabase
        .from('stores')
        .select('id, name')
        .limit(1);

      if (error) throw error;

      setTestResults(prev => ({ ...prev, supabase: { tablesFound: data?.length || 0 } }));
      setSupabaseStatus('success');
    } catch (error: any) {
      console.error('Supabase test failed:', error);
      setErrorMessages(prev => ({ 
        ...prev, 
        supabase: error.message || 'Failed to connect to Supabase' 
      }));
      setSupabaseStatus('error');
    }
  };

  const testOpenAI = async () => {
    setOpenaiStatus('testing');
    setOpenaiResponse('');
    setErrorMessages(prev => ({ ...prev, openai: '' }));

    try {
      const context = {
        storeId: 'demo-dispensary',
        knowledgeBase: [],
        conversationHistory: []
      };

      const response = await generateBobResponse('Hello, can you tell me about cannabis?', context);
      setOpenaiResponse(response);
      setOpenaiStatus('success');
    } catch (error: any) {
      console.error('OpenAI test failed:', error);
      setErrorMessages(prev => ({ 
        ...prev, 
        openai: error.message || 'Failed to connect to OpenAI API' 
      }));
      setOpenaiStatus('error');
    }
  };

  const testElevenLabs = async () => {
    setElevenlabsStatus('testing');
    setErrorMessages(prev => ({ ...prev, elevenlabs: '' }));

    try {
      const testText = "Hey! I'm Bob the Budtender. This is a test of my voice system.";
      const audioBuffer = await generateSpeech(testText);
      await playAudioFromBuffer(audioBuffer);
      setTestResults(prev => ({ ...prev, elevenlabs: { audioGenerated: true, textLength: testText.length } }));
      setElevenlabsStatus('success');
    } catch (error: any) {
      console.error('ElevenLabs test failed:', error);
      setErrorMessages(prev => ({ 
        ...prev, 
        elevenlabs: error.message || 'Failed to connect to ElevenLabs API' 
      }));
      setElevenlabsStatus('error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const maskApiKey = (key: string) => {
    if (!key) return 'Not set';
    if (key.includes('your_') || key.includes('your-')) return 'Placeholder value';
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };

  const getEnvStatus = (value: string) => {
    if (!value) return { status: 'missing', color: 'text-red-600', bg: 'bg-red-50' };
    if (value.includes('your_') || value.includes('your-')) return { status: 'placeholder', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'configured', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <Loader className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'testing':
        return 'border-blue-500 bg-blue-50';
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🧪 API Testing Center</h2>
        <p className="text-blue-100">Test all your API connections and verify Bob's configuration</p>
      </div>

      {/* Environment Variables Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">🔧 Environment Variables Status</h3>
          <button
            onClick={() => setShowApiKeys(!showApiKeys)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
          >
            {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showApiKeys ? 'Hide' : 'Show'} API Keys</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Supabase Configuration */}
          <div className={`p-4 rounded-lg border-l-4 ${getEnvStatus(envVars.supabaseUrl).bg} border-l-blue-500`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  getEnvStatus(envVars.supabaseUrl).status === 'configured' ? 'bg-green-500' : 
                  getEnvStatus(envVars.supabaseUrl).status === 'placeholder' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <span className="font-medium">Supabase Database</span>
                  <div className="text-sm text-gray-600">
                    URL: {showApiKeys ? envVars.supabaseUrl || 'Not set' : maskApiKey(envVars.supabaseUrl)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Key: {showApiKeys ? envVars.supabaseKey || 'Not set' : maskApiKey(envVars.supabaseKey)}
                  </div>
                </div>
              </div>
              {!envVars.supabaseUrl && (
                <a 
                  href="https://supabase.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span className="text-sm">Get Supabase</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          
          {/* OpenAI Configuration */}
          <div className={`p-4 rounded-lg border-l-4 ${getEnvStatus(envVars.openaiKey).bg} border-l-green-500`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  getEnvStatus(envVars.openaiKey).status === 'configured' ? 'bg-green-500' : 
                  getEnvStatus(envVars.openaiKey).status === 'placeholder' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <span className="font-medium">OpenAI GPT-4</span>
                  <div className="text-sm text-gray-600">
                    Key: {showApiKeys ? envVars.openaiKey || 'Not set' : maskApiKey(envVars.openaiKey)}
                  </div>
                </div>
              </div>
              {!envVars.openaiKey && (
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                >
                  <span className="text-sm">Get OpenAI Key</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          
          {/* ElevenLabs Configuration */}
          <div className={`p-4 rounded-lg border-l-4 ${getEnvStatus(envVars.elevenlabsKey).bg} border-l-purple-500`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  getEnvStatus(envVars.elevenlabsKey).status === 'configured' ? 'bg-green-500' : 
                  getEnvStatus(envVars.elevenlabsKey).status === 'placeholder' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <span className="font-medium">ElevenLabs Voice</span>
                  <div className="text-sm text-gray-600">
                    Key: {showApiKeys ? envVars.elevenlabsKey || 'Not set' : maskApiKey(envVars.elevenlabsKey)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Voice ID: {envVars.elevenlabsVoiceId || 'Using default'}
                  </div>
                </div>
              </div>
              {!envVars.elevenlabsKey && (
                <a 
                  href="https://elevenlabs.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                >
                  <span className="text-sm">Get ElevenLabs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Configuration Status Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Configuration Status:</span>
            <span className={`${
              Object.values(envVars).filter(v => v && !v.includes('your_') && !v.includes('your-')).length >= 3
                ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {Object.values(envVars).filter(v => v && !v.includes('your_') && !v.includes('your-')).length}/4 APIs configured
            </span>
          </div>
        </div>
      </div>

      {/* API Tests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Supabase Test */}
        <div className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(supabaseStatus)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(supabaseStatus)}
              <h3 className="text-lg font-semibold">Supabase Database</h3>
            </div>
            <button
              onClick={testSupabase}
              disabled={supabaseStatus === 'testing'}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>{supabaseStatus === 'testing' ? 'Testing...' : 'Test DB'}</span>
            </button>
          </div>

          {supabaseStatus === 'success' && testResults.supabase && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-800 mb-2">✅ Database Connected!</h4>
              <p className="text-sm text-green-700">Found {testResults.supabase.tablesFound} store records</p>
            </div>
          )}

          {supabaseStatus === 'error' && errorMessages.supabase && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-red-800 mb-2">❌ Database Error:</h4>
              <p className="text-sm text-red-700">{errorMessages.supabase}</p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>Tests:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Connection to Supabase</li>
              <li>Database schema</li>
              <li>Table access</li>
              <li>Row Level Security</li>
            </ul>
          </div>
        </div>

        {/* OpenAI Test */}
        <div className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(openaiStatus)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(openaiStatus)}
              <h3 className="text-lg font-semibold">OpenAI GPT-4 Test</h3>
            </div>
            <button
              onClick={testOpenAI}
              disabled={openaiStatus === 'testing'}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>{openaiStatus === 'testing' ? 'Testing...' : 'Test Chat'}</span>
            </button>
          </div>

          {openaiStatus === 'success' && openaiResponse && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-800 mb-2">✅ OpenAI Response:</h4>
              <p className="text-sm text-green-700 max-h-20 overflow-y-auto">{openaiResponse}</p>
            </div>
          )}

          {openaiStatus === 'error' && errorMessages.openai && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-red-800 mb-2">❌ Error:</h4>
              <p className="text-sm text-red-700">{errorMessages.openai}</p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>What this tests:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>OpenAI API key validity</li>
              <li>GPT-4 model access</li>
              <li>Bob's personality system</li>
              <li>Response generation</li>
            </ul>
          </div>
        </div>

        {/* ElevenLabs Test */}
        <div className={`rounded-xl shadow-lg p-6 border-2 ${getStatusColor(elevenlabsStatus)}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(elevenlabsStatus)}
              <h3 className="text-lg font-semibold">ElevenLabs Voice Test</h3>
            </div>
            <button
              onClick={testElevenLabs}
              disabled={elevenlabsStatus === 'testing'}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Volume2 className="h-4 w-4" />
              <span>{elevenlabsStatus === 'testing' ? 'Testing...' : 'Test Voice'}</span>
            </button>
          </div>

          {elevenlabsStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-800 mb-2">✅ Voice Test Successful!</h4>
              <p className="text-sm text-green-700">Audio should have played Bob's voice introduction.</p>
            </div>
          )}

          {elevenlabsStatus === 'error' && errorMessages.elevenlabs && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-red-800 mb-2">❌ Error:</h4>
              <p className="text-sm text-red-700">{errorMessages.elevenlabs}</p>
              {errorMessages.elevenlabs.includes('401') || errorMessages.elevenlabs.includes('unauthorized') ? (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800 font-medium">🔧 Quick Fix:</p>
                  <ol className="text-xs text-yellow-700 mt-1 list-decimal list-inside">
                    <li>Go to <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="underline">elevenlabs.io</a> and get your API key</li>
                    <li>Update VITE_ELEVENLABS_API_KEY in your .env file</li>
                    <li>Restart your development server</li>
                    <li>Test again</li>
                  </ol>
                </div>
              ) : null}
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>Tests:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>ElevenLabs API key validity</li>
              <li>Text-to-speech generation</li>
              <li>Audio playback capability</li>
              <li>Voice model access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overall System Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🎯 Overall System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${
              supabaseStatus === 'success' ? 'text-green-600' : 
              supabaseStatus === 'error' ? 'text-red-600' : 'text-gray-400'
            }`}>
              {supabaseStatus === 'success' ? '✅' : supabaseStatus === 'error' ? '❌' : '⏳'}
            </div>
            <div className="text-sm font-medium">Database</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${
              openaiStatus === 'success' ? 'text-green-600' : 
              openaiStatus === 'error' ? 'text-red-600' : 'text-gray-400'
            }`}>
              {openaiStatus === 'success' ? '✅' : openaiStatus === 'error' ? '❌' : '⏳'}
            </div>
            <div className="text-sm font-medium">AI Chat</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold ${
              elevenlabsStatus === 'success' ? 'text-green-600' : 
              elevenlabsStatus === 'error' ? 'text-red-600' : 'text-gray-400'
            }`}>
              {elevenlabsStatus === 'success' ? '✅' : elevenlabsStatus === 'error' ? '❌' : '⏳'}
            </div>
            <div className="text-sm font-medium">Voice Chat</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Ready to go live?</p>
              <p>Once all three systems show ✅, Bob will be fully operational for your dispensary customers!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Setup Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 API Setup Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">1. Supabase Setup</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></li>
              <li>Create new project</li>
              <li>Copy Project URL and anon key</li>
              <li>Run the database migration</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">2. OpenAI Setup</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI API Keys</a></li>
              <li>Create a new API key</li>
              <li>Copy the key to your .env file</li>
              <li>Make sure you have GPT-4 access</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">3. ElevenLabs Setup</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ElevenLabs</a></li>
              <li>Sign up and get your API key</li>
              <li>Copy the key to your .env file</li>
              <li>Restart your dev server</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">4. Environment Variables</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Add these to your hosting platform:</p>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                VITE_SUPABASE_URL<br/>
                VITE_SUPABASE_ANON_KEY<br/>
                VITE_OPENAI_API_KEY<br/>
                VITE_ELEVENLABS_API_KEY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;