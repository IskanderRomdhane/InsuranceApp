import React from 'react'

const StatusTracker = ({ state }) => {
  // Define base states
  const baseStates = ["SOUMIS", "EN_EXAMEN", "APPROUVE", "PAYE"];
  
  // Status display configuration
  const statusConfig = {
    "SOUMIS": { label: "soumis", color: "#476f66" },
    "EN_EXAMEN": { label: "en examen", color: "#476f66" },
    "INFOS_COMPLEMENTAIRES_REQUISES": { label: "infos requises", color: "#d97706" },
    "APPROUVE": { label: "approuvé", color: "#476f66" },
    "REJETE": { label: "rejeté", color: "#dc2626" },
    "PAYE": { label: "payé", color: "#476f66" }
  };

  // Determine which states to show
  let visibleStates = [...baseStates];
  const isRejected = state === "REJETE";
  const needsInfo = state === "INFOS_COMPLEMENTAIRES_REQUISES" || 
                   (baseStates.indexOf(state) > baseStates.indexOf("EN_EXAMEN") && 
                   state !== "APPROUVE" && 
                   state !== "PAYE");

  if (isRejected) {
    visibleStates = ["SOUMIS", "EN_EXAMEN", "REJETE"];
  } else if (needsInfo) {
    // Insert info required after "EN_EXAMEN"
    visibleStates = [
      ...baseStates.slice(0, 2),
      "INFOS_COMPLEMENTAIRES_REQUISES",
      ...baseStates.slice(2)
    ];
  }

  // Find current position
  const currentStateIndex = visibleStates.indexOf(state);
  const currentColor = statusConfig[state]?.color || "#476f66";

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-[#476f66]">Status Sinistre</h3>
      
      <div className="flex items-center justify-between mb-2">
        {visibleStates.map((s, index) => {
          const isCompleted = index <= currentStateIndex;
          const isCurrent = index === currentStateIndex;
          const config = statusConfig[s];
          
          return (
            <div key={s} className="flex flex-col items-center">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted ? 'text-white' : 'bg-gray-200'
                }`}
                style={{ 
                  backgroundColor: isCompleted ? config.color : '',
                  border: isCurrent && !isCompleted ? `2px solid ${config.color}` : 'none'
                }}
              >
                {isCompleted && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {s === "REJETE" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    )}
                  </svg>
                )}
              </div>
              <span 
                className={`text-xs mt-1 whitespace-nowrap ${
                  isCurrent ? 'font-bold' : ''
                }`}
                style={{ color: isCurrent ? config.color : '' }}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div 
          className="h-2 rounded-full" 
          style={{ 
            width: `${(currentStateIndex / (visibleStates.length - 1)) * 100}%`,
            backgroundColor: currentColor
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatusTracker;