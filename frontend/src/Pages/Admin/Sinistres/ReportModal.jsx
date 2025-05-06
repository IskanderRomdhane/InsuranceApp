import React, { useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Image as ImageIcon, Download, XCircle } from 'lucide-react';
import FormattedReport from './FormattedReport';
const ReportModal = ({ setShowModal, handleStatusChange, aiReport }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [setShowModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef} 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out"
      >
        {/* Decorative card effect with subtle greenish gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-300 via-teal-400 to-emerald-500 opacity-10 pointer-events-none" />
        
        {/* Modal Header with greenish gradient */}
        <div className="bg-gradient-to-r from-green-600 to-teal-700 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white tracking-tight">Rapport d'analyse du sinistre</h3>
          <button 
            onClick={() => setShowModal(false)} 
            className="text-white hover:text-green-200 transition-colors"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        
        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <div className="prose max-w-none">
            <div className="whitespace-pre-line bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <FormattedReport aiReport={aiReport} />
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 flex justify-end space-x-4 border-t border-gray-100">
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            onClick={() => handleStatusChange('REJECTED')}
          >
            Rejeter
          </button>
          <button
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            onClick={() => handleStatusChange('ACCEPTED')}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;