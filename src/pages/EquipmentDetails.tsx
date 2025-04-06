import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

type Equipment = {
  id: string;
  name: string;
  type: 'consumable' | 'non-consumable';
  quantity: number;
  description: string;
  location: string;
  image: string;
};

const SAMPLE_EQUIPMENT: Equipment = {
  id: '1',
  name: 'Ordinateur Portable',
  type: 'non-consumable',
  quantity: 5,
  description: 'Ordinateur portable HP EliteBook avec processeur Intel i7, 16GB RAM, 512GB SSD',
  location: 'Salle 102, Service Informatique',
  image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400',
};

export default function EquipmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle loan request
    alert('Demande de prêt soumise avec succès!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </button>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2">
                <img
                  className="h-full w-full object-cover md:w-full"
                  src={SAMPLE_EQUIPMENT.image}
                  alt={SAMPLE_EQUIPMENT.name}
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  {SAMPLE_EQUIPMENT.type === 'consumable' ? 'Consommable' : 'Non Consommable'}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">{SAMPLE_EQUIPMENT.name}</h1>
                
                <div className="mt-4">
                  <h2 className="text-gray-700 font-medium">Description</h2>
                  <p className="mt-2 text-gray-600">{SAMPLE_EQUIPMENT.description}</p>
                </div>

                <div className="mt-4">
                  <h2 className="text-gray-700 font-medium">Emplacement</h2>
                  <p className="mt-2 text-gray-600">{SAMPLE_EQUIPMENT.location}</p>
                </div>

                <div className="mt-4">
                  <h2 className="text-gray-700 font-medium">Quantité disponible</h2>
                  <p className="mt-2 text-gray-600">{SAMPLE_EQUIPMENT.quantity} unités</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantité souhaitée
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={SAMPLE_EQUIPMENT.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Règles de Retour
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <ul className="list-disc list-inside">
                            {SAMPLE_EQUIPMENT.type === 'consumable' ? (
                              <li>Le retour pour les matériels consommables n'est pas obligatoire.</li>
                            ) : (
                              <li>Les matériels non consommables doivent être retournés le même jour.</li>
                            )}
                            <li>Si le retour n'est pas effectué à la date prévue, la demande de prêt est suspendue.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Demander un prêt
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}