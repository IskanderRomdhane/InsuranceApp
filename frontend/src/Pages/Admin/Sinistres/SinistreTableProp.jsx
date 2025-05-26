import { Car, Home, Heart } from 'lucide-react'

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

export const StatusIndicator = ({ status }) => {
    const statusConfig = {
      "APPROUVE": {
        color: "bg-green-500",
        label: "Approuvé"
      },
      "SOUMIS": {
        color: "bg-yellow-500",
        label: "Soumis"
      },
      "REJETE": {
        color: "bg-red-500",
        label: "Rejeté"
      },
      "EN_EXAMEN": {
        color: "bg-blue-500",
        label: "En Examen"
      },
      "PAYE":{
        color: "bg-blue-500",
        label: "Payé"
      },
      "INFOS_COMPLEMENTAIRES_REQUISES":{
        color: "bg-red-500",
        label: "Infos Complementaires Requises"
      }
    };
    
    const config = statusConfig[status] || { color: "bg-gray-500", label: status?.replace("_", " ") || "Unknown" };
    
    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };


export const cardLayoutStyles = {
    actionColumn: "w-full md:w-auto flex items-center justify-between",
    statusColumnWidth: "w-32",
    amountColumnWidth: "w-36"
  };

export const Categorie = ({ claim }) => {
  switch(claim.categorie) {
    case 'Habilitation': 
      return (
        <div className="col-span-2">
          
           <span className=" px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Home className="h-4 w-4 text-red-600" />
            {claim.sinistre_type || claim.categorie}
          </span>
        </div>
      );
    case 'AutoMobile':
      return (
        <div className="col-span-2">
          <span className=" px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Car className="h-4 w-4 text-sky-500" />
            {claim.sinistre_type || claim.categorie}
          </span>
        </div>
      );
    case 'Sante':
      return (
        <div className="col-span-2">
          <span className=" px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Heart className="h-4 w-4 text-green-600" />
            {claim.sinistre_type || claim.categorie}
          </span>
        </div>
      );
    default:
      return (
        <div className="col-span-2">
          <span className=" px-3 py-1 rounded-full text-sm">
            {claim.sinistre_type || claim.categorie}
          </span>
        </div>
      );
  }
};