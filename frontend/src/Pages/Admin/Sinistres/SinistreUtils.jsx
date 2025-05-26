import { 
  FileText, 
  Image as ImageIcon, 
} from 'lucide-react';
export const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'APPROUVE': return 'bg-green-100 text-green-700 border-green-200';
      case 'REJETE': return 'bg-red-100 text-red-700 border-red-200';
      case 'SOUMIS': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'EN_EXAMEN': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'INFOS_COMPLEMENTAIRES_REQUISES': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

export const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'jpg': case 'jpeg': case 'png': case 'gif': return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'doc': case 'docx': return <FileText className="h-5 w-5 text-blue-600" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };