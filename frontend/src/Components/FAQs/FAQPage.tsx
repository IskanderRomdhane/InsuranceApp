import React, { useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { FAQContent } from "./FAQContent";
import { TutorialsContent } from "./TutorialsContent";
import { DocumentsContent } from "./DocumentsContent";
import { LexiqueContent } from "./LexiqueContent";

export const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("faqs");

  const renderContent = () => {
    switch (activeTab) {
      case "faqs":
        return <FAQContent />;
      case "tutorials":
        return <TutorialsContent />;
      case "documents":
        return <DocumentsContent />;
      case "lexique":
        return <LexiqueContent />;
      default:
        return <FAQContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Centre d'aide
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Trouvez des réponses à vos questions et apprenez à utiliser notre
          plateforme
        </p>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};
