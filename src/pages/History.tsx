import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';
import Navbar from '../components/Navbar';

type LoanStatus = 'validated' | 'pending' | 'rejected' | 'returned';

type LoanRequest = {
  id: string;
  equipmentName: string;
  type: 'consumable' | 'non-consumable';
  description: string;
  requestDate: string;
  quantity: number;
  status: LoanStatus;
};

const SAMPLE_LOANS: LoanRequest[] = [
  {
    id: '1',
    equipmentName: 'Ordinateur Portable',
    type: 'non-consumable',
    description: 'Pour maintenance serveur',
    requestDate: '2024-03-15 09:30',
    quantity: 1,
    status: 'validated',
  },
  {
    id: '2',
    equipmentName: 'Câbles réseau',
    type: 'consumable',
    description: 'Installation nouveau poste',
    requestDate: '2024-03-14 14:15',
    quantity: 5,
    status: 'pending',
  },
  {
    id: '3',
    equipmentName: 'Testeur réseau',
    type: 'non-consumable',
    description: 'Diagnostic connexion',
    requestDate: '2024-03-13 11:20',
    quantity: 1,
    status: 'returned',
  },
];

const StatusIcon = ({ status }: { status: LoanStatus }) => {
  switch (status) {
    case 'validated':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'rejected':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'returned':
      return <RotateCcw className="w-5 h-5 text-blue-500" />;
  }
};

const StatusBadge = ({ status }: { status: LoanStatus }) => {
  const styles = {
    validated: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
    returned: 'bg-blue-100 text-blue-800',
  };

  const labels = {
    validated: 'Validée',
    pending: 'En attente',
    rejected: 'Refusée',
    returned: 'Retournée',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <StatusIcon status={status} />
      <span className="ml-1">{labels[status]}</span>
    </span>
  );
};

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LoanStatus>('all');

  const filteredLoans = SAMPLE_LOANS.filter(loan => {
    const matchesSearch = loan.equipmentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Historique des Demandes de Prêt</h1>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un équipement..."
                className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="sm:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | LoanStatus)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="validated">Validées</option>
                  <option value="pending">En attente</option>
                  <option value="rejected">Refusées</option>
                  <option value="returned">Retournées</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Équipement
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de demande
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loan.equipmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.type === 'consumable' ? 'Consommable' : 'Non Consommable'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.requestDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <StatusBadge status={loan.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}