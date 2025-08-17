import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, Upload, Download, Search, Filter, Tag, Brain, Zap, DollarSign, HeadphonesIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  is_global: boolean;
  priority: number;
  brain_type: 'knowledge' | 'god' | 'sales' | 'support';
  confidence_score: number;
  usage_count: number;
  last_used: string;
}

interface KnowledgeManagerProps {
  type: 'global' | 'store';
  storeId?: string;
}

const KnowledgeManager: React.FC<KnowledgeManagerProps> = ({ type, storeId }) => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrain, setSelectedBrain] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const [newItem, setNewItem] = useState({
    category: '',
    question: '',
    answer: '',
    tags: '',
    brain_type: 'knowledge' as const,
    priority: 0
  });

  const categories = [
    'Strains', 'CBD', 'Edibles', 'Concentrates', 'Topicals', 
    'Accessories', 'Policies', 'Pricing', 'Medical', 'General'
  ];

  const brainTypes = [
    { id: 'knowledge', name: 'Knowledge Brain', icon: Brain, color: 'bg-blue-500' },
    { id: 'god', name: 'God Brain', icon: Zap, color: 'bg-purple-500' },
    { id: 'sales', name: 'Sales Brain', icon: DollarSign, color: 'bg-green-500' },
    { id: 'support', name: 'Support Brain', icon: HeadphonesIcon, color: 'bg-orange-500' }
  ];

  useEffect(() => {
    loadKnowledgeItems();
  }, [type, storeId]);

  useEffect(() => {
    filterItems();
  }, [knowledgeItems, searchTerm, selectedCategory, selectedBrain]);

  const loadKnowledgeItems = async () => {
    if (!supabase) return;
    
    setIsLoading(true);
    try {
      let query = supabase
        .from('knowledge_base')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (type === 'global') {
        query = query.eq('is_global', true);
      } else if (storeId) {
        query = query.eq('store_id', storeId);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Add mock data for demonstration
      const mockData = data?.map(item => ({
        ...item,
        brain_type: 'knowledge' as const,
        confidence_score: Math.random() * 100,
        usage_count: Math.floor(Math.random() * 100),
        last_used: new Date().toISOString()
      })) || [];

      setKnowledgeItems(mockData);
    } catch (error) {
      console.error('Error loading knowledge items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = knowledgeItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedBrain !== 'all') {
      filtered = filtered.filter(item => item.brain_type === selectedBrain);
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = async () => {
    if (!supabase) return;

    try {
      const item = {
        store_id: storeId || 'demo-dispensary',
        category: newItem.category,
        question: newItem.question,
        answer: newItem.answer,
        tags: newItem.tags.split(',').map(tag => tag.trim()),
        is_global: type === 'global',
        priority: newItem.priority,
        is_active: true
      };

      const { error } = await supabase
        .from('knowledge_base')
        .insert([item]);

      if (error) throw error;

      setNewItem({ category: '', question: '', answer: '', tags: '', brain_type: 'knowledge', priority: 0 });
      setShowAddForm(false);
      await loadKnowledgeItems();
    } catch (error) {
      console.error('Error adding knowledge item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('knowledge_base')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadKnowledgeItems();
    } catch (error) {
      console.error('Error deleting knowledge item:', error);
    }
  };

  const getBrainIcon = (brainType: string) => {
    const brain = brainTypes.find(b => b.id === brainType);
    if (!brain) return Brain;
    return brain.icon;
  };

  const getBrainColor = (brainType: string) => {
    const brain = brainTypes.find(b => b.id === brainType);
    return brain?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">🧠 Knowledge Base</h2>
            <p className="text-indigo-100">
              {filteredItems.length} knowledge items • {type === 'global' ? 'Global' : 'Store-specific'} knowledge base
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{knowledgeItems.length}</div>
            <div className="text-indigo-200 text-sm">Total Items</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search knowledge base..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedBrain}
              onChange={(e) => setSelectedBrain(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Brains</option>
              {brainTypes.map(brain => (
                <option key={brain.id} value={brain.id}>{brain.name}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Knowledge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-green-500">
          <h4 className="font-semibold mb-4 text-lg">Add New Knowledge Item</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brain Type</label>
              <select
                value={newItem.brain_type}
                onChange={(e) => setNewItem({ ...newItem, brain_type: e.target.value as any })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {brainTypes.map(brain => (
                  <option key={brain.id} value={brain.id}>{brain.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority (0-10)</label>
              <input
                type="number"
                min="0"
                max="10"
                value={newItem.priority}
                onChange={(e) => setNewItem({ ...newItem, priority: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={newItem.tags}
                onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="strain, indica, relaxing"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input
              type="text"
              value={newItem.question}
              onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="What question should this answer?"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
            <textarea
              value={newItem.answer}
              onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Bob's response to this question..."
            />
          </div>
          
          <div className="flex space-x-2 mt-6">
            <button
              onClick={handleAddItem}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Knowledge</span>
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Knowledge Items */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading knowledge base...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-lg">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No knowledge items found</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add First Item
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const BrainIcon = getBrainIcon(item.brain_type);
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-indigo-500 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${getBrainColor(item.brain_type)} p-2 rounded-lg`}>
                      <BrainIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-medium">
                        {item.category}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        Priority: {item.priority}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {item.confidence_score?.toFixed(1)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      Used {item.usage_count} times
                    </span>
                    <button
                      onClick={() => setEditingItem(item.id)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-800 mb-2">{item.question}</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.answer}</p>
                
                <div className="flex items-center space-x-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default KnowledgeManager;