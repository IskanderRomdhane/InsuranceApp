import { AlertCircle, CheckCircle, FileText } from 'lucide-react';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  export const StatusIndicator = ({ status }) => {
    const statusConfig = {
      "FINISHED": {
        color: "bg-green-500",
        label: "Terminé"
      },
      "PENDING": {
        color: "bg-yellow-500",
        label: "En cours"
      },
      "CANCELLED": {
        color: "bg-red-500",
        label: "Rejeté"
      },
      "UNDER_REVIEW": {
        color: "bg-blue-500",
        label: "En Examen"
      }
    }
    const config = statusConfig[status] || { color: "bg-gray-500", label: status?.replace("_", " ") || "Unknown" };
    
    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
    };

 export const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

 export const getModalBg = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FINISHED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-700 text-white';
      case 'UNDER_REVIEW': return 'bg-blue-700 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

 export const getDivBorderColor = (status) => {
    switch(status) {
      case 'PENDING': return 'border-yellow-100';
      case 'FINISHED': return 'border-green-100';
      case 'CANCELLED': return 'border-red-700';
      case 'UNDER_REVIEW': return 'border-blue-700';
      default: return 'border-red-700';
    }
  };

  
 export const getTypeIcon = (type) => {
    switch(type) {
      case 'TECHNICAL': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'BILLING': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'SERVICE': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };