import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function AdminAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Connexion Administrateur</h2>
          <p className="mt-2 text-gray-600">Accédez à votre espace de gestion</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="mt-1 relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-green-500 transition-colors duration-200" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 focus:placeholder-gray-400 hover:border-green-300"
                  placeholder="admin@chu-oujda.ma"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="mt-1 relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-green-500 transition-colors duration-200" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 focus:placeholder-gray-400 hover:border-green-300"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <Link 
              to="/admin/forgot-password" 
              className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}