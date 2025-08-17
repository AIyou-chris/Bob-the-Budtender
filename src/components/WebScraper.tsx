import React, { useState, useEffect } from 'react';
import { 
  Link, 
  Play, 
  Pause,
  Download, 
  Upload,
  AlertCircle, 
  CheckCircle, 
  Clock,
  Globe,
  Settings,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Calendar,
  Target,
  BarChart3,
  Eye,
  Filter
} from 'lucide-react';

interface ScrapeJob {
  id: string;
  name: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  itemsFound: number;
  lastRun: Date;
  nextRun: Date;
  autoScan: boolean;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  selectors: {
    title: string;
    price: string;
    description: string;
    category: string;
  };
  filters: string[];
  successRate: number;
  totalRuns: number;
}

interface ScrapedData {
  id: string;
  jobId: string;
  title: string;
  price: string;
  description: string;
  category: string;
  url: string;
  scrapedAt: Date;
  processed: boolean;
}

const WebScraper = () => {
  const [scrapeJobs, setScrapeJobs] = useState<ScrapeJob[]>([
    {
      id: '1',
      name: 'Leafly Strains',
      url: 'https://leafly.com/strains',
      status: 'completed',
      itemsFound: 45,
      lastRun: new Date(Date.now() - 3600000),
      nextRun: new Date(Date.now() + 86400000),
      autoScan: true,
      frequency: 'daily',
      selectors: {
        title: '.strain-name',
        price: '.price',
        description: '.description',
        category: '.category'
      },
      filters: ['indica', 'sativa', 'hybrid'],
      successRate: 94.2,
      totalRuns: 47
    },
    {
      id: '2',
      name: 'Weedmaps Products',
      url: 'https://weedmaps.com/products',
      status: 'running',
      itemsFound: 23,
      lastRun: new Date(Date.now() - 1800000),
      nextRun: new Date(Date.now() + 82800000),
      autoScan: true,
      frequency: 'daily',
      selectors: {
        title: '.product-title',
        price: '.product-price',
        description: '.product-desc',
        category: '.product-category'
      },
      filters: ['edibles', 'concentrates'],
      successRate: 87.5,
      totalRuns: 32
    },
    {
      id: '3',
      name: 'Local Dispensary',
      url: 'https://example-dispensary.com/menu',
      status: 'failed',
      itemsFound: 0,
      lastRun: new Date(Date.now() - 86400000),
      nextRun: new Date(Date.now() + 3600000),
      autoScan: false,
      frequency: 'weekly',
      selectors: {
        title: '.menu-item-name',
        price: '.menu-item-price',
        description: '.menu-item-desc',
        category: '.menu-item-category'
      },
      filters: [],
      successRate: 23.1,
      totalRuns: 13
    }
  ]);

  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');

  const [newJob, setNewJob] = useState({
    name: '',
    url: '',
    frequency: 'daily' as const,
    selectors: {
      title: '',
      price: '',
      description: '',
      category: ''
    },
    filters: ''
  });

  const handleAddJob = () => {
    const job: ScrapeJob = {
      id: Date.now().toString(),
      name: newJob.name,
      url: newJob.url,
      status: 'pending',
      itemsFound: 0,
      lastRun: new Date(),
      nextRun: new Date(Date.now() + 86400000),
      autoScan: true,
      frequency: newJob.frequency,
      selectors: newJob.selectors,
      filters: newJob.filters.split(',').map(f => f.trim()),
      successRate: 0,
      totalRuns: 0
    };

    setScrapeJobs([...scrapeJobs, job]);
    setNewJob({
      name: '',
      url: '',
      frequency: 'daily',
      selectors: { title: '', price: '', description: '', category: '' },
      filters: ''
    });
    setShowAddForm(false);
  };

  const handleRunScraper = (jobId: string) => {
    setScrapeJobs(jobs => jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'running' as const }
        : job
    ));

    // Simulate scraping process
    setTimeout(() => {
      const itemsFound = Math.floor(Math.random() * 50) + 10;
      setScrapeJobs(jobs => jobs.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              status: 'completed' as const, 
              itemsFound,
              lastRun: new Date(),
              nextRun: new Date(Date.now() + getFrequencyMs(job.frequency)),
              totalRuns: job.totalRuns + 1,
              successRate: Math.random() * 20 + 80
            }
          : job
      ));

      // Generate mock scraped data
      const mockData: ScrapedData[] = Array.from({ length: itemsFound }, (_, i) => ({
        id: `${jobId}-${Date.now()}-${i}`,
        jobId,
        title: `Cannabis Product ${i + 1}`,
        price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
        description: `High-quality cannabis product with excellent effects...`,
        category: ['Flower', 'Edibles', 'Concentrates', 'Topicals'][Math.floor(Math.random() * 4)],
        url: `https://example.com/product-${i + 1}`,
        scrapedAt: new Date(),
        processed: false
      }));

      setScrapedData(prev => [...prev, ...mockData]);
    }, 3000);
  };

  const getFrequencyMs = (frequency: string) => {
    switch (frequency) {
      case 'hourly': return 3600000;
      case 'daily': return 86400000;
      case 'weekly': return 604800000;
      case 'monthly': return 2592000000;
      default: return 86400000;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'running':
        return <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'paused':
        return <Pause className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderJobsTab = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-800">{scrapeJobs.length}</p>
            </div>
            <Globe className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-800">
                {scrapeJobs.filter(j => j.status === 'running' || j.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items Found</p>
              <p className="text-2xl font-bold text-gray-800">
                {scrapeJobs.reduce((sum, job) => sum + job.itemsFound, 0)}
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-gray-800">
                {(scrapeJobs.reduce((sum, job) => sum + job.successRate, 0) / scrapeJobs.length).toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Add New Job */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scraping Jobs</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => scrapeJobs.forEach(job => handleRunScraper(job.id))}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>Run All</span>
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
            <h4 className="font-semibold mb-4">Add New Scraping Job</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Name</label>
                <input
                  type="text"
                  value={newJob.name}
                  onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Cannabis Site"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="url"
                  value={newJob.url}
                  onChange={(e) => setNewJob({ ...newJob, url: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/products"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={newJob.frequency}
                  onChange={(e) => setNewJob({ ...newJob, frequency: e.target.value as any })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filters (comma-separated)</label>
                <input
                  type="text"
                  value={newJob.filters}
                  onChange={(e) => setNewJob({ ...newJob, filters: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="indica, sativa, edibles"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAddJob}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Add Job
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {scrapeJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(job.status)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-800">{job.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      {job.autoScan && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          Auto
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{job.url}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Items: {job.itemsFound}</span>
                      <span>Success: {job.successRate.toFixed(1)}%</span>
                      <span>Runs: {job.totalRuns}</span>
                      <span>Last: {job.lastRun.toLocaleString()}</span>
                      {job.autoScan && <span>Next: {job.nextRun.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedJob(job.id)}
                    className="text-gray-600 hover:text-blue-600 p-1"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRunScraper(job.id)}
                    disabled={job.status === 'running'}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                  >
                    <Play className="h-3 w-3" />
                    <span>Run</span>
                  </button>
                  <button className="text-gray-600 hover:text-green-600 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600 p-1">
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

  const renderDataTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scraped Data</h3>
          <div className="flex space-x-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Process All</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Title</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Source</th>
                <th className="text-left py-2">Scraped</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scrapedData.slice(0, 10).map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 font-medium">{item.title}</td>
                  <td className="py-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2 font-semibold text-green-600">{item.price}</td>
                  <td className="py-2 text-gray-600">
                    {scrapeJobs.find(j => j.id === item.jobId)?.name || 'Unknown'}
                  </td>
                  <td className="py-2 text-gray-500 text-xs">
                    {item.scrapedAt.toLocaleString()}
                  </td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.processed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.processed ? 'Processed' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1">
                        <CheckCircle className="h-3 w-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🌐 Web Scraping Engine</h2>
        <p className="text-blue-100">Automatically extract cannabis product data from websites to keep Bob's knowledge current</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 p-6">
            {[
              { id: 'jobs', label: 'Scraping Jobs', icon: Globe },
              { id: 'data', label: 'Scraped Data', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
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
          {activeTab === 'jobs' && renderJobsTab()}
          {activeTab === 'data' && renderDataTab()}
          {activeTab === 'settings' && (
            <div className="text-center py-8">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Scraping settings and configuration options</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebScraper;