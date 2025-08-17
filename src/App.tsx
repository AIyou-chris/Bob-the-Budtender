import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Leaf, Brain, MessageCircle, Bot, Settings, BarChart3, TrendingUp, Code, Globe } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import EmbedDemo from './components/EmbedDemo';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import FloatingMic from './components/FloatingMic';
import AboutSection from './components/AboutSection';

function App() {
  const [currentStore, setCurrentStore] = useState('demo-dispensary');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
          path="/about" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative">
              {/* Cannabis Animated Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {/* Floating Cannabis Leaves */}
                <div className="absolute top-20 left-10 opacity-6 animate-float-slow">
                  <Leaf className="h-14 w-14 text-green-300 transform rotate-12" />
                </div>
                <div className="absolute top-40 right-20 opacity-5 animate-float">
                  <Leaf className="h-10 w-10 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-4 animate-float-slower">
                  <Leaf className="h-18 w-18 text-green-400 transform rotate-90" />
                </div>
                <div className="absolute top-1/3 right-1/3 opacity-6 animate-float">
                  <Leaf className="h-12 w-12 text-emerald-300 transform -rotate-12" />
                </div>
                
                {/* Cannabis Tech Icons */}
                <div className="absolute top-60 left-1/3 opacity-4 animate-float-slow">
                  <Brain className="h-10 w-10 text-green-300" />
                </div>
                <div className="absolute bottom-40 right-1/4 opacity-5 animate-float">
                  <MessageCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="absolute top-1/2 left-20 opacity-3 animate-float-slower">
                  <Bot className="h-12 w-12 text-green-400" />
                </div>
                
                {/* Gradient Cannabis Orbs */}
                <div className="absolute top-1/4 left-1/5 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-3 animate-pulse blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-22 h-22 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-4 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
                
                {/* Cannabis Dots Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  {Array.from({ length: 30 }).map((_, i) => (
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
              </div>
              <Navigation />
              <AboutSection />
              <FloatingMic />
            </div>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative">
              {/* Cannabis Animated Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {/* Floating Cannabis Leaves */}
                <div className="absolute top-20 left-10 opacity-5 animate-float-slow">
                  <Leaf className="h-12 w-12 text-green-300 transform rotate-12" />
                </div>
                <div className="absolute top-40 right-20 opacity-4 animate-float">
                  <Leaf className="h-8 w-8 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-3 animate-float-slower">
                  <Leaf className="h-16 w-16 text-green-400 transform rotate-90" />
                </div>
                <div className="absolute top-1/3 right-1/3 opacity-5 animate-float">
                  <Leaf className="h-10 w-10 text-emerald-300 transform -rotate-12" />
                </div>
                
                {/* Cannabis Admin Icons */}
                <div className="absolute top-60 left-1/3 opacity-3 animate-float-slow">
                  <Settings className="h-8 w-8 text-green-300" />
                </div>
                <div className="absolute bottom-40 right-1/4 opacity-4 animate-float">
                  <BarChart3 className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="absolute top-1/2 left-20 opacity-2 animate-float-slower">
                  <Brain className="h-10 w-10 text-green-400" />
                </div>
                
                {/* Gradient Cannabis Orbs */}
                <div className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-2 animate-pulse blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-3 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
                
                {/* Cannabis Dots Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-8">
                  {Array.from({ length: 20 }).map((_, i) => (
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
              </div>
              <Navigation />
              <AdminDashboard onStoreChange={setCurrentStore} />
              <FloatingMic />
            </div>
          } 
        />
        <Route 
          path="/client" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative">
              {/* Cannabis Animated Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {/* Floating Cannabis Leaves */}
                <div className="absolute top-20 left-10 opacity-6 animate-float-slow">
                  <Leaf className="h-12 w-12 text-green-300 transform rotate-12" />
                </div>
                <div className="absolute top-40 right-20 opacity-5 animate-float">
                  <Leaf className="h-8 w-8 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-4 animate-float-slower">
                  <Leaf className="h-16 w-16 text-green-400 transform rotate-90" />
                </div>
                
                {/* Cannabis Client Icons */}
                <div className="absolute top-60 left-1/3 opacity-4 animate-float-slow">
                  <BarChart3 className="h-8 w-8 text-green-300" />
                </div>
                <div className="absolute bottom-40 right-1/4 opacity-5 animate-float">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
                
                {/* Gradient Cannabis Orbs */}
                <div className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-3 animate-pulse blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-4 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
              </div>
              <ClientDashboard />
              <FloatingMic />
            </div>
          } 
        />
        <Route 
          path="/embed" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative">
              {/* Cannabis Animated Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {/* Floating Cannabis Leaves */}
                <div className="absolute top-20 left-10 opacity-5 animate-float-slow">
                  <Leaf className="h-12 w-12 text-green-300 transform rotate-12" />
                </div>
                <div className="absolute top-40 right-20 opacity-4 animate-float">
                  <Leaf className="h-8 w-8 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-3 animate-float-slower">
                  <Leaf className="h-16 w-16 text-green-400 transform rotate-90" />
                </div>
                
                {/* Cannabis Embed Icons */}
                <div className="absolute top-60 left-1/3 opacity-4 animate-float-slow">
                  <Code className="h-8 w-8 text-green-300" />
                </div>
                <div className="absolute bottom-40 right-1/4 opacity-5 animate-float">
                  <Globe className="h-6 w-6 text-emerald-400" />
                </div>
                
                {/* Gradient Cannabis Orbs */}
                <div className="absolute top-1/4 left-1/5 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-3 animate-pulse blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-4 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
              </div>
              <Navigation />
              <EmbedDemo />
              <FloatingMic />
            </div>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 relative">
              {/* Cannabis Animated Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                {/* Floating Cannabis Leaves */}
                <div className="absolute top-20 left-10 opacity-7 animate-float-slow">
                  <Leaf className="h-14 w-14 text-green-300 transform rotate-12" />
                </div>
                <div className="absolute top-40 right-20 opacity-6 animate-float">
                  <Leaf className="h-10 w-10 text-emerald-400 transform -rotate-45" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-5 animate-float-slower">
                  <Leaf className="h-18 w-18 text-green-400 transform rotate-90" />
                </div>
                <div className="absolute top-1/3 right-1/3 opacity-7 animate-float">
                  <Leaf className="h-12 w-12 text-emerald-300 transform -rotate-12" />
                </div>
                
                {/* Cannabis Chat Icons */}
                <div className="absolute top-60 left-1/3 opacity-5 animate-float-slow">
                  <MessageCircle className="h-10 w-10 text-green-300" />
                </div>
                <div className="absolute bottom-40 right-1/4 opacity-6 animate-float">
                  <Bot className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="absolute top-1/2 left-20 opacity-4 animate-float-slower">
                  <Brain className="h-12 w-12 text-green-400" />
                </div>
                
                {/* Gradient Cannabis Orbs */}
                <div className="absolute top-1/4 left-1/5 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-4 animate-pulse blur-2xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-5 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
                
                {/* Cannabis Dots Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-12">
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
              </div>
              <ChatInterface storeId={currentStore} />
              <FloatingMic />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;