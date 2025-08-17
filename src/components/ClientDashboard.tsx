import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  DollarSign,
  Calendar,
  Eye,
  Settings,
  Brain,
  Mic,
  Volume2,
  Globe,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Target,
  Zap,
  HeadphonesIcon,
  Leaf,
  Bot,
  Filter,
  Search,
  ExternalLink,
  Bell,
  Shield
} from 'lucide-react';

interface DashboardStats {
  totalConversations: number;
  avgResponseTime: number;
  customerSatisfaction: number;
  salesIncrease: number;
  activeUsers: number;
  topQuestions: Array<{ question: string; count: number }>;
  dailyStats: Array<{ date: string; conversations: number; sales: number }>;
}

interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  usage: number;
  lastUsed: string;
}

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [settingsTab, setSettingsTab] = useState('profile');
  const [stats, setStats] = useState<DashboardStats>({
    totalConversations: 2847,
    avgResponseTime: 1.2,
    customerSatisfaction: 94.5,
    salesIncrease: 23.4,
    activeUsers: 156,
    topQuestions: [
      { question: "What's the difference between indica and sativa?", count: 89 },
      { question: "How much CBD should I take?", count: 67 },
      { question: "What are your edible options?", count: 54 },
      { question: "Do you have any deals today?", count: 43 },
      { question: "What's good for anxiety?", count: 38 }
    ],
    dailyStats: [
      { date: '2024-01-20', conversations: 45, sales: 1250 },
      { date: '2024-01-21', conversations: 52, sales: 1480 },
      { date: '2024-01-22', conversations: 38, sales: 980 },
      { date: '2024-01-23', conversations: 61, sales: 1720 },
      { date: '2024-01-24', conversations: 47, sales: 1340 }
    ]
  });

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: '1',
      question: 'What strains help with sleep?',
      answer: 'For sleep, I recommend indica-dominant strains like Granddaddy Purple, Northern Lights, or Purple Kush. These strains are known for their relaxing, sedating effects that can help you unwind and fall asleep naturally.',
      category: 'Strains',
      usage: 45,
      lastUsed: '2 hours ago'
    },
    {
      id: '2',
      question: 'How do edibles work?',
      answer: 'Edibles work differently than smoking. They take 30 minutes to 2 hours to kick in because they need to be digested first. The effects last 4-8 hours and tend to be more body-focused. Always start low and go slow!',
      category: 'Edibles',
      usage: 38,
      lastUsed: '4 hours ago'
    },
    {
      id: '3',
      question: 'What\'s your return policy?',
      answer: 'We stand behind our products! If you\'re not satisfied with your purchase, bring it back within 7 days with your receipt for a full refund or exchange. Your satisfaction is our priority.',
      category: 'Policies',
      usage: 23,
      lastUsed: '1 day ago'
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Base', icon: Brain },
    { id: 'personality', label: 'Bob\'s Personality', icon: Bot },
    { id: 'voice', label: 'Voice Settings', icon: Mic },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Conversations</p>
              <p className="text-3xl font-bold">{stats.totalConversations.toLocaleString()}</p>
              <p className="text-green-200 text-xs mt-1">+12% from last month</p>
            </div>
            <MessageSquare className="h-8 w-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Avg Response Time</p>
              <p className="text-3xl font-bold">{stats.avgResponseTime}s</p>
              <p className="text-blue-200 text-xs mt-1">-0.3s improvement</p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Customer Satisfaction</p>
              <p className="text-3xl font-bold">{stats.customerSatisfaction}%</p>
              <p className="text-purple-200 text-xs mt-1">+2.1% this month</p>
            </div>
            <Star className="h-8 w-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Sales Increase</p>
              <p className="text-3xl font-bold">{stats.salesIncrease}%</p>
              <p className="text-orange-200 text-xs mt-1">Since Bob launched</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity</h3>
          <div className="space-y-3">
            {stats.dailyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{day.conversations} chats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">${day.sales}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Asked Questions</h3>
          <div className="space-y-3">
            {stats.topQuestions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.question}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('knowledge')}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Knowledge</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('personality')}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Bot className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Update Personality</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('voice')}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <Mic className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Voice Settings</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('voice')}
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <Settings className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Account Settings</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🧠 Knowledge Base</h2>
        <p className="text-blue-100">Manage what Bob knows about your products and policies</p>
      </div>

      {/* Document Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Upload className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Upload Bob's Training Files</h3>
        </div>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6 hover:border-blue-400 transition-colors">
          <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Upload Agent Files</h4>
          <p className="text-gray-500 mb-6">Drag and drop files here, or click to browse</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
            <Upload className="h-4 w-4" />
            <span>Choose Files</span>
          </button>
          <p className="text-xs text-gray-400 mt-3">Supports: PDF, DOC, TXT, CSV, JSON - Cannabis menus, strain guides, policies, training materials</p>
        </div>
        
        {/* Uploaded Files Section */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Uploaded Files</h4>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500">No files uploaded yet. Upload documents to train Bob about your dispensary.</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Edit className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h5 className="font-medium text-amber-800">Add Text Knowledge</h5>
                <p className="text-sm text-amber-600">Quick Q&A entry</p>
              </div>
            </div>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Add Text
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h5 className="font-medium text-blue-800">URL Scraper</h5>
                <p className="text-sm text-blue-600">Import from websites</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Add Scraper
            </button>
          </div>
        </div>
      </div>
      {/* Add Knowledge Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Edit className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-semibold">Add Text Knowledge</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Strains</option>
              <option>Edibles</option>
              <option>CBD</option>
              <option>Concentrates</option>
              <option>Topicals</option>
              <option>Accessories</option>
              <option>Policies</option>
              <option>Pricing</option>
              <option>Medical</option>
              <option>General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">Critical (10)</option>
              <option value="8">High (8)</option>
              <option value="5">Medium (5)</option>
              <option value="3">Low (3)</option>
              <option value="1">Very Low (1)</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="indica, relaxing, sleep, pain-relief"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What strain helps with sleep and anxiety?"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bob's Answer</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="For sleep and anxiety, I'd recommend trying our Granddaddy Purple or Northern Lights. Both are indica-dominant strains known for their relaxing, sedating effects..."
          />
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Knowledge</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Test with Bob</span>
          </button>
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Bob's Current Knowledge ({knowledgeItems.length})</h3>
            <p className="text-sm text-gray-600">Knowledge items Bob uses to answer customer questions</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1">
              <RefreshCw className="h-4 w-4" />
              <span>Retrain Bob</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
              <Download className="h-4 w-4 inline mr-1" />
              Export
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
              <Upload className="h-4 w-4 inline mr-1" />
              Import
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {knowledgeItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Priority: High
                    </span>
                    <span className="text-xs text-gray-500">Used {item.usage} times • {item.lastUsed}</span>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">{item.question}</h4>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-500">Tags:</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">indica</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">sleep</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">relaxing</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="text-green-600 hover:text-green-700 p-1" title="Test with Bob">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPersonality = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🤖 Bob's Personality</h2>
        <p className="text-purple-100">Customize how Bob interacts with your customers</p>
      </div>

      {/* Personality Presets */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Personality Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Friendly Budtender', desc: 'Warm, knowledgeable, and approachable' },
            { name: 'Medical Expert', desc: 'Professional, science-focused approach' },
            { name: 'Chill Advisor', desc: 'Laid-back, relaxed personality' },
            { name: 'Premium Concierge', desc: 'Upscale, luxury cannabis experience' }
          ].map((preset, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-800 mb-2">{preset.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{preset.desc}</p>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm transition-colors">
                Apply Preset
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Personality */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Custom Personality</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone & Style</label>
            <textarea
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe how Bob should talk to customers..."
              defaultValue="You are Bob, a friendly and knowledgeable cannabis budtender. Be warm, helpful, and use casual language with occasional cannabis culture references. Always prioritize safety and responsible use."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formality Level</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Casual</option>
                <option>Professional</option>
                <option>Formal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Response Length</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Concise</option>
                <option>Detailed</option>
                <option>Comprehensive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Education</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Medical</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors">
              Save Changes
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              Test Personality
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVoiceSettings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🎤 Voice Settings</h2>
        <p className="text-indigo-100">Configure Bob's voice and speech capabilities</p>
      </div>

      {/* Voice Configuration */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Voice Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice Model</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Bob (Default) - Friendly Male</option>
              <option>Sarah - Professional Female</option>
              <option>Alex - Casual Unisex</option>
              <option>Custom Voice</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speaking Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice Pitch</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              defaultValue="1"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Normal</span>
              <span>High</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice Stability</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.75"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Variable</span>
              <span>Stable</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Test Voice</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Save Settings
          </button>
        </div>
      </div>

      {/* Speech Recognition */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Speech Recognition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-700">Enable background noise filtering</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">⚙️ Settings</h2>
        <p className="text-green-100">Manage your account, team access, and Bob's configuration</p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 p-6">
            {[
              { id: 'team', label: 'Team Access', icon: Users },
              { id: 'profile', label: 'Profile', icon: Settings },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'billing', label: 'Billing', icon: DollarSign },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'api', label: 'API Keys', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    settingsTab === tab.id
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {settingsTab === 'team' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Team Access Management</h3>
                <p className="text-gray-600 mb-6">Give your employees access to manage Bob's knowledge and settings</p>
              </div>

              {/* Add Team Member */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-800 mb-4">Add Team Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="email"
                    placeholder="employee@dispensary.com"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="full">Full Access - Everything</option>
                    <option value="knowledge-voice">Knowledge & Voice - Manage Bob's brain</option>
                    <option value="knowledge">Knowledge Only - Edit knowledge base</option>
                    <option value="view">View Only - Analytics only</option>
                  </select>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Send Invite
                  </button>
                </div>
              </div>

              {/* Current Team */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Current Team (3)</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Johnson', email: 'sarah@greenvalley.com', role: 'Owner', access: 'Full Access', status: 'Active', avatar: 'SJ' },
                    { name: 'Mike Chen', email: 'mike@greenvalley.com', role: 'Manager', access: 'Knowledge & Voice', status: 'Active', avatar: 'MC' },
                    { name: 'Lisa Rodriguez', email: 'lisa@greenvalley.com', role: 'Budtender', access: 'Knowledge Only', status: 'Pending', avatar: 'LR' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-800">{member.access}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                        <button className="text-red-600 hover:text-red-700 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permission Levels */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Permission Levels Explained</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-800">Full Access</p>
                      <p className="text-sm text-gray-600">Everything - manage team, settings, knowledge, voice</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-800">Knowledge & Voice</p>
                      <p className="text-sm text-gray-600">Manage Bob's knowledge base and voice settings</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-800">Knowledge Only</p>
                      <p className="text-sm text-gray-600">Add and edit knowledge base entries only</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-gray-800">View Only</p>
                      <p className="text-sm text-gray-600">View analytics and conversations only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {settingsTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dispensary Profile</h3>
                <p className="text-gray-600 mb-6">Update your dispensary information and branding</p>
              </div>

              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">GV</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Dispensary Logo</h4>
                  <p className="text-sm text-gray-600 mb-2">Upload your dispensary logo</p>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Upload Logo
                  </button>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dispensary Name</label>
                  <input
                    type="text"
                    defaultValue="Green Valley Dispensary"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    defaultValue="CA-123456789"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="info@greenvalley.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Cannabis St, Denver, CO 80202"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue="https://greenvalleydispensary.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Your Dispensary</label>
                <textarea
                  rows={4}
                  defaultValue="Premium cannabis dispensary serving the Denver community with high-quality products and expert guidance."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {settingsTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Notification Preferences</h3>
                <p className="text-gray-600 mb-6">Choose what notifications you want to receive about Bob's activity</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'New Customer Conversations', desc: 'When Bob starts chatting with new customers', enabled: true },
                  { title: 'Knowledge Base Updates', desc: 'When team members add or edit knowledge', enabled: true },
                  { title: 'Daily Activity Summary', desc: 'Daily report of Bob\'s conversations and performance', enabled: false },
                  { title: 'Low Satisfaction Alerts', desc: 'When customer satisfaction drops below threshold', enabled: true },
                  { title: 'API Issues', desc: 'When there are problems with OpenAI or ElevenLabs', enabled: true },
                  { title: 'Weekly Analytics Report', desc: 'Weekly summary of metrics and insights', enabled: false }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={notification.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {settingsTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Billing & Subscription</h3>
                <p className="text-gray-600 mb-6">Manage your subscription and payment methods</p>
              </div>

              {/* Current Plan */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-green-800">Premium Plan</h4>
                    <p className="text-green-600">$99/month • Next billing: Feb 24, 2024</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Manage Plan
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Unlimited conversations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Voice features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Team access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Priority support</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Payment Method</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <span className="text-gray-800">•••• •••• •••• 4242</span>
                    <span className="text-sm text-gray-600">Expires 12/25</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Update
                  </button>
                </div>
              </div>

              {/* Invoice History */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Invoice History</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Jan 24, 2024', amount: '$99.00', status: 'Paid' },
                    { date: 'Dec 24, 2023', amount: '$99.00', status: 'Paid' },
                    { date: 'Nov 24, 2023', amount: '$99.00', status: 'Paid' }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-800">{invoice.date}</span>
                        <span className="text-sm font-medium">{invoice.amount}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {invoice.status}
                        </span>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {settingsTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Security Settings</h3>
                <p className="text-gray-600 mb-6">Keep your account secure</p>
              </div>

              {/* Change Password */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {settingsTab === 'api' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">API Configuration</h3>
                <p className="text-gray-600 mb-6">Manage your AI service connections</p>
              </div>

              {/* OpenAI Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">OpenAI (GPT-4)</h4>
                      <p className="text-sm text-gray-600">Connected and working</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Test Connection
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input
                    type="password"
                    defaultValue="sk-••••••••••••••••••••••••••••••••••••••••"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* ElevenLabs Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">ElevenLabs (Voice)</h4>
                      <p className="text-sm text-gray-600">Connected and working</p>
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Test Voice
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      defaultValue="••••••••••••••••••••••••••••••••"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voice ID</label>
                    <input
                      type="text"
                      defaultValue="pNInz6obpgDQGcFmaJgB"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                Save API Settings
              </button>
            </div>
          )}
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
                <h1 className="text-2xl font-bold text-gray-800">Your Cannabis AI Dashboard</h1>
                <p className="text-gray-600">Manage Bob the Budtender</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Green Valley Dispensary</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">GV</span>
              </div>
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
        {activeTab === 'conversations' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Conversations</h2>
            <p className="text-gray-600">Conversation history and analytics would go here...</p>
          </div>
        )}
        {activeTab === 'knowledge' && renderKnowledge()}
        {activeTab === 'personality' && renderPersonality()}
        {activeTab === 'voice' && renderVoiceSettings()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default ClientDashboard;