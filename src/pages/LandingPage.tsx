import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion des Prêts de Matériel Informatique
          </h1>
          <h2 className="text-xl text-gray-600">
            CHU Mohammed VI d'Oujda
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <button
            onClick={() => navigate('/user/login')}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4 group"
          >
            <Users className="w-16 h-16 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800">Espace Utilisateur</h3>
            <p className="text-gray-600 text-center">
              Pour les techniciens et ingénieurs informatiques
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/login')}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4 group"
          >
            <ShieldCheck className="w-16 h-16 text-green-600 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800">Espace Administrateur</h3>
            <p className="text-gray-600 text-center">
              Pour les gestionnaires du système
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}