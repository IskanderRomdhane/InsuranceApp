import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import axios from "axios";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const ITEMS_PER_PAGE = 4;

export const FAQContent = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get<FAQItem[]>(
          "http://localhost:8081/api/faqs"
        );
        setFaqs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des FAQ :", error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentFaqs = faqs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setOpenItems([]); // Close all open items when page changes
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Questions fréquemment posées
      </h2>
      <div className="space-y-4">
        {currentFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openItems.includes(index) ? (
                <ChevronUpIcon size={20} className="text-gray-500" />
              ) : (
                <ChevronDownIcon size={20} className="text-gray-500" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-green-300 transition"
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-full border transition ${
              currentPage === index + 1
                ? "bg-green-600 text-white font-semibold"
                : "bg-white text-gray-700 hover:bg-green-50"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-green-300 transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
