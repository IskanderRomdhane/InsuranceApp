import React from 'react';
import { useNavigate } from "react-router-dom";
import BadgeStatut from './BadgeStatut';

const DetailsComponent = ({ sinistre }) => {
    const navigate = useNavigate();
    
    const ChampInfo = ({ label, value }) => (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium">{value}</p>
        </div>
    );

    const voirDetail = (id) => navigate(`/sinistres/sinistre/${id}`);

    return (
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
};

export default DetailsComponent;