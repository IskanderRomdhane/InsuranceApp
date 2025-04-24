import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
interface Term {
  id: number;
  term: string;
  definition: string;
  category: string;
}
export const LexiqueContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const terms: Term[] = [
    {
      id: 1,
      term: "API",
      definition:
        "Application Programming Interface. A set of rules that allows one software application to interact with another.",
      category: "Technical",
    },
    {
      id: 2,
      term: "Dashboard",
      definition:
        "A visual display of all of your data. A dashboard is used to track, analyze, and display data to monitor the health of a business, department, or specific process.",
      category: "UI/UX",
    },
    {
      id: 3,
      term: "KPI",
      definition:
        "Key Performance Indicator. A measurable value that demonstrates how effectively a company is achieving key business objectives.",
      category: "Business",
    },
    {
      id: 4,
      term: "SaaS",
      definition:
        "Software as a Service. A software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted.",
      category: "Business",
    },
    {
      id: 5,
      term: "UI",
      definition:
        "User Interface. The space where interactions between humans and machines occur. The goal of this interaction is to allow effective operation and control of the machine from the human end.",
      category: "UI/UX",
    },
    {
      id: 6,
      term: "UX",
      definition:
        "User Experience. The overall experience of a person using a product such as a website or computer application, especially in terms of how easy or pleasing it is to use.",
      category: "UI/UX",
    },
    {
      id: 7,
      term: "SSL",
      definition:
        "Secure Sockets Layer. A standard security technology for establishing an encrypted link between a server and a client.",
      category: "Technical",
    },
    {
      id: 8,
      term: "CRM",
      definition:
        "Customer Relationship Management. A technology for managing all your company's relationships and interactions with customers and potential customers.",
      category: "Business",
    },
  ];
  const categories = [
    "All",
    ...Array.from(new Set(terms.map((term) => term.category))),
  ];
  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Glossary</h2>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 text-sm rounded-full ${
              activeCategory === category
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <div
              key={term.id}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  {term.term}
                </h3>
                <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                  {term.category}
                </span>
              </div>
              <p className="text-gray-600">{term.definition}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No terms found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
