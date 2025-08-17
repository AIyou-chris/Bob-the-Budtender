import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageSquare, 
  DollarSign, 
  HeadphonesIcon,
  Globe,
  Store,
  Settings,
  Upload,
  Link,
  Play,
  Pause,
  BarChart3,
  Users,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Download,
  RefreshCw,
  Eye,
  Bot,
  Leaf
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import ApiTester from './ApiTester';

interface AdminDashboardProps {
  onStoreChange: (storeId: string) => void;
}

interface Store {
  id: string;
  name: string;
  location: string;
  description: string;
  settings: {
    voice_enabled: boolean;
    personality: string;
    custom_instructions: string;
    theme_color: string;
    logo_url: string;
  };
  is_active: boolean;
}

interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  is_global: boolean;
  priority: number;
}

interface ScrapeJob {
  id: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  itemsFound: number;
  lastRun: Date;
  autoScan: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
}

interface ChatAnalytics {
  totalChats: number;
  avgResponseTime: number;
  satisfactionRate: number;
  topQuestions: Array<{ question: string; count: number }>;
  dailyChats: Array<{ date: string; count: number }>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onStoreChange }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStore, setSelectedStore] = useState('demo-dispensary');
  const [stores, setStores] = useState<Store[]>([]);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [scrapeJobs, setScrapeJobs] = useState<ScrapeJob[]>([]);
  const [analytics, setAnalytics] = useState<ChatAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Personality presets for quick setup
  const personalityPresets = [
    {
      name: 'Friendly Budtender',
      description: 'Warm, knowledgeable, and approachable',
      prompt: 'You are Bob, a friendly and knowledgeable cannabis budtender. Be warm, helpful, and use casual language with occasional cannabis culture references. Always prioritize safety and responsible use.'
    },
    {
      name: 'Medical Expert',
      description: 'Professional, medical-focused approach',
      prompt: 'You are Bob, a professional cannabis consultant specializing in medical applications. Provide detailed, science-based information while maintaining a caring, professional demeanor.'
    },
    {
      name: 'Chill Advisor',
      description: 'Laid-back, relaxed personality',
      prompt: 'You are Bob, a chill cannabis advisor. Keep things relaxed and easy-going while sharing your deep knowledge. Use cannabis slang naturally and help customers find their perfect vibe.'
    },
    {
      name: 'Premium Concierge',
      description: 'Upscale, luxury cannabis experience',
      prompt: 'You are Bob, a premium cannabis concierge. Provide sophisticated, detailed recommendations with a focus on quality and craftsmanship. Maintain an upscale, knowledgeable tone.'
    }
  ];

  const brainModes = [
    { id: 'knowledge', name: 'Knowledge Brain', icon: Brain, color: 'bg-blue-500', description: 'General cannabis education and product info' },
    { id: 'god', name: 'God Brain', icon: Zap, color: 'bg-purple-500', description: 'Advanced AI with deep reasoning and context' },
    { id: 'sales', name: 'Sales Brain', icon: DollarSign, color: 'bg-green-500', description: 'Conversion-focused recommendations' },
    { id: 'support', name: 'Support Brain', icon: HeadphonesIcon, color: 'bg-orange-500', description: 'Customer service and problem solving' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'api-test', label: 'API Testing', icon: Zap },
    { id: 'brains', label: 'AI Brains', icon: Brain },
    { id: 'knowledge', label: 'Knowledge Base', icon: MessageSquare },
    { id: 'scraping', label: 'Web Scraping', icon: Globe },
    { id: 'personality', label: 'Bot Personality', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    loadStores();
    loadAnalytics();
  }, []);

  const loadStores = async () => {
    if (!supabase) {
      console.warn('Supabase not configured - using demo data');
      setStores([]);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStores(data || []);
    } catch (error) {
      console.warn('Could not load stores from Supabase - using demo data:', error);
      // Provide demo store data as fallback
      setStores([
        {
          id: 'demo-dispensary',
          name: 'Demo Dispensary',
          location: 'Main Street Cannabis District',
          description: 'A friendly neighborhood dispensary showcasing Bob the Budtender AI assistant',
          settings: {
            voice_enabled: true,
            personality: 'friendly',
            custom_instructions: 'You are Bob, a friendly cannabis budtender. Be warm, helpful, and use casual language.',
            theme_color: '#10b981',
            logo_url: ''
          },
          is_active: true
        }
      ]);
    }
  };

  const loadAnalytics = async () => {
    if (!supabase) return;
    
    try {
      // Mock analytics data - in real app, this would come from Supabase
      setAnalytics({
        totalChats: 1247,
        avgResponseTime: 1.2,
        satisfactionRate: 94.5,
        topQuestions: [
          { question: 'What\'s the difference between indica and sativa?', count: 89 },
          { question: 'How much CBD should I take?', count: 67 },
          { question: 'What are your edible options?', count: 54 },
          { question: 'Do you have any deals today?', count: 43 }
        ],
        dailyChats: [
          { date: '2024-01-20', count: 45 },
          { date: '2024-01-21', count: 52 },
          { date: '2024-01-22', count: 38 },
          { date: '2024-01-23', count: 61 },
          { date: '2024-01-24', count: 47 }
        ]
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handlePersonalityUpdate = async (preset: any) => {
    if (!supabase) return;
    
    try {
      const { error } = await supabase
        .from('stores')
        .update({
          settings: {
            ...stores.find(s => s.id === selectedStore)?.settings,
            personality: preset.name,
            custom_instructions: preset.prompt
          }
        })
        .eq('id', selectedStore);

      if (error) throw error;
      await loadStores();
    } catch (error) {
      console.error('Error updating personality:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Conversations</p>
              <p className="text-3xl font-bold">{analytics?.totalChats || 0}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Avg Response Time</p>
              <p className="text-3xl font-bold">{analytics?.avgResponseTime || 0}s</p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Satisfaction Rate</p>
              <p className="text-3xl font-bold">{analytics?.satisfactionRate || 0}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Active Stores</p>
              <p className="text-3xl font-bold">{stores.filter(s => s.is_active).length}</p>
            </div>
            <Store className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Knowledge</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Globe className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Scan Website</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Bot className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Update Personality</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <BarChart3 className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm">Knowledge base updated with 5 new strain entries</span>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Website scan completed - 23 products found</span>
            <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Bot className="h-5 w-5 text-purple-600" />
            <span className="text-sm">Bot personality updated to "Friendly Budtender"</span>
            <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrains = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🧠 AI Training & Brain Management</h2>
        <p className="text-purple-100">Train and configure different AI personalities for various customer interactions</p>
      </div>

      {/* Training Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Training Center</h3>
            <p className="text-gray-600">Upload data, train models, and optimize Bob's responses</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Training Data</span>
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Start Training</span>
            </button>
          </div>
        </div>
        
        {/* Training Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Knowledge Training</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-sm text-blue-700">85% Complete • 2,847 items processed</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Response Accuracy</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mb-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <p className="text-sm text-green-700">94.2% Accuracy • Last updated 2h ago</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-800">Model Performance</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 mb-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
            </div>
            <p className="text-sm text-purple-700">91% Efficiency • 1.2s avg response</p>
          </div>
        </div>
        
        {/* Training Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Retrain Model</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Training Data</span>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>View Training Metrics</span>
          </button>
        </div>
      </div>

      {/* AI Brain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brainModes.map((brain) => {
          const Icon = brain.icon;
          return (
            <div key={brain.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-gray-300 hover:border-l-green-500 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`${brain.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{brain.name}</h3>
                  <p className="text-sm text-gray-600">{brain.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usage</span>
                  <span className="text-sm font-medium">847 conversations</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-green-600">94.2%</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm transition-colors">
                  Configure
                </button>
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors">
                  Test Brain
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPersonality = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🤖 Bot Personality</h2>
        <p className="text-indigo-100">Customize how Bob interacts with your customers</p>
      </div>

      {/* Quick Presets */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Personality Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalityPresets.map((preset) => (
            <div key={preset.name} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
              <h4 className="font-medium text-gray-800 mb-2">{preset.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
              <button
                onClick={() => handlePersonalityUpdate(preset)}
                className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Apply Preset
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom System Prompt */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Custom System Prompt</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Instructions
            </label>
            <textarea
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="You are Bob the Budtender, a friendly cannabis AI assistant..."
              defaultValue={stores.find(s => s.id === selectedStore)?.settings?.custom_instructions || ''}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Friendly</option>
                <option>Professional</option>
                <option>Casual</option>
                <option>Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Verbosity</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Concise</option>
                <option>Detailed</option>
                <option>Comprehensive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Education</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Medical</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
              Save Changes
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              Test Personality
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg transition-colors">
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScraping = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🌐 Web Scraping</h2>
        <p className="text-blue-100">Automatically update Bob's knowledge from cannabis websites</p>
      </div>

      {/* Add New Scrape Target */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add Scraping Target</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="url"
            placeholder="https://example-dispensary.com/products"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Add Target
          </button>
        </div>
      </div>

      {/* Scraping Jobs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scraping Jobs</h3>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Run All Jobs
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { url: 'leafly.com/strains', status: 'completed', items: 45, lastRun: '2 hours ago' },
            { url: 'weedmaps.com/products', status: 'running', items: 0, lastRun: 'Running now' },
            { url: 'dispensary-website.com', status: 'failed', items: 0, lastRun: '1 day ago' }
          ].map((job, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    job.status === 'completed' ? 'bg-green-500' :
                    job.status === 'running' ? 'bg-blue-500 animate-pulse' :
                    'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium">{job.url}</p>
                    <p className="text-sm text-gray-600">
                      {job.status === 'completed' && `${job.items} items found • `}
                      Last run: {job.lastRun}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Run
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Files */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Knowledge Files</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
          <p className="text-sm text-gray-500">Supports: PDF, CSV, JSON, TXT</p>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Choose Files
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Cannabis AI Admin</h1>
                <p className="text-gray-600">Manage Bob the Budtender</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Eye className="h-4 w-4 inline mr-2" />
                <a href="/chat" className="text-white no-underline">Test Bob Live</a>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'api-test' && <ApiTester />}
        {activeTab === 'brains' && renderBrains()}
        {activeTab === 'personality' && renderPersonality()}
        {activeTab === 'scraping' && renderScraping()}
        {activeTab === 'knowledge' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Knowledge Base Management</h2>
            <p className="text-gray-600">Knowledge base management interface would go here...</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics charts and metrics would go here...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            <p className="text-gray-600">System configuration options would go here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;