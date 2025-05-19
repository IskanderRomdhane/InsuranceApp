// src/components/Reclamations/ReclamationsTable.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, RefreshCw, Search, Filter } from 'lucide-react';
import { getStatusBadgeColor, getStatusInFrench, optionsStatut, optionsType } from './ReclamationDetailsProp';
import SelectFiltre from './SelectFilter';
import PaginationComponent from '../../../Components/PaginationComponent';
import { useReclamations } from './ReclamationFunctionAdmin';

const ReclamationsTable = () => {
  const {
    filteredReclamations,
    loading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    fetchReclamations,
  } = useReclamations();

  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentReclamations = filteredReclamations.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredReclamations.length / itemsPerPage);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Réclamations</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg w-full text-sm shadow-sm focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
              <SelectFiltre options={optionsStatut} value={statusFilter} onChange={setStatusFilter} icon={<Filter />} />
              <SelectFiltre options={optionsType} value={typeFilter} onChange={setTypeFilter} icon={<Filter />} />
              <button
                onClick={fetchReclamations}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg shadow-sm hover:bg-blue-700 flex items-center"
              >
                <RefreshCw className="mr-2 w-5 h-5" />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm mb-6">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : currentReclamations.length === 0 ? (
          <div className="text-center bg-white border border-gray-100 p-12 rounded-xl">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Aucune réclamation trouvée</h3>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              <div className="hidden md:grid grid-cols-12 px-6 py-2 text-sm font-semibold text-gray-500">
                <div className="col-span-5">Objet</div>
                <div className="col-span-3">Catégorie / Date</div>
                <div className="col-span-2">Statut</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              {currentReclamations.map((reclamation) => (
                <div
                  key={reclamation.id}
                  onClick={() => navigate(`/admin/reclamation/${reclamation.id}`)}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:bg-gray-50 cursor-pointer transition"
                >
                  {/* Desktop view */}
                  <div className="hidden md:grid grid-cols-12 items-center">
                    {/* Objet */}
                    <div className="col-span-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        {reclamation.description}
                      </h3>
                    </div>

                    {/* Catégorie / Date */}
                    <div className="col-span-3 text-sm text-gray-500">
                      {reclamation.type?.replace(/_/g, ' ')} <br />
                      {formatDate(reclamation.date)}
                    </div>

                    {/* Statut */}
                    <div className="col-span-2">
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(reclamation.status)}`}>
                        {getStatusInFrench(reclamation.status)}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="col-span-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/reclamation/${reclamation.id}`);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm"
                      >
                        Voir
                      </button>
                    </div>
                  </div>

                  {/* Mobile view */}
                  <div className="md:hidden flex justify-between items-start gap-3 flex-col">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-lg font-semibold text-gray-900">
                        #{reclamation.id} – {reclamation.fullName || 'Utilisateur inconnu'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(reclamation.status)}`}>
                        {getStatusInFrench(reclamation.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {reclamation.type?.replace(/_/g, ' ')} – {formatDate(reclamation.date)}
                    </p>
                    <div className="mt-2 flex justify-end w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/reclamation/${reclamation.id}`);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow-sm"
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <PaginationComponent
              totalPages={totalPages}
              pageCourante={currentPage}
              setPageCourante={setCurrentPage}
              setExpandedId={() => null}
              sinistres={filteredReclamations}
              premierIndex={firstIndex}
              dernierIndex={lastIndex}
            />

          </>
        )}
      </div>
    </div>
  );
};

export default ReclamationsTable;
