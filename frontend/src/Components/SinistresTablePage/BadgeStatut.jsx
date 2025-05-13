import React from 'react'
import statutCouleurs from '../../Pages/User/Sinistres/statutCouleurs';

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

export default BadgeStatut