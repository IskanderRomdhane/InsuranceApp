import React from 'react'

const StatusTracker = ({ state }) => {
  // Define possible states in order
  const states = ["SUBMITTED", "IN_REVIEW", "ADDITIONAL_INFO_REQUIRED", "APPROVED", "REJECTED", "PAID"];
  
  // Find the current state index
  const currentStateIndex = states.findIndex(s => s === state);
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-[#476f66]">Claim Status</h3>
      
      <div className="flex items-center justify-between mb-2">
        {states.map((s, index) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index <= currentStateIndex ? 'bg-[#476f66] text-white' : 'bg-gray-200'
            }`}>
              {index <= currentStateIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs mt-1 whitespace-nowrap">
              {s.replace(/_/g, ' ').toLowerCase()}
            </span>
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div 
          className="bg-[#476f66] h-2 rounded-full" 
          style={{ width: `${(currentStateIndex / (states.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusTracker