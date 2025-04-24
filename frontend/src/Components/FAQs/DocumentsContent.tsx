import React from "react";
import { FileTextIcon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
interface Document {
  id: number;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  updatedAt: string;
}
export const DocumentsContent = () => {
  const documents: Document[] = [
    {
      id: 1,
      title: "User Manual",
      description: "Complete guide to using all features of our platform",
      fileType: "PDF",
      fileSize: "2.4 MB",
      updatedAt: "June 12, 2023",
    },
    {
      id: 2,
      title: "API Documentation",
      description:
        "Technical documentation for developers integrating with our API",
      fileType: "HTML",
      fileSize: "Online",
      updatedAt: "August 3, 2023",
    },
    {
      id: 3,
      title: "Security Whitepaper",
      description:
        "Details about our security practices and data protection measures",
      fileType: "PDF",
      fileSize: "1.8 MB",
      updatedAt: "July 15, 2023",
    },
    {
      id: 4,
      title: "Quick Start Guide",
      description: "Get up and running with our platform in minutes",
      fileType: "PDF",
      fileSize: "850 KB",
      updatedAt: "September 5, 2023",
    },
    {
      id: 5,
      title: "Release Notes",
      description: "Details about the latest features and bug fixes",
      fileType: "HTML",
      fileSize: "Online",
      updatedAt: "October 1, 2023",
    },
  ];
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
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                  <DownloadIcon size={16} className="mr-1" />
                  <span className="text-sm">Download</span>
                </button>
              ) : (
                <button className="text-blue-600 hover:text-blue-800 flex items-center">
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
