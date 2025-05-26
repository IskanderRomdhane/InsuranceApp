import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ReactPdfPrint = ({ sinistre }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: 'Title',
        contentRef: componentRef,
        onAfterPrint: () => console.log('Print successful')
    });

    // Format date for better readability
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <>
            <div style={{ display: 'none' }}>
                <div ref={componentRef} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
                        Détails du Sinistre
                    </h2>
                    
                    <div className="space-y-3">
                        <div className="flex py-2 border-b border-gray-100">
                            <span className="font-semibold text-gray-700 w-40">Référence:</span>
                            <span className="text-gray-900">#{sinistre.id}</span>
                        </div>
                        
                        <div className="flex py-2 border-b border-gray-100">
                            <span className="font-semibold text-gray-700 w-40">Date:</span>
                            <span className="text-gray-900">{formatDate(sinistre.date)}</span>
                        </div>
                        
                        <div className="flex py-2 border-b border-gray-100">
                            <span className="font-semibold text-gray-700 w-40">Objet:</span>
                            <span className="text-gray-900">{sinistre.object}</span>
                        </div>
                        
                        <div className="flex py-2 border-b border-gray-100">
                            <span className="font-semibold text-gray-700 w-40">Description:</span>
                            <span className="text-gray-900">{sinistre.description}</span>
                        </div>
                        
                        <div className="flex py-2 border-b border-gray-100">
                            <span className="font-semibold text-gray-700 w-40">Montant:</span>
                            <span className="text-gray-900">{sinistre.amount.toFixed(2)} TND</span>
                        </div>
                        
                        <div className="flex py-2">
                            <span className="font-semibold text-gray-700 w-40">Statut:</span>
                            <span className="text-gray-900">{sinistre.etat.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="flex py-2">
                            <span className="font-semibold text-gray-700 w-40">image:</span>
                            {sinistre.images.map((image) => (
                                <div key={image.id} className="bg-white p-2 rounded border">
                                    <img 
                                    src={image.imageUrl || "/api/placeholder/300/200"} 
                                    alt={image.name || "Claim image"} 
                                    className="w-full object-cover rounded mb-2" 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={handlePrint}
                className="flex items-center text-[#476f66] hover:underline cursor-pointer bg-transparent border-none p-0"
            >
                <div className="p-2 bg-[#476f66] text-white rounded mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                </div>
                Imprimer les détails
            </button>
        </>
    );
};

export default ReactPdfPrint;