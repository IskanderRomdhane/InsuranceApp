import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-end"
      ref={chatbotRef}
    >
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-3 font-medium flex justify-between items-center">
            <span>Chat Support</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-gray-500 text-sm flex items-center justify-center">
            {/* body */}
          </div>

          <div className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none bg-gray-100"
              disabled
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        <MessageSquare />
      </button>
    </div>
  );
}
