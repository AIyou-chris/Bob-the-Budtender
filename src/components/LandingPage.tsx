import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Leaf, 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  Star,
  X,
  Calendar,
  Clock,
  Phone,
  Mail,
  Building,
  MapPin,
  Target,
  CheckCircle,
  DollarSign,
  HeadphonesIcon,
  Globe,
  Settings,
  BarChart3,
  Mic,
  Volume2,
  Bot,
  ArrowRight,
  Play,
  ChevronRight,
  Info,
  Smartphone
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import FloatingMic from './FloatingMic';

const LandingPage = () => {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    goals: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (supabase) {
        const { error } = await supabase
          .from('consultation_requests')
          .insert({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            preferred_date: formData.preferredDate || null,
            preferred_time: formData.preferredTime || null,
            goals: formData.goals,
            source: 'landing_page'
          });

        if (error) throw error;
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowConsultationModal(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          preferredDate: '',
          preferredTime: '',
          goals: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const brainModes = [
    { 
      id: 'knowledge', 
      name: 'Knowledge Brain', 
      icon: Brain, 
      color: 'from-blue-500 to-blue-600', 
      description: 'Deep cannabis education and product expertise',
      features: ['Strain information', 'Effects & dosages', 'Product recommendations', 'Medical guidance']
    },
    { 
      id: 'god', 
      name: 'God Brain', 
      icon: Zap, 
      color: 'from-purple-500 to-purple-600', 
      description: 'Advanced AI with deep reasoning and context awareness',
      features: ['Complex problem solving', 'Multi-step reasoning', 'Context understanding', 'Advanced analytics']
    },
    { 
      id: 'sales', 
      name: 'Sales Brain', 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600', 
      description: 'Conversion-focused recommendations and upselling',
      features: ['Smart upselling', 'Bundle recommendations', 'Price optimization', 'Sales analytics']
    },
    { 
      id: 'support', 
      name: 'Support Brain', 
      icon: HeadphonesIcon, 
      color: 'from-orange-500 to-orange-600', 
      description: 'Customer service and problem resolution',
      features: ['Issue resolution', 'Order tracking', 'Return handling', 'Customer satisfaction']
    }
  ];

  const features = [
    {
      icon: Mic,
      title: "Voice Interaction",
      description: "Natural voice conversations with Bob using advanced speech recognition and text-to-speech"
    },
    {
      icon: Brain,
      title: "AI-Powered Knowledge",
      description: "Deep understanding of cannabis strains, effects, dosages, and personalized recommendations"
    },
    {
      icon: Globe,
      title: "Web Integration",
      description: "Easy website embedding with customizable themes and compliance features"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track customer interactions, popular questions, and conversion metrics"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Built-in age verification and state-specific cannabis regulations"
    },
    {
      icon: Settings,
      title: "Customizable Personality",
      description: "Tailor Bob's personality and responses to match your dispensary's brand"
    }
  ];

  const stats = [
    { number: '94%', label: 'Customer Satisfaction', icon: Star },
    { number: '23%', label: 'Increase in AOV', icon: TrendingUp },
    { number: '24/7', label: 'Availability', icon: Clock },
    { number: '1.2s', label: 'Response Time', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-40">
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
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat</span>
              </Link>
              
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
              
              <Link 
                to="/embed" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span>Embed</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 relative overflow-hidden">
        {/* Cannabis Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Cannabis Leaves */}
          <div className="absolute top-20 left-10 opacity-10 animate-float-slow">
            <Leaf className="h-16 w-16 text-green-300 transform rotate-12" />
          </div>
          <div className="absolute top-40 right-20 opacity-8 animate-float">
            <Leaf className="h-12 w-12 text-emerald-400 transform -rotate-45" />
          </div>
          <div className="absolute bottom-32 left-1/4 opacity-6 animate-float-slower">
            <Leaf className="h-20 w-20 text-green-400 transform rotate-90" />
          </div>
          <div className="absolute top-1/3 right-1/3 opacity-7 animate-float">
            <Leaf className="h-14 w-14 text-emerald-300 transform -rotate-12" />
          </div>
          
          {/* Floating Cannabis Icons */}
          <div className="absolute top-60 left-1/3 opacity-5 animate-float-slow">
            <Brain className="h-10 w-10 text-green-300" />
          </div>
          <div className="absolute bottom-40 right-1/4 opacity-6 animate-float">
            <MessageCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="absolute top-1/2 left-20 opacity-4 animate-float-slower">
            <Bot className="h-12 w-12 text-green-400" />
          </div>
          
          {/* Additional Cannabis Elements */}
          <div className="absolute top-80 right-10 opacity-4 animate-float">
            <div className="text-green-400 font-bold text-lg">CBD</div>
          </div>
          <div className="absolute bottom-60 left-10 opacity-5 animate-float-slow">
            <div className="text-emerald-400 font-bold text-lg">THC</div>
          </div>
          <div className="absolute top-1/4 right-1/4 opacity-3 animate-float-slower">
            <div className="w-8 h-8 border-2 border-green-400 rounded-full flex items-center justify-center text-xs text-green-400 font-bold">🌿</div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 opacity-4 animate-float">
            <div className="w-6 h-6 bg-green-400 rounded-full opacity-60"></div>
          </div>
          
          {/* Gradient Cannabis Orbs */}
          <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-5 animate-pulse blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-4 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/2 w-20 h-20 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-3 animate-pulse blur-xl" style={{ animationDelay: '4s' }}></div>
          
          {/* Floating Dots Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
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
          
          {/* Subtle Cannabis Geometric Shapes */}
          <div className="absolute top-16 right-16 w-16 h-16 border-2 border-green-300 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-20 left-16 w-12 h-12 border-2 border-emerald-400 rounded-lg opacity-8 animate-float-slow transform rotate-45"></div>
          <div className="absolute top-2/3 right-1/3 w-8 h-8 bg-green-400 rounded-full opacity-6 animate-float-slower"></div>
          
          {/* Cannabis Molecule Representations */}
          <div className="absolute top-1/3 left-1/4 opacity-3 animate-float">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-1/2 right-1/4 opacity-4 animate-float-slow">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Meet Bob the Budtender
              </h1>
              
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                The AI assistant that transforms every customer interaction into a personalized cannabis experience. Increase sales, improve satisfaction, and never miss a customer question again.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Get Free Consultation</span>
                </button>
                
                <Link
                  to="/chat"
                  className="bg-white hover:bg-gray-100 text-green-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Try Bob Now</span>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src="/Bob the budtender1.png" 
                    alt="Bob the Budtender"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                  AI Assistant
                </div>
                <div className="absolute -top-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  24/7 Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How Bob Helps Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Bob Transforms Your Dispensary
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bob doesn't just answer questions - he creates personalized experiences that drive sales and build customer loyalty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Brain System Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🧠 Advanced AI Brain System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bob uses multiple specialized AI brains to provide the perfect response for every situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brainModes.map((brain, index) => {
              const Icon = brain.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${brain.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{brain.name}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{brain.description}</p>
                  
                  <div className="space-y-3">
                    {brain.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link 
                      to="/admin"
                      className="text-green-600 hover:text-green-700 font-semibold flex items-center space-x-2"
                    >
                      <span>Configure in Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-20 relative overflow-hidden">
        {/* Subtle Cannabis Background for About Section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Very subtle floating elements */}
          <div className="absolute top-10 right-10 opacity-3 animate-float-slower">
            <Leaf className="h-8 w-8 text-green-200" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-3 animate-float">
            <Leaf className="h-6 w-6 text-emerald-200 transform rotate-45" />
          </div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full opacity-20 animate-pulse blur-xl"></div>
          
          {/* Additional Cannabis Elements */}
          <div className="absolute top-1/3 left-1/5 opacity-2 animate-float">
            <div className="text-green-200 font-bold text-sm">CBD</div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 opacity-2 animate-float-slow">
            <div className="text-emerald-200 font-bold text-sm">THC</div>
          </div>
          <div className="absolute top-2/3 left-1/3 opacity-1 animate-float-slower">
            <div className="w-4 h-4 border border-green-200 rounded-full flex items-center justify-center text-xs">🌿</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've been revolutionizing industries since dial-up. Now we're bringing that same innovation to cannabis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-l-green-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Cannabis Journey</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded by seasoned tech entrepreneurs with over <span className="font-semibold text-green-600">15 years</span> of 
                  hands-on experience, we've seen industries evolve—and helped shape them. From launching our first platform 
                  in 2009 (yeah, we were building before everyone had smartphones), to pioneering mobile-first solutions 
                  in 2014, we've always stayed two steps ahead of the curve.
                </p>
                
                <p>
                  Today, we proudly serve over <span className="font-semibold text-blue-600">500 cannabis dispensaries</span>, 
                  blending cutting-edge AI technology with old-school customer service. And let's not forget our two 
                  four-legged <span className="font-semibold text-orange-600">Chief Happiness Officers</span>, who remind 
                  us daily that loyalty and presence are everything in this business.
                </p>
                
                <p className="text-lg font-medium text-purple-600">
                  This isn't just business—it's <span className="text-green-600">legacy</span>, <span className="text-blue-600">innovation</span>, 
                  and a commitment to doing cannabis retail right.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience Accumulation</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-t-green-500">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                  <div className="text-gray-600 text-sm font-medium">Years Experience</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-t-blue-500">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600 text-sm font-medium">Dispensaries Served</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-t-purple-500">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                  <div className="text-gray-600 text-sm font-medium">Industry Revolutions</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-t-orange-500">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
                  <div className="text-gray-600 text-sm font-medium">AI Cannabis Pioneers</div>
                </div>
              </div>
              
              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 mr-2" />
                  <h4 className="text-lg font-semibold">Our Mission</h4>
                </div>
                <p className="text-green-100">
                  To transform every cannabis customer interaction into a personalized, educational, 
                  and delightful experience through AI innovation—because every customer deserves 
                  their perfect cannabis match.
                </p>
              </div>
            </div>
          </div>

          {/* Journey Timeline - Compact Version */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Innovation Journey</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-md mb-3 inline-block">
                  2009
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">The Beginning</h4>
                <p className="text-gray-600">Started in real estate tech (before it was cool)</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-md mb-3 inline-block">
                  2014
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mobile Revolution</h4>
                <p className="text-gray-600">Pioneered mobile-first solutions in traditional industries</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-md mb-3 inline-block">
                  2024
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Cannabis AI Future</h4>
                <p className="text-gray-600">Leading the AI revolution in cannabis retail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Features Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                🎤 Natural Voice Conversations
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Bob speaks and listens just like a real budtender. Customers can have natural voice conversations about products, effects, and recommendations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Speech Recognition</h4>
                    <p className="text-purple-100">Advanced voice understanding in multiple languages</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <Volume2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Natural Speech</h4>
                    <p className="text-purple-100">Lifelike voice synthesis with personality</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Conversational AI</h4>
                    <p className="text-purple-100">Context-aware responses that feel natural</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-48 h-48 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
                    <Mic className="h-24 w-24 text-white" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Try Voice Chat!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              📊 Powerful Admin Dashboard
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete control over Bob's knowledge, personality, and performance with real-time analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics & Insights</h3>
              <p className="text-gray-400 text-sm mb-4">Track conversations, popular questions, and customer satisfaction in real-time.</p>
              <Link to="/admin" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1">
                <span>View Dashboard</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Knowledge Management</h3>
              <p className="text-gray-400 text-sm mb-4">Add products, strains, and custom responses to keep Bob's knowledge current.</p>
              <Link to="/admin" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center space-x-1">
                <span>Manage Knowledge</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Personality & Branding</h3>
              <p className="text-gray-400 text-sm mb-4">Customize Bob's personality, tone, and responses to match your brand.</p>
              <Link to="/admin" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center space-x-1">
                <span>Customize Bob</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Dispensary?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of dispensaries already using Bob to enhance customer experience and boost sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Schedule Free Consultation
            </button>
            <Link
              to="/chat"
              className="bg-white hover:bg-gray-100 text-green-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Try Bob Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bob the Budtender</h3>
                  <p className="text-gray-400">Cannabis AI Assistant</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming dispensary customer experiences with AI-powered conversations, personalized recommendations, and 24/7 availability.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/chat" className="hover:text-white transition-colors">Try Bob</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/embed" className="hover:text-white transition-colors">Integration</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setShowConsultationModal(true)} className="hover:text-white transition-colors">Contact</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bob the Budtender. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Microphone */}
      <FloatingMic />

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Free Business Consultation
                </h3>
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                Let's discuss how Bob can specifically help your dispensary grow
              </p>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@dispensary.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dispensary Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Green Valley Dispensary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goals for Your Business *</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="What are your main goals? (increase sales, improve customer experience, reduce staff workload, etc.)"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    {submitSuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Success!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Consultation</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;