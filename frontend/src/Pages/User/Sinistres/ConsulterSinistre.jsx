import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {FetchSinistres} from './SinistresFunction'

import statutCouleurs from './statutCouleurs'
import MenuFiltre from "../../../Components/SinistresTablePage/MenuFiltre";
import PaginationComponent from "../../../Components/PaginationComponent";
import SinistreFields from "../../../Components/SinistresTablePage/SinistreFields";

export default function SinistresPage() {
  const [sinistres, setSinistres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const [typeFiltre, setTypeFiltre] = useState("Tous");
  const [statutFiltre, setStatutFiltre] = useState("Tous");
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showStatutMenu, setShowStatutMenu] = useState(false);

  const [pageCourante, setPageCourante] = useState(1);
  const [sinistreParPage] = useState(10);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.typeFiltre) {
      setTypeFiltre(location.state.typeFiltre);
    }
  }, [location.state]);

  const typeFiltreOptions = ["Tous", "Sante", "AutoMobile", "Habilitation"];
  const statutFiltreOptions = ["Tous","PENDING","UNDER_REVIEW","ACCEPTED","REJECTED"];

  useEffect(() => {
    const FetchData = async () => {
          try {
            setLoading(true);
            const data = await FetchSinistres(typeFiltre ,statutFiltre);
            console.log('Fetched data:', data);
            setSinistres(data);
          } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        FetchData();
  }, [typeFiltre, statutFiltre]);

  const dernierIndex = pageCourante * sinistreParPage;
  const premierIndex = dernierIndex - sinistreParPage;
  const sinistresCourants = sinistres.slice(premierIndex, dernierIndex);
  const totalPages = Math.ceil(sinistres.length / sinistreParPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Sinistres</h1>
        <div className="flex items-center space-x-4">
          <MenuFiltre
            label="Type"
            options={typeFiltreOptions}
            optionActive={typeFiltre}
            setOptionActive={setTypeFiltre}
            isOpen={showTypeMenu}
            setIsOpen={(val) => {
              setShowTypeMenu(val);
              if (val) setShowStatutMenu(false);
            }}
          />

          <MenuFiltre
            label="Statut"
            options={statutFiltreOptions}
            optionActive={statutFiltre}
            setOptionActive={setStatutFiltre}
            isOpen={showStatutMenu}
            setIsOpen={(val) => {
              setShowStatutMenu(val);
              if (val) setShowTypeMenu(false);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="text-sm font-medium text-gray-500">Objet</div>
        <div className="text-sm font-medium text-gray-500">Catégorie</div>
        <div className="text-sm font-medium text-gray-500">Statut</div>
        <div className="text-sm font-medium text-gray-500 text-right">
          Montant
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#476f66]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium">Erreur de chargement</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : sinistres.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Aucun sinistre trouvé pour les filtres sélectionnés.
          </p>
        </div>
      ) : (
       <>
  <div className="space-y-2">
    {sinistresCourants.map((sinistre) => {
      const isExpanded = expandedId === sinistre.id;
      const borderColor = statutCouleurs[sinistre.etat]?.border || "border-gray-200";

      return (
        <SinistreFields 
          key={sinistre.id}
          sinistre={sinistre}
          isExpanded={isExpanded}
          borderColor={borderColor}
          onExpandToggle={() => setExpandedId(isExpanded ? null : sinistre.id)}
        />
      );
    })}
  </div>

  <PaginationComponent 
    totalPages={totalPages}
    pageCourante={pageCourante}
    setPageCourante={setPageCourante}
    setExpandedId={setExpandedId}
    sinistres={sinistres}
    premierIndex={premierIndex}
    dernierIndex={dernierIndex}
  />
</>
      )}
    </div>
  );
}