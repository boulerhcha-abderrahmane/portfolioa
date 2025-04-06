import React, { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, Moon, Sun, Send, CheckCircle, ArrowLeft, ExternalLink, MessageSquare, Trash2, Clock } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState<{
    id: string;
    name: string;
    email: string;
    message: string;
    date: Date;
  }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState('');

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

  // Simuler la réception de messages toutes les 30 secondes
  useEffect(() => {
    if (showAdmin) {
      const interval = setInterval(() => {
        const newMessage = {
          id: Math.random().toString(36).substr(2, 9),
          name: `Visiteur ${Math.floor(Math.random() * 100)}`,
          email: `visiteur${Math.floor(Math.random() * 100)}@example.com`,
          message: `Message test ${Math.floor(Math.random() * 100)}`,
          date: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [showAdmin]);

  const skills = [
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'PHP', level: 70 },
    { name: 'MySQL', level: 65 },
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Une plateforme e-commerce responsive avec panier d\'achat',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Task Manager',
      description: 'Application de gestion de tâches avec React',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    },
    {
      title: 'Blog Personnel',
      description: 'Blog moderne avec système de gestion de contenu',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
      github: '#',
      demo: '#'
    }
  ];

  const education = [
    {
      degree: 'Bac+2 Développement Digital',
      school: 'OFPPT',
      period: '2023 - Present'
    },
    {
      degree: 'Baccalauréat Sciences',
      school: 'Lycée Mohammed V',
      period: '2022'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      date: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setFormSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Activer la page admin avec Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (showAdmin) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Messages ({messages.length})</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAdmin(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all-smooth"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au site
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} hover:scale-110 transition-transform`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {messages.length === 0 ? (
              <div className={`p-8 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Aucun message pour le moment</p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} hover-scale`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{message.name}</h3>
                      <p className="text-blue-600">{message.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatDate(message.date)}</span>
                      </div>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-all-smooth"
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
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation fixe */}
      <nav className={`fixed w-full top-0 z-50 ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold">MA.</a>
          <div className="flex items-center gap-6">
            <a href="#about" className={`hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'text-blue-600' : ''}`}>À propos</a>
            <a href="#projects" className={`hover:text-blue-600 transition-colors ${activeSection === 'projects' ? 'text-blue-600' : ''}`}>Projets</a>
            <a href="#education" className={`hover:text-blue-600 transition-colors ${activeSection === 'education' ? 'text-blue-600' : ''}`}>Formation</a>
            <a href="#contact" className={`hover:text-blue-600 transition-colors ${activeSection === 'contact' ? 'text-blue-600' : ''}`}>Contact</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} hover:scale-110 transition-transform`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 animate-float">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-lg hover:scale-105 transition-transform"
            />
            <h1 className="text-5xl font-bold mb-4">Mohammed Alami</h1>
            <p className="text-xl mb-4 text-blue-600">Étudiant en Développement Digital</p>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Passionné par la création d'expériences web innovantes et la résolution de problèmes complexes
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#" 
                className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors hover:scale-110 transform duration-200"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-900 transition-colors hover:scale-110 transform duration-200"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a 
                href="#" 
                className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition-colors hover:scale-110 transform duration-200"
              >
                <FileText className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">À Propos</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-12 text-center leading-relaxed">
              Étudiant passionné en deuxième année de développement digital, je combine créativité et expertise technique
              pour créer des solutions web innovantes. Mon objectif est de devenir un développeur full-stack capable de
              transformer des idées en applications web performantes et élégantes.
            </p>
            <div className="grid gap-8">
              {skills.map((skill) => (
                <div key={skill.name} className="hover-scale">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full rounded-full bg-blue-600 skill-bar"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Mes Projets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden shadow-lg hover-scale ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="relative group">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="flex-1 text-center py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all-smooth"
                    >
                      Voir projet
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 text-center py-2 rounded bg-gray-800 text-white hover:bg-gray-900 transition-all-smooth"
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

      {/* Formation */}
      <section id="education" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Formation</h2>
          <div className="max-w-2xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative pl-8 pb-8 border-l-2 hover-scale ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } ${index === education.length - 1 ? 'border-l-0' : ''}`}
              >
                <div
                  className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                ></div>
                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-gray-500 dark:text-gray-400">{edu.school}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact</h2>
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
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-smooth hover:border-blue-400`}
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
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-smooth hover:border-blue-400`}
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
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-300'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-smooth hover:border-blue-400`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all-smooth hover:scale-102 transform flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Envoyer
              </button>
            </form>
          ) : (
            <div className={`max-w-lg mx-auto text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg animate-float`}>
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Message Envoyé !</h3>
              <p className="text-lg mb-8">
                Merci {formData.name} ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all-smooth hover:scale-105 transform"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour au formulaire
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Mohammed Alami. Tous droits réservés.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors hover:scale-110 transform duration-200">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;