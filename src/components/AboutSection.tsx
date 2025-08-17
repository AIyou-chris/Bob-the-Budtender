import React from 'react';
import { 
  Leaf, 
  Brain, 
  Zap, 
  Users, 
  Calendar, 
  Award,
  TrendingUp,
  Lightbulb,
  Heart,
  Target,
  Globe,
  Smartphone
} from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Calendar, color: 'text-green-600' },
    { number: '500+', label: 'Dispensaries Served', icon: Users, color: 'text-blue-600' },
    { number: '3', label: 'Industry Revolutions', icon: Zap, color: 'text-purple-600' },
    { number: '2', label: 'AI Cannabis Pioneers', icon: Brain, color: 'text-orange-600' }
  ];

  const journey = [
    {
      year: '2009',
      title: 'The Beginning',
      description: 'Started in real estate tech (before it was cool)',
      color: 'bg-blue-500',
      icon: Globe
    },
    {
      year: '2014',
      title: 'Mobile Revolution',
      description: 'Pioneered mobile-first solutions in traditional industries',
      color: 'bg-green-500',
      icon: Smartphone
    },
    {
      year: '2024',
      title: 'Cannabis AI Future',
      description: 'Leading the AI revolution in cannabis retail',
      color: 'bg-purple-500',
      icon: Brain
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've been revolutionizing industries since dial-up. Now we're bringing that same innovation to cannabis.
          </p>
        </div>

        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-l-green-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Cannabis Journey</h2>
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
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-t-green-500">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                    <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mt-8">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 mr-2" />
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

        {/* Journey Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Innovation Journey</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {journey.map((milestone, index) => {
                const Icon = milestone.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`${milestone.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-700 shadow-md">
                          {milestone.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-5/12"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-t-blue-500">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Innovation First</h4>
            <p className="text-gray-600">
              We don't follow trends—we create them. From pre-smartphone platforms to AI cannabis assistants, 
              we're always building tomorrow's solutions today.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-t-green-500">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Customer Obsessed</h4>
            <p className="text-gray-600">
              Every line of code, every feature, every interaction is designed with one goal: 
              making cannabis retail better for dispensaries and their customers.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 text-center border-t-4 border-t-purple-500">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Results Driven</h4>
            <p className="text-gray-600">
              15+ years of proven results across industries. We don't just build cool tech—we build 
              solutions that drive real business growth and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join the Cannabis AI Revolution?</h3>
            <p className="text-xl text-green-100 mb-6">
              Let's transform your dispensary with Bob the Budtender—where innovation meets cannabis retail.
            </p>
            <button className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;