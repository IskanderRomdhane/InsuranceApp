import { AlertCircle, Clock3, XCircle, CheckCircle} from "lucide-react";
export const getStatusStyle = (status) => {
    const styles = {
      EN_ATTENTE: { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
      EN_COURS: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
      ANNULEE: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
      TERMINEE: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
    };
    return styles[status] || styles["EN_ATTENTE"];
  };
export const formatDate = (dateString) => {
    if (!dateString) return "Non disponible";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

export const getStatusIcon = (status) => {
    switch (status) {
      case "EN_ATTENTE": return <Clock3 className="w-5 h-5" />;
      case "EN_COURS": return <AlertCircle className="w-5 h-5" />;
      case "ANNULEE": return <XCircle className="w-5 h-5" />;
      case "TERMINEE": return <CheckCircle className="w-5 h-5" />;
      default: return <Clock3 className="w-5 h-5" />;
    }
  };


export const optionsStatut = [
    { value: 'ALL', label: 'Tous les statuts' },
    { value: 'PENDING', label: 'En attente' },
    { value: 'UNDER_REVIEW', label: 'En cours d\'examen' },
    { value: 'CANCELLED', label: 'Annulée' },
    { value: 'FINISHED', label: 'Terminée' }
  ];
  
export const optionsType = [
    { value: 'ALL', label: 'Tous les types' },
    { value: 'SERVICE_DELAY', label: 'Retard de service' },
    { value: 'ACCOUNT_ACCESS', label: 'Accès au compte' },
    { value: 'UNRESOLVED_ISSUE', label: 'Problème non résolu' },
    { value: 'POOR_SUPPORT', label: 'Support insuffisant' }
  ];

export const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500 text-white border-yellow-200';
      case 'UNDER_REVIEW': return 'bg-blue-500 text-white border-blue-200';
      case 'CANCELLED': return 'bg-red-500 text-white border-red-200';
      case 'FINISHED': return 'bg-green-500 text-white border-green-200';
      default: return 'bg-gray-100 text-white border-gray-200';
    }
  };

export const getStatusInFrench = (status) => {
    switch (status) {
      case 'PENDING': return 'EN ATTENTE';
      case 'UNDER_REVIEW': return 'EN COURS D\'EXAMEN';
      case 'CANCELLED': return 'ANNULÉE';
      case 'FINISHED': return 'TERMINÉE';
      default: return status;
    }
  };