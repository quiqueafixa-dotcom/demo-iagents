import React, { useState, useEffect } from 'react';
import { 
  Globe, MessageSquare, TrendingUp, Mic, 
  ArrowRight, Check, X, Clock, Mail, 
  Phone, Calendar, BarChart3, Zap, 
  ChevronLeft, Send, Play, Download,
  Star, AlertCircle, CheckCircle2, Smartphone
} from 'lucide-react';

// Simulated Chart Component (replacing Chart.js for simplicity)
const ProgressBar = ({ value, max = 100, color = "bg-gradient-to-r from-cyan-500 to-violet-500" }) => (
  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
    <div 
      className={`h-full ${color} transition-all duration-1000 ease-out`}
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

const CircularProgress = ({ value, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
        {Math.round(value)}
      </div>
    </div>
  );
};

// Main App Component
const IAgentsDemo = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCase, setActiveCase] = useState(null);

  const cases = [
    {
      id: 'audit',
      icon: Globe,
      title: 'Auditoría Web Instantánea',
      description: 'Análisis completo de SEO, rendimiento y usabilidad en 30 segundos',
      color: 'from-cyan-500 to-blue-600',
      savings: '€200-500 y días de espera'
    },
    {
      id: 'chatbot',
      icon: MessageSquare,
      title: 'Chatbot Inteligente 24/7',
      description: 'Atención al cliente automatizada que nunca duerme',
      color: 'from-violet-500 to-purple-600',
      savings: '€2,000-3,000/mes en personal'
    },
    {
      id: 'funnel',
      icon: TrendingUp,
      title: 'Funnel de Ventas Automatizado',
      description: 'Convierte leads en clientes mientras duermes',
      color: 'from-emerald-500 to-teal-600',
      savings: '3x más conversiones'
    },
    {
      id: 'voice',
      icon: Mic,
      title: 'Clones de Voz e IA',
      description: 'Contenido de audio profesional ilimitado sin locutor',
      color: 'from-pink-500 to-rose-600',
      savings: '€300-500 por locución'
    }
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage cases={cases} onSelectCase={(id) => setCurrentPage(id)} />;
      case 'audit':
        return <AuditCase onBack={() => setCurrentPage('home')} />;
      case 'chatbot':
        return <ChatbotCase onBack={() => setCurrentPage('home')} />;
      case 'funnel':
        return <FunnelCase onBack={() => setCurrentPage('home')} />;
      case 'voice':
        return <VoiceCase onBack={() => setCurrentPage('home')} />;
      case 'contact':
        return <ContactPage onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage cases={cases} onSelectCase={(id) => setCurrentPage(id)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {renderPage()}
      </div>

      {/* Floating CTA Button */}
      {currentPage !== 'contact' && (
        <button
          onClick={() => setCurrentPage('contact')}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-6 py-3 rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 z-50"
        >
          <Zap size={20} />
          ¿Listo para automatizar?
        </button>
      )}
    </div>
  );
};

