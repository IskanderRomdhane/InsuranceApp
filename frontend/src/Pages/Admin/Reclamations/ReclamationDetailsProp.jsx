import { Clock3, AlertCircle, XCircle, CheckCircle } from "lucide-react";

/** Same name, now matches claim style */
export const getStatusStyle = (status) => {
  const styles = {
    PENDING: { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    UNDER_REVIEW: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    CANCELLED: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    FINISHED: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  };
  return styles[status] || { text: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
};

/** Format date like claim prop */
export const formatDate = (dateString) => {
  if (!dateString) return "Non disponible";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/** Use same icons and colors like claims */
export const getStatusIcon = (status) => {
  switch (status) {
    case "PENDING":
      return <Clock3 className="w-5 h-5 text-yellow-500" />;
    case "UNDER_REVIEW":
      return <AlertCircle className="w-5 h-5 text-blue-500" />;
    case "CANCELLED":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "FINISHED":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <Clock3 className="w-5 h-5 text-gray-500" />;
  }
};

/** Filtering status options */
export const optionsStatut = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "PENDING", label: "En attente" },
  { value: "UNDER_REVIEW", label: "En cours d'examen" },
  { value: "CANCELLED", label: "Annulée" },
  { value: "FINISHED", label: "Terminée" },
];

/** Filtering type options */
export const optionsType = [
  { value: "ALL", label: "Tous les types" },
  { value: "SERVICE_DELAY", label: "Retard de service" },
  { value: "ACCOUNT_ACCESS", label: "Accès au compte" },
  { value: "UNRESOLVED_ISSUE", label: "Problème non résolu" },
  { value: "POOR_SUPPORT", label: "Support insuffisant" },
];

/** Same name, now styled like claim badge */
export const getStatusBadgeColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500 text-white border-yellow-200";
    case "UNDER_REVIEW":
      return "bg-blue-500 text-white border-blue-200";
    case "CANCELLED":
      return "bg-red-500 text-white border-red-200";
    case "FINISHED":
      return "bg-green-500 text-white border-green-200";
    default:
      return "bg-gray-500 text-white border-gray-200";
  }
};

/** Same name, translated status */
export const getStatusInFrench = (status) => {
  switch (status) {
    case "PENDING":
      return "En attente";
    case "UNDER_REVIEW":
      return "En cours d'examen";
    case "CANCELLED":
      return "Annulée";
    case "FINISHED":
      return "Terminée";
    default:
      return status;
  }
};
