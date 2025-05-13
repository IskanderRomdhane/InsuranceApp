import React from 'react'

const DocumentsSection = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Documents</h3>
        <p className="text-gray-500">No documents available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Documents</h3>
      
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="bg-white p-3 rounded border flex items-center">
            <div className="p-2 bg-[#476f66] text-white rounded mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <a 
              href={doc.documentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#476f66] hover:underline truncate"
            >
              {doc.documentName || "Document"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsSection