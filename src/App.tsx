import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Moon, Sun, Send, CheckCircle, ArrowLeft, MessageSquare, Clock, Trash2, Instagram, Facebook, Phone } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState<{
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
  }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState('');
  const [loading, setLoading] = useState(false);

  // Charger les messages depuis Firestore au démarrage
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const messagesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as {
          id: string;
          name: string;
          email: string;
          message: string;
          date: string;
        }[];
        setMessages(messagesList);
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Sauvegarder les messages dans localStorage quand ils changent
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('contactMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('section-fade-in');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Update localStorage and apply dark mode to document when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Mettre à jour la meta tag theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    // Couleur en fonction du mode sombre/clair
    metaThemeColor.setAttribute('content', darkMode ? '#111827' : '#f9fafb');
  }, [darkMode]);

  const skills = [
    { name: 'HTML', level: 95, color: '#E34F26' },
    { name: 'CSS', level: 90, color: '#264DE4' },
    { name: 'Bootstrap', level: 85, color: '#7952B3' },
    { name: 'PHP', level: 80, color: '#777BB4' },
    { name: 'JavaScript', level: 85, color: '#F7DF1E' },
    { name: 'React', level: 85, color: '#61DAFB' },
    { name: 'Laravel', level: 80, color: '#FF2D20' },
    { name: 'Node.js', level: 80, color: '#339933' },
    { name: 'Python', level: 75, color: '#3776AB' }
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Une plateforme e-commerce moderne avec panier d\'achat et paiement intégré',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Manager Pro',
      description: 'Application de gestion de tâches avec fonctionnalités avancées',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Blog Personnel',
      description: 'Blog moderne avec système de gestion de contenu personnalisé',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
      tech: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
      github: '#',
      demo: '#'
    }
  ];

  const education = [
    {
      degree: 'Bac+2 Développement Digital',
      school: 'OFPPT',
      period: '2023 - 2025',
      description: 'Formation en développement web full stack, avec focus sur les technologies modernes et les meilleures pratiques du développement web.'
    },
    {
      degree: 'Baccalauréat Sciences Physiques, option (Français)',
      school: 'Madariss IBN SINA, OUJDA(MAROC)',
      period: '2022 - 2023',
      description: 'Formation scientifique avec excellence en sciences physiques et français.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString()
    };

    try {
      setLoading(true);
      // Ajouter le message à Firestore
      const docRef = await addDoc(collection(db, 'messages'), newMessage);
      
      // Mettre à jour l'état local avec l'ID généré par Firestore
      setMessages(prev => [{
        ...newMessage,
        id: docRef.id
      }, ...prev]);
      
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteMessage = async (id: string) => {
    try {
      setLoading(true);
      // Supprimer le message de Firestore
      await deleteDoc(doc(db, 'messages', id));
      // Mettre à jour l'état local
      setMessages(prev => prev.filter(message => message.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
      alert("Une erreur est survenue lors de la suppression du message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (showAdmin) {
    return (
      <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm overflow-y-auto`}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl font-bold">Messages ({messages.length})</h1>
              </div>
              <div className="flex items-center gap-3">
                {messages.length > 0 && (
                  <button
                    onClick={async () => {
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les messages?')) {
                        try {
                          setLoading(true);
                          // Supprimer tous les messages un par un
                          const deletePromises = messages.map(message => 
                            deleteDoc(doc(db, 'messages', message.id))
                          );
                          await Promise.all(deletePromises);
                          setMessages([]);
                        } catch (error) {
                          console.error("Erreur lors de la suppression des messages:", error);
                          alert("Une erreur est survenue lors de la suppression des messages.");
                        } finally {
                          setLoading(false);
                        }
                      }
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" /> Tout supprimer
                  </button>
                )}
                <button
                  onClick={() => setShowAdmin(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Chargement...</p>
                </div>
              )}
              
              {!loading && messages.length === 0 ? (
                <div className={`p-8 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg">Aucun message pour le moment</p>
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{message.name}</h3>
                        <p className="text-blue-600">{message.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{new Date(message.date).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-all"
                          disabled={loading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation fixe avec effet de flou */}
      <nav className={`fixed w-full top-0 z-50 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md shadow-lg transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">BA.</a>
            
            {/* Menu mobile */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} hover:scale-110 transition-all duration-300 hover:shadow-lg`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className={`hover:text-blue-500 transition-all duration-300 ${activeSection === 'home' ? 'text-blue-500 font-medium' : ''}`}>Accueil</a>
              <a href="#skills" className={`hover:text-blue-500 transition-all duration-300 ${activeSection === 'skills' ? 'text-blue-500 font-medium' : ''}`}>Compétences</a>
              <a href="#projects" className={`hover:text-blue-500 transition-all duration-300 ${activeSection === 'projects' ? 'text-blue-500 font-medium' : ''}`}>Projets</a>
              <a href="#education" className={`hover:text-blue-500 transition-all duration-300 ${activeSection === 'education' ? 'text-blue-500 font-medium' : ''}`}>Formation</a>
              <a href="#contact" className={`hover:text-blue-500 transition-all duration-300 ${activeSection === 'contact' ? 'text-blue-500 font-medium' : ''}`}>Contact</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} hover:scale-110 transition-all duration-300 hover:shadow-lg`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section avec animation de gradient */}
      <section id="home" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 animate-gradient"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8 animate-float">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <img
                src="./profile.jpg"
                alt="Boulerhcha Abderrahmane"
                className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-lg hover:scale-105 transition-transform relative z-10 object-cover"
              />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient px-4 [max-width:360px]:text-3xl">
              Boulerhcha Abderrahmane
            </h1>
            <p className="text-xl mb-4 text-blue-500">Développeur Full Stack</p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 px-4">
              Passionné par la création d'applications web modernes et innovantes, 
              spécialisé dans les technologies React, Node.js et TypeScript.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/boulerhcha-abderrahmane-80b95a33a/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full hover:scale-110 transform duration-200 shadow-lg"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://github.com/boulerhcha-abderrahmane" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:scale-110 transform duration-200 shadow-lg"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Compétences */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Compétences
          </h2>
          <div className="max-w-3xl mx-auto grid gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="group hover:scale-105 transition-all duration-300">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out group-hover:shadow-lg"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}40`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets avec effet de carte */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Mes Projets
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="relative group h-48">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                    <div className="flex gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transition-all duration-300"
                    >
                      Voir projet
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-gray-800 to-black text-white hover:shadow-lg transition-all duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Formation avec timeline */}
      <section id="education" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Formation
          </h2>
          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative pl-8 pb-8 border-l-2 hover:scale-102 transition-transform ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } ${index === education.length - 1 ? 'border-l-0' : ''}`}
              >
                <div
                  className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    darkMode ? 'bg-blue-500' : 'bg-blue-600'
                  } shadow-lg`}
                ></div>
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.school}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.period}</p>
                  <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact avec effet de carte en verre */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Contact
          </h2>
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                  required
                  className={`w-full px-4 py-3 rounded-lg ${
                    darkMode
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-300'
                  } border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400`}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Votre email"
                  required
                  className={`w-full px-4 py-3 rounded-lg ${
                    darkMode
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-300'
                  } border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400`}
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Votre message"
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg ${
                    darkMode
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white/50 border-gray-300'
                  } border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-102 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer
              </button>
            </form>
          ) : (
            <div className={`max-w-lg mx-auto text-center p-8 rounded-lg backdrop-blur-sm ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} shadow-lg animate-float`}>
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-green-500/20">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Message Envoyé !</h3>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour au formulaire
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer avec effet de verre */}
      <footer className={`py-8 backdrop-blur-sm ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 Boulerhcha Abderrahmane. Tous droits réservés.</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/boulerhcha-abderrahmane-80b95a33a/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors hover:scale-110 transform duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/boulerhcha-abderrahmane" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors hover:scale-110 transform duration-200">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/boulerhcha_abderrahmane?igsh=OXZhdjQ2MGc2anVt&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors hover:scale-110 transform duration-200">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/share/165YPQqRuE/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/+2120766662217" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors hover:scale-110 transform duration-200">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;