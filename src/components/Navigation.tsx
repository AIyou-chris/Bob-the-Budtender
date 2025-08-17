import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Settings, Code, Leaf, BarChart3, Info } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Bob the Budtender</h1>
              <p className="text-sm text-gray-600">Cannabis AI Assistant</p>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="/chat" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/chat') 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat</span>
            </Link>
            
            <Link 
              to="/admin" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin') 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Admin</span>
            </Link>
            
            <Link 
              to="/client" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/client') 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Client Dashboard</span>
            </Link>
            
            <Link 
              to="/embed" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/embed') 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Code className="h-5 w-5" />
              <span>Embed</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;