import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Eye } from 'lucide-react';
import PaginationComponent from '../../../Components/PaginationComponent';
import { useSinistres } from './useSinistreApi';
import { formatDate, StatusIndicator, cardLayoutStyles } from './SinistreTableProp';
import SinistreFilterDropdown from './SinistreFilterDropdown';

export default function SinistresTable() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const claimsPerPage = 10;

  const { claims, loading, error } = useSinistres(activeFilter);
  const navigate = useNavigate();

  const viewDetails = (e, id) => {
    e.stopPropagation();
    navigate(`/admin/sinistre/details/${id}`);
  };

  const firstIndex = (currentPage - 1) * claimsPerPage;
  const lastIndex = currentPage * claimsPerPage;
  const currentClaims = claims.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Users Sinistres</h1>

        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
    <h2 className="text-lg font-semibold text-gray-800">Type de Sinistre :</h2>

    <div className="w-full md:w-auto">
      <SinistreFilterDropdown
        activeFilter={activeFilter}
        setActiveFilter={(filter) => {
          setActiveFilter(filter);
          setCurrentPage(1);
        }}
      />
    </div>
  </div>
</div>


        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-16 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#476f66] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl shadow-sm">
            <h3 className="font-medium text-lg">Erreur</h3>
            <p className="mt-2">{error}</p>
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <FileText className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-700 mb-3">Aucune réclamation trouvée</h3>
          </div>
        ) : (
            <div className="space-y-6">
              <div className="hidden md:grid grid-cols-12 items-center px-6 text-sm font-semibold text-gray-500">
                <div className="col-span-4">Objet</div>
                <div className="col-span-2">Catégorie</div>
                <div className="col-span-2">Statut</div>
                <div className="col-span-2">Montant</div>
                <div className="col-span-2 text-right pr-6">Action</div>
              </div>

              {currentClaims.map((claim) => (
                <div
                  key={claim.id}
                  onClick={() => {}}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="hidden md:grid grid-cols-12 items-center">
                    {/* Objet */}
                    <div className="col-span-4">
                      <h3 className="font-semibold text-gray-800">{claim.objectSinistre}</h3>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(claim.date)}</span>
                      </div>
                    </div>

                    {/* Catégorie */}
                    <div className="col-span-2">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {claim.sinistre_type || claim.categorie}
                      </span>
                    </div>

                    {/* Statut */}
                    <div className="col-span-2">
                      <StatusIndicator status={claim.etat} />
                    </div>

                    {/* Montant */}
                    <div className="col-span-2 text-[#476f66] font-bold">
                      {claim.amount?.toFixed(2) || '000'} TND
                    </div>

                    {/* Action */}
                    <div className="col-span-2 text-right">
                      <button
                        onClick={(e) => viewDetails(e, claim.id)}
                        className="bg-[#476f66] hover:bg-[#3a5c54] text-white text-sm px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Voir</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile view (unchanged) */}
                  <div className="md:hidden flex flex-col gap-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg text-gray-800">{claim.objectSinistre}</h3>
                      <StatusIndicator status={claim.etat} />
                    </div>
                    <div className="text-sm text-gray-500 flex gap-3">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{claim.sinistre_type || claim.categorie}</span>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(claim.date)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-[#476f66] font-bold text-lg">
                        {claim.amount?.toFixed(2) || '000'} TND
                      </div>
                      <button
                        onClick={(e) => viewDetails(e, claim.id)}
                        className="bg-[#476f66] hover:bg-[#3a5c54] text-white text-sm px-4 py-2 rounded-lg shadow-sm inline-flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Voir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}


            <PaginationComponent
              totalPages={totalPages}
              pageCourante={currentPage}
              setPageCourante={setCurrentPage}
              setExpandedId={() => null}
              sinistres={claims}
              premierIndex={firstIndex}
              dernierIndex={lastIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
