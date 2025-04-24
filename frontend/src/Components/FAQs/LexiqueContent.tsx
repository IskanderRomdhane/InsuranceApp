import React, { useEffect, useState } from "react";
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
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch glossary terms from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/glossary")
      .then((res) => res.json())
      .then((data) => {
        setTerms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching glossary terms:", err);
        setLoading(false);
      });
  }, []);

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

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading...</div>
      ) : (
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
      )}
    </div>
  );
};
