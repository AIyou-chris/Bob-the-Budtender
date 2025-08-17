# 🌿 Bob the Budtender - Cannabis AI Assistant

![Bob the Budtender](public/Bob%20the%20budtender1.png)

## 🚀 **The Future of Cannabis Retail is Here**

Bob the Budtender is an AI-powered cannabis assistant that transforms every customer interaction into a personalized, educational, and delightful experience. Built by seasoned tech entrepreneurs with 15+ years of experience, Bob combines cutting-edge AI with deep cannabis industry knowledge.

## ✨ **Key Features**

### 🧠 **Advanced AI Brain System**
- **Knowledge Brain** - Deep cannabis education and product expertise
- **God Brain** - Advanced AI with deep reasoning and context awareness  
- **Sales Brain** - Conversion-focused recommendations and upselling
- **Support Brain** - Customer service and problem resolution

### 🎤 **Natural Voice Conversations**
- Advanced speech recognition in multiple languages
- Lifelike voice synthesis with personality
- Context-aware responses that feel natural

### 📊 **Powerful Admin Dashboard**
- Real-time analytics and insights
- Knowledge base management
- Personality and branding customization
- API testing and monitoring

### 🌐 **Easy Integration**
- Simple website embedding
- WordPress plugin available
- Shopify app integration
- Custom API for mobile apps

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom cannabis animations
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Voice**: ElevenLabs Text-to-Speech
- **Deployment**: Netlify
- **Icons**: Lucide React

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key
- ElevenLabs API key (optional, for voice features)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/bob-the-budtender.git
cd bob-the-budtender
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_ELEVENLABS_VOICE_ID=your_voice_id_for_bob
```

4. **Set up the database:**
- Create a new Supabase project
- Run the SQL migrations in `supabase/migrations/`
- Enable Row Level Security

5. **Start the development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see Bob in action!

## 📁 **Project Structure**

```
bob-the-budtender/
├── public/
│   └── Bob the budtender1.png     # Bob's avatar
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx     # Admin interface
│   │   ├── ApiTester.tsx          # API testing tools
│   │   ├── BobAvatar.tsx          # Bob's animated avatar
│   │   ├── ChatInterface.tsx      # Main chat interface
│   │   ├── FloatingMic.tsx        # Voice chat button
│   │   ├── LandingPage.tsx        # Marketing landing page
│   │   ├── Navigation.tsx         # Site navigation
│   │   └── VoiceChatModal.tsx     # Voice chat modal
│   ├── hooks/
│   │   └── useChat.ts             # Chat functionality hook
│   ├── lib/
│   │   ├── elevenlabs.ts          # Voice synthesis
│   │   ├── openai.ts              # AI chat logic
│   │   └── supabase.ts            # Database client
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles + animations
├── supabase/
│   └── migrations/                # Database schema
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── vite.config.ts                 # Vite configuration
└── README.md                      # This file
```

## 🌿 **Cannabis Features**

### **Strain Knowledge**
- Comprehensive strain database
- Effects and dosage information
- Indica vs Sativa guidance
- Terpene profiles

### **Product Recommendations**
- Personalized suggestions
- CBD vs THC guidance
- Edibles dosing advice
- Consumption methods

### **Compliance Ready**
- Age verification integration
- State-specific regulations
- Legal disclaimers
- Responsible use messaging

## 🔧 **Configuration**

### **Personality Customization**
Bob's personality can be customized through the admin dashboard:
- Friendly Budtender (default)
- Medical Expert
- Chill Advisor
- Premium Concierge

### **Knowledge Base Management**
- Add custom strains and products
- Upload product catalogs
- Set dispensary-specific policies
- Manage FAQ responses

### **Voice Configuration**
- Choose from multiple voice options
- Adjust speech speed and tone
- Enable/disable voice features
- Custom voice training available

## 📊 **Analytics & Insights**

Track important metrics:
- Total conversations
- Customer satisfaction rates
- Popular questions
- Conversion metrics
- Response times

## 🚀 **Deployment**

### **Netlify (Recommended)**
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on every push

### **Manual Deployment**
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 **Contributing**

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 **Support**

- 📧 Email: support@bobthebudtender.com
- 💬 Discord: [Join our community]
- 📖 Documentation: [Full docs]
- 🐛 Issues: [GitHub Issues]

## 🎯 **Roadmap**

- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Inventory integration
- [ ] POS system integration
- [ ] Loyalty program features

---

**Built with ❤️ for the cannabis industry by experienced tech entrepreneurs**

*Transforming dispensary customer experiences one conversation at a time* 🌿✨