// HomePage Component
const HomePage = ({ cases, onSelectCase }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full border border-cyan-500/30">
          <span className="text-cyan-400 font-mono text-sm">iAgents Digital</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Experimenta el Poder de<br />la Automatización
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          Prueba casos reales de automatización en vivo. Sin compromiso, sin esperas.<br />
          <span className="text-cyan-400">Descubre cómo la IA puede transformar tu negocio.</span>
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>100% Gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Resultados Instantáneos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Sin Registro</span>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-20">
        {cases.map((caseItem, index) => {
          const Icon = caseItem.icon;
          return (
            <div
              key={caseItem.id}
              className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => onSelectCase(caseItem.id)}
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${caseItem.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={32} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {caseItem.title}
              </h3>
              <p className="text-slate-400 mb-4">
                {caseItem.description}
              </p>

              {/* Savings Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-4">
                <Zap size={14} />
                Ahorra: {caseItem.savings}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all">
                Probar ahora
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Decorative gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[
          { value: '500+', label: 'Empresas Automatizadas' },
          { value: '€2M+', label: 'Ahorrado en Costes' },
          { value: '24/7', label: 'Disponibilidad' },
          { value: '95%', label: 'Satisfacción' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border border-slate-800 text-center"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Audit Case Component
const AuditCase = ({ onBack }) => {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const analyzeWebsite = () => {
    if (!url) return;
    
    setAnalyzing(true);
    setProgress(0);
    setResults(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            setResults({
              seoScore: 78,
              loadTime: 2.3,
              mobileScore: 85,
              errors: [
                { type: 'error', message: 'Falta meta descripción en 3 páginas' },
                { type: 'warning', message: 'Imágenes sin atributo ALT: 12' },
                { type: 'error', message: 'Enlaces rotos detectados: 5' }
              ],
              recommendations: [
                'Optimizar imágenes (reducir 45% del peso)',
                'Implementar caché del navegador',
                'Añadir meta descripciones faltantes',
                'Mejorar velocidad de servidor (actualmente 1.2s)'
              ]
            });
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </button>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
          <Globe size={32} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Auditoría Web Instantánea</h2>
        <p className="text-slate-400 text-lg">
          Análisis completo de tu sitio web en menos de 30 segundos
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Introduce la URL de tu sitio web
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              disabled={analyzing}
            />
            <button
              onClick={analyzeWebsite}
              disabled={analyzing || !url}
              className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Analizar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {analyzing && (
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-slate-400">Analizando tu sitio web...</span>
              <span className="text-sm text-cyan-400 font-mono">{progress}%</span>
            </div>
            <ProgressBar value={progress} />
            <div className="mt-4 text-xs text-slate-500 space-y-1">
              <div className={progress > 20 ? 'text-emerald-400' : ''}>
                ✓ Analizando SEO y meta tags...
              </div>
              <div className={progress > 40 ? 'text-emerald-400' : ''}>
                ✓ Midiendo velocidad de carga...
              </div>
              <div className={progress > 60 ? 'text-emerald-400' : ''}>
                ✓ Verificando enlaces y errores...
              </div>
              <div className={progress > 80 ? 'text-emerald-400' : ''}>
                ✓ Generando recomendaciones...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Scores Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 text-center">
              <div className="mb-4 flex justify-center">
                <CircularProgress value={results.seoScore} />
              </div>
              <h3 className="font-semibold mb-1">Puntuación SEO</h3>
              <p className="text-sm text-slate-400">Necesita mejoras</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 text-center">
              <div className="mb-4 flex justify-center">
                <CircularProgress value={results.mobileScore} />
              </div>
              <h3 className="font-semibold mb-1">Optimización Móvil</h3>
              <p className="text-sm text-slate-400">Buena optimización</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {results.loadTime}s
              </div>
              <h3 className="font-semibold mb-1">Tiempo de Carga</h3>
              <p className="text-sm text-slate-400">Promedio: 3.5s</p>
            </div>
          </div>

          {/* Errors */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-rose-400" size={24} />
              Errores Encontrados
            </h3>
            <div className="space-y-3">
              {results.errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3"
                >
                  {error.type === 'error' ? (
                    <X size={20} className="text-rose-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-sm text-slate-300">{error.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={24} />
              Recomendaciones Prioritarias
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-500/30">
            <div className="flex items-start gap-4">
              <Zap size={32} className="text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Normalmente esto cuesta €200-500 y tarda días
                </h3>
                <p className="text-slate-300 mb-4">
                  Con nuestra automatización, lo tienes en 30 segundos. Imagina aplicar esto a todos tus clientes potenciales automáticamente.
                </p>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <Mail size={20} />
                  Recibir informe completo por email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Chatbot Case Component
const ChatbotCase = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [consultations, setConsultations] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setConsultations(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quickQuestions = [
    "¿Cuál es el horario?",
    "¿Cuánto cuesta?",
    "Quiero agendar una cita",
    "¿Tienen servicio a domicilio?"
  ];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      
      if (text.toLowerCase().includes('horario')) {
        response = 'Nuestro horario es de lunes a viernes de 9:00 a 18:00. ¿Te gustaría que te envíe un recordatorio antes de tu visita?';
      } else if (text.toLowerCase().includes('precio') || text.toLowerCase().includes('cuesta')) {
        response = 'Tenemos varios planes disponibles. ¿Te muestro nuestra tabla de precios?';
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            isTable: true,
            data: [
              { plan: 'Básico', price: '€299/mes', features: 'Chatbot + Email' },
              { plan: 'Pro', price: '€599/mes', features: 'Chatbot + Email + WhatsApp + CRM' },
              { plan: 'Enterprise', price: '€999/mes', features: 'Todo incluido + Personalización' }
            ]
          }]);
        }, 1500);
      } else if (text.toLowerCase().includes('cita') || text.toLowerCase().includes('agendar')) {
        response = '¡Perfecto! Voy a mostrarte nuestro calendario disponible.';
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'bot',
            isCalendar: true
          }]);
        }, 1500);
      } else {
        response = 'Entiendo. Déjame conectarte con un agente que pueda ayudarte mejor con eso. Mientras tanto, ¿hay algo más en lo que pueda asistirte?';
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
            <MessageSquare size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Chatbot de Atención 24/7</h2>
          <p className="text-slate-400 text-lg">
            Prueba una conversación real con nuestro asistente IA
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente iAgents</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/80">En línea</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index}>
                    {msg.isTable ? (
                      <div className="bg-slate-800 rounded-xl p-4 max-w-md">
                        <div className="space-y-3">
                          {msg.data.map((item, i) => (
                            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-cyan-400">{item.plan}</span>
                                <span className="text-emerald-400 font-bold">{item.price}</span>
                              </div>
                              <p className="text-sm text-slate-400">{item.features}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : msg.isCalendar ? (
                      <div className="bg-slate-800 rounded-xl p-4 max-w-md">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calendar size={18} className="text-violet-400" />
                          Horarios Disponibles
                        </h4>
                        <div className="space-y-2">
                          {['Lunes 15:00', 'Martes 10:30', 'Miércoles 16:00'].map((slot, i) => (
                            <button
                              key={i}
                              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                            : 'bg-slate-800 text-slate-100'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-slate-400 mb-2">Preguntas frecuentes:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="text-left text-sm bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors text-slate-300"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-slate-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Live Counter */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-violet-400" />
                Estadísticas en Vivo
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {consultations.toLocaleString()}
                </div>
                <p className="text-sm text-slate-400">Consultas atendidas este mes</p>
              </div>
              <div className="mt-6 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Tasa de respuesta</span>
                    <span className="text-emerald-400 font-semibold">98%</span>
                  </div>
                  <ProgressBar value={98} color="bg-emerald-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Satisfacción</span>
                    <span className="text-violet-400 font-semibold">4.8/5</span>
                  </div>
                  <ProgressBar value={96} color="bg-violet-500" />
                </div>
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
              <Zap size={24} className="text-emerald-400 mb-3" />
              <h3 className="font-bold mb-2">Ahorra €2,000-3,000/mes</h3>
              <p className="text-sm text-slate-300 mb-4">
                Un chatbot trabaja 24/7 sin descansos, vacaciones ni salarios. Atiende múltiples clientes simultáneamente.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={16} />
                  <span>Respuestas instantáneas</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={16} />
                  <span>Nunca pierde un lead</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check size={16} />
                  <span>Aprende de cada conversación</span>
                </div>
              </div>
            </div>

            {/* Integration Icons */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold mb-4">Integraciones Incluidas</h3>
              <div className="grid grid-cols-3 gap-3">
                {[Mail, Phone, Calendar, Smartphone, MessageSquare, BarChart3].map((Icon, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg p-3 flex items-center justify-center">
                    <Icon size={24} className="text-violet-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Funnel Case Component
const FunnelCase = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [processing, setProcessing] = useState(false);

  const steps = [
    { icon: Mail, title: 'Captura de Lead', color: 'from-emerald-500 to-teal-600' },
    { icon: Send, title: 'Email Automático', color: 'from-cyan-500 to-blue-600' },
    { icon: Phone, title: 'WhatsApp Enviado', color: 'from-violet-500 to-purple-600' },
    { icon: BarChart3, title: 'Añadido a CRM', color: 'from-pink-500 to-rose-600' },
    { icon: Clock, title: 'Seguimiento Programado', color: 'from-amber-500 to-orange-600' }
  ];

  const submitForm = () => {
    if (!formData.name || !formData.email) return;
    
    setProcessing(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setProcessing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
            <TrendingUp size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Funnel de Ventas Automatizado</h2>
          <p className="text-slate-400 text-lg">
            Observa cómo procesamos y nutrimos cada lead automáticamente
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 mb-6">
              <h3 className="text-xl font-bold mb-6">Paso 1: Captura de Lead</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Juan Pérez"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    disabled={processing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Ej: juan@empresa.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    disabled={processing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Ej: +34 600 000 000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    disabled={processing}
                  />
                </div>

                <button
                  onClick={submitForm}
                  disabled={processing || !formData.name || !formData.email}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar y Ver Magia
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Star size={20} className="text-emerald-400" />
                Estadísticas del Funnel
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">847</div>
                  <div className="text-sm text-slate-400">Leads este mes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-violet-400">34%</div>
                  <div className="text-sm text-slate-400">Tasa conversión</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">2.3min</div>
                  <div className="text-sm text-slate-400">Tiempo respuesta</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">€45K</div>
                  <div className="text-sm text-slate-400">Ventas generadas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Funnel Visualization */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep && processing;

              return (
                <div
                  key={index}
                  className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${
                    isActive
                      ? 'border-emerald-500/50 scale-105'
                      : 'border-slate-800 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${step.color} ${
                      isCurrent ? 'animate-pulse' : ''
                    }`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      {isActive && (
                        <div className="space-y-2">
                          {index === 0 && (
                            <p className="text-sm text-slate-400">
                              Lead capturado: {formData.name} ({formData.email})
                            </p>
                          )}
                          {index === 1 && (
                            <div className="bg-slate-800 rounded-lg p-3 text-sm">
                              <div className="font-semibold text-cyan-400 mb-1">Email de Bienvenida</div>
                              <p className="text-slate-400">
                                Hola {formData.name}, gracias por tu interés en automatizar tu negocio...
                              </p>
                            </div>
                          )}
                          {index === 2 && formData.phone && (
                            <div className="bg-slate-800 rounded-lg p-3 text-sm">
                              <div className="font-semibold text-violet-400 mb-1">WhatsApp Automático</div>
                              <p className="text-slate-400">
                                👋 Hola {formData.name}! Te hemos enviado información al email. ¿Tienes alguna pregunta?
                              </p>
                            </div>
                          )}
                          {index === 3 && (
                            <div className="bg-slate-800 rounded-lg p-3 text-sm space-y-1">
                              <div className="flex justify-between">
                                <span className="text-slate-400">Nombre:</span>
                                <span className="text-white">{formData.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Estado:</span>
                                <span className="text-emerald-400">Nuevo Lead</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400">Puntuación:</span>
                                <span className="text-amber-400">⭐⭐⭐</span>
                              </div>
                            </div>
                          )}
                          {index === 4 && (
                            <div className="bg-slate-800 rounded-lg p-3 text-sm">
                              <div className="flex items-center gap-2 text-amber-400">
                                <Clock size={16} />
                                <span>Seguimiento programado para mañana a las 10:00</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {isActive && (
                      <CheckCircle2 size={24} className="text-emerald-400" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Value Prop */}
            {currentStep >= steps.length - 1 && !processing && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Zap className="text-emerald-400" size={24} />
                  ¡Proceso Completado!
                </h3>
                <p className="text-slate-300 mb-4">
                  Todo esto sucedió automáticamente en segundos. Sin intervención humana, sin errores, disponible 24/7.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">3x Más Conversiones</div>
                  <p className="text-sm text-slate-400">
                    Los funnels automatizados convierten 3 veces más que procesos manuales
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Voice Case Component
const VoiceCase = ({ onBack }) => {
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [customText, setCustomText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceSamples = [
    {
      name: 'Mensaje de Bienvenida',
      text: 'Bienvenido a iAgents Digital, donde transformamos tu negocio con automatización inteligente.',
      duration: '0:08'
    },
    {
      name: 'Respuesta WhatsApp',
      text: 'Hola! Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en breve.',
      duration: '0:06'
    },
    {
      name: 'Locución Publicitaria',
      text: '¿Cansado de perder clientes por responder tarde? Con nuestro chatbot IA, nunca más perderás una oportunidad.',
      duration: '0:10'
    }
  ];

  const playAudio = (index) => {
    setSelectedVoice(index);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 mb-4">
            <Mic size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Clones de Voz e IA</h2>
          <p className="text-slate-400 text-lg">
            Contenido de audio profesional ilimitado sin contratar locutores
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Samples */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="text-xl font-bold mb-6">Ejemplos de Voz IA</h3>
              
              <div className="space-y-3">
                {voiceSamples.map((sample, index) => (
                  <div
                    key={index}
                    className={`bg-slate-800 rounded-xl p-4 border transition-all ${
                      selectedVoice === index
                        ? 'border-pink-500/50 shadow-lg shadow-pink-500/20'
                        : 'border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">{sample.name}</span>
                      <span className="text-sm text-slate-400">{sample.duration}</span>
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-3">{sample.text}</p>
                    
                    <button
                      onClick={() => playAudio(index)}
                      disabled={isPlaying && selectedVoice === index}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isPlaying && selectedVoice === index ? (
                        <>
                          <div className="flex gap-1">
                            <div className="w-1 h-4 bg-white rounded-full animate-pulse" />
                            <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-100" />
                            <div className="w-1 h-4 bg-white rounded-full animate-pulse delay-200" />
                          </div>
                          Reproduciendo...
                        </>
                      ) : (
                        <>
                          <Play size={18} />
                          Escuchar
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="font-bold mb-4">Comparativa de Costes</h3>
              
              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <X size={20} className="text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-400 mb-1">Locutor Tradicional</div>
                      <div className="text-sm text-slate-300 space-y-1">
                        <div>• €300-500 por locución</div>
                        <div>• 2-5 días de entrega</div>
                        <div>• Cambios cuestan extra</div>
                        <div>• Limitado a horarios</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-400 mb-1">Con IA (iAgents)</div>
                      <div className="text-sm text-slate-300 space-y-1">
                        <div>• €0 por locución adicional</div>
                        <div>• Instantáneo (segundos)</div>
                        <div>• Infinitas variaciones gratis</div>
                        <div>• 24/7 disponible</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Text Generator */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="text-xl font-bold mb-6">Genera Tu Propia Voz</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Escribe tu mensaje
                  </label>
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Ej: Hola, bienvenido a mi negocio. Estamos aquí para ayudarte con..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors h-32 resize-none"
                  />
                  <div className="text-sm text-slate-400 mt-1">
                    {customText.length} caracteres
                  </div>
                </div>

                <button
                  onClick={() => customText && playAudio(-1)}
                  disabled={!customText || isPlaying}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Mic size={20} />
                  Generar Audio con IA
                </button>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="font-bold mb-4">Casos de Uso</h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, text: 'Mensajes de voz WhatsApp' },
                  { icon: Mail, text: 'Locuciones para videos' },
                  { icon: MessageSquare, text: 'Respuestas automáticas' },
                  { icon: BarChart3, text: 'Podcasts y webinars' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                      <Icon size={18} className="text-pink-400" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Value Prop */}
            <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-500/30">
              <div className="flex items-start gap-4">
                <Zap size={32} className="text-pink-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Contenido Ilimitado
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Crea miles de variaciones sin coste adicional. Ideal para A/B testing, personalización masiva y contenido multiidioma.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-pink-400 mb-1">
                      ROI: 15x
                    </div>
                    <p className="text-sm text-slate-400">
                      Retorno promedio en el primer año
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'audit',
    clients: ''
  });
  const [roi, setRoi] = useState(0);

  const calculateROI = (clients) => {
    const numClients = parseInt(clients) || 0;
    // Simplified ROI calculation
    const monthlySavings = numClients * 150; // €150 saved per client per month
    const yearlySavings = monthlySavings * 12;
    return yearlySavings;
  };

  useEffect(() => {
    if (formData.clients) {
      setRoi(calculateROI(formData.clients));
    }
  }, [formData.clients]);

  const services = [
    { id: 'audit', name: 'Auditoría Web', price: '€299' },
    { id: 'chatbot', name: 'Chatbot 24/7', price: '€599/mes' },
    { id: 'funnel', name: 'Funnel Completo', price: '€899/mes' },
    { id: 'voice', name: 'Clone de Voz', price: '€399' },
    { id: 'bundle', name: 'Pack Completo', price: '€1,499/mes', discount: '25% OFF' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        Volver al inicio
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Automatizar tu Negocio</span>?
          </h2>
          <p className="text-slate-400 text-lg">
            Completa el formulario y recibe una propuesta personalizada en 24 horas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800">
            <h3 className="text-xl font-bold mb-6">Datos de Contacto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Servicio de Interés
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price} {service.discount || ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  ¿Cuántos clientes atiendes al mes?
                </label>
                <input
                  type="number"
                  value={formData.clients}
                  onChange={(e) => setFormData({...formData, clients: e.target.value})}
                  placeholder="Ej: 100"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 text-lg">
                <Send size={20} />
                Solicitar Propuesta Gratuita
              </button>
            </div>
          </div>

          {/* ROI Calculator & Pricing */}
          <div className="space-y-6">
            {/* ROI Calculator */}
            {roi > 0 && (
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-emerald-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="text-emerald-400" size={24} />
                  Tu ROI Estimado
                </h3>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                    €{roi.toLocaleString()}
                  </div>
                  <p className="text-slate-300">Ahorrado al año</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clientes/mes:</span>
                    <span className="text-white font-semibold">{formData.clients}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ahorro/cliente/mes:</span>
                    <span className="text-emerald-400 font-semibold">€150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inversión estimada:</span>
                    <span className="text-white font-semibold">€1,499/mes</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/30 flex justify-between">
                    <span className="text-slate-400">ROI:</span>
                    <span className="text-emerald-400 font-bold text-lg">
                      {((roi / 12 / 1499 - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Services Pricing */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <h3 className="font-bold mb-4">Servicios y Precios</h3>
              <div className="space-y-3">
                {services.map(service => (
                  <div
                    key={service.id}
                    className={`bg-slate-800/50 rounded-lg p-3 ${
                      service.id === 'bundle' ? 'border-2 border-violet-500/50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{service.name}</div>
                        {service.discount && (
                          <div className="text-xs text-violet-400 font-semibold">
                            {service.discount}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyan-400">{service.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Direct */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Phone className="text-emerald-400" size={20} />
                ¿Prefieres hablar directamente?
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Contáctanos por WhatsApp y resolvemos tus dudas al instante
              </p>
              <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                <Phone size={18} />
                Abrir WhatsApp
              </button>
            </div>

            {/* Guarantee */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 mb-3">
                  <CheckCircle2 className="text-cyan-400" size={32} />
                </div>
                <h3 className="font-bold mb-2">Garantía de Satisfacción</h3>
                <p className="text-sm text-slate-400">
                  Si no estás satisfecho en los primeros 30 días, te devolvemos el 100% de tu inversión
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAgentsDemo;
