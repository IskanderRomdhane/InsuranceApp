import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BadgeStatut from './BadgeStatut';
import DetailsComponent from "./afficherDetails";

const SinistreFields = ({ 
  sinistre, 
  isExpanded, 
  borderColor, 
  onExpandToggle 
}) => {
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
        onClick={onExpandToggle}
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
              {sinistre.sinistre_type || sinistre.categorie} sinistre
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
      {isExpanded && <DetailsComponent sinistre={sinistre} />}
    </div>
  );
};

export default SinistreFields;