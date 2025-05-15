import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileTextIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { fetchDocuments } from "./FAQsManagement";
interface Document {
  id: number;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  updatedAt: string;
}

export const DocumentsContent = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    };

    getDocuments();
  }, []);

  const handleDownload = (id: number) => {
    window.open(`http://localhost:8081/api/documents/${id}/download`, "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Documentation
      </h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="mr-4 flex-shrink-0">
              <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center">
                <FileTextIcon size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-800">{doc.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-3">{doc.fileType}</span>
                <span className="mr-3">{doc.fileSize}</span>
                <span>Updated: {doc.updatedAt}</span>
              </div>
            </div>
            <div className="flex items-center">
              {doc.fileType === "PDF" ? (
                <button
                  onClick={() => handleDownload(doc.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <DownloadIcon size={16} className="mr-1" />
                  <span className="text-sm">Download</span>
                </button>
              ) : (
                <button
                  onClick={() => window.open(`/documents/${doc.id}`, "_blank")}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ExternalLinkIcon size={16} className="mr-1" />
                  <span className="text-sm">View Online</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
