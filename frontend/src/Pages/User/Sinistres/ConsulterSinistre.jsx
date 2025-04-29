import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve typeFiltre from location state on initial load
  useEffect(() => {
    if (location.state?.typeFiltre) {
      setTypeFiltre(location.state.typeFiltre);
    }
  }, [location.state]);

  const typeFiltreOptions = ["Tous", "Sante", "AutoMobile", "Habilitation"];
  const statutFiltreOptions = [
    "Tous",
    "PENDING",
    "UNDER_REVIEW",
    "ACCEPTED",
    "REJECTED",
  ];

  const voirDetail = (id) => navigate(`/sinistres/sinistre/${id}`);

  const statutCouleurs = {
    ACCEPTED: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
    },
    PENDING: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
    },
    REJECTED: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
    },
    UNDER_REVIEW: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
    },
  };

  useEffect(() => {
    const getSinistres = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:8081/api/sinistre/sinistres";

        if (typeFiltre !== "Tous") {
          url = `http://localhost:8081/api/sinistre/getsinistre/type/${typeFiltre}`;
        }

        if (statutFiltre !== "Tous" && typeFiltre === "Tous") {
          url = `http://localhost:8081/api/sinistre/getsinistre/statut/${statutFiltre}`;
        }

        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Échec de récupération des sinistres");
        let data = await response.json();

        if (statutFiltre !== "Tous" && typeFiltre !== "Tous") {
          data = data.filter((sinistre) => sinistre.etat === statutFiltre);
        }

        setSinistres(data);
        setPageCourante(1);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSinistres([]);
      } finally {
        setLoading(false);
      }
    };

    getSinistres();
  }, [typeFiltre, statutFiltre]);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowTypeMenu(false);
      setShowStatutMenu(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const dernierIndex = pageCourante * sinistreParPage;
  const premierIndex = dernierIndex - sinistreParPage;
  const sinistresCourants = sinistres.slice(premierIndex, dernierIndex);
  const totalPages = Math.ceil(sinistres.length / sinistreParPage);

  const allerPage = (numero) => {
    if (numero > 0 && numero <= totalPages) {
      setPageCourante(numero);
      setExpandedId(null);
    }
  };

  const BadgeStatut = ({ status }) => {
    const couleur = statutCouleurs[status] || {
      bg: "bg-gray-200",
      text: "text-gray-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${couleur.bg} ${couleur.text}`}
      >
        {status?.replace("_", " ")}
      </span>
    );
  };

  const ChampInfo = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );

  const afficherDetails = (sinistre) => (
    <div className="p-4 rounded-b-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">
            Détails du sinistre
          </h4>
          <div className="mt-3 space-y-3">
            <ChampInfo label="ID Sinistre" value={sinistre.id} />
            <ChampInfo
              label="Date"
              value={new Date(sinistre.date).toLocaleDateString()}
            />
            <div>
              <p className="text-xs text-gray-500">Statut</p>
              <BadgeStatut status={sinistre.etat} />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Description</h4>
          <p className="mt-1 text-sm">{sinistre.descriptionSinistre}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-[#476f66] text-white text-sm font-medium rounded-md hover:bg-[#3e6159]"
          onClick={() => voirDetail(sinistre.id)}
        >
          Voir détails
        </button>
      </div>
    </div>
  );

  const MenuFiltre = ({
    label,
    options,
    optionActive,
    setOptionActive,
    isOpen,
    setIsOpen,
  }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    const selectOption = (e, option) => {
      e.stopPropagation();
      setOptionActive(option);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className="flex items-center justify-between w-40 px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        >
          <span>
            {label}: {optionActive}
          </span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  optionActive === option ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={(e) => selectOption(e, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxPages = 5;

    let debut = Math.max(1, pageCourante - Math.floor(maxPages / 2));
    let fin = Math.min(totalPages, debut + maxPages - 1);

    if (fin - debut + 1 < maxPages) {
      debut = Math.max(1, fin - maxPages + 1);
    }

    for (let i = debut; i <= fin; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button
          onClick={() => allerPage(pageCourante - 1)}
          disabled={pageCourante === 1}
          className={`p-2 rounded-md ${
            pageCourante === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {debut > 1 && (
          <>
            <button
              onClick={() => allerPage(1)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              1
            </button>
            {debut > 2 && <span className="px-1">...</span>}
          </>
        )}

        {pages.map((num) => (
          <button
            key={num}
            onClick={() => allerPage(num)}
            className={`px-3 py-1 rounded-md ${
              pageCourante === num
                ? "bg-[#476f66] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        {fin < totalPages && (
          <>
            {fin < totalPages - 1 && <span className="px-1">...</span>}
            <button
              onClick={() => allerPage(totalPages)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => allerPage(pageCourante + 1)}
          disabled={pageCourante === totalPages}
          className={`p-2 rounded-md ${
            pageCourante === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

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
              const borderColor =
                statutCouleurs[sinistre.etat]?.border || "border-gray-200";

              return (
                <div
                  key={sinistre.id}
                  className={`border ${borderColor} overflow-hidden rounded-md`}
                >
                  <div
                    className={`grid grid-cols-4 items-center p-4 cursor-pointer transition-colors ${
                      isExpanded
                        ? "bg-[#476f66] text-white hover:bg-[#3e6159]"
                        : "bg-white text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : sinistre.id)
                    }
                  >
                    <div className="flex items-center">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 mr-2" />
                      ) : (
                        <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
                      )}
                      <div>
                        <h3 className="font-medium">
                          {sinistre.objectSinistre}
                        </h3>
                        <p
                          className={`text-sm ${
                            isExpanded ? "text-gray-200" : "text-gray-500"
                          }`}
                        >
                          {sinistre.sinistre_type || sinistre.categorie}{" "}
                          sinistre
                        </p>
                      </div>
                    </div>
                    <div className="text-sm">
                      {sinistre.sinistre_type || sinistre.categorie}
                    </div>
                    <div className="text-sm">
                      <BadgeStatut status={sinistre.etat} />
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {sinistre.amount?.toFixed(2) || "0.00"} TND
                      </p>
                    </div>
                  </div>
                  {isExpanded && afficherDetails(sinistre)}
                </div>
              );
            })}
          </div>

          <Pagination />

          <div className="mt-4 text-sm text-gray-500 text-center">
            {premierIndex + 1}-{Math.min(dernierIndex, sinistres.length)} de{" "}
            {sinistres.length} Sinistres
          </div>
        </>
      )}
    </div>
  );
}
