import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const filterOptions = ['Tous', 'Sante', 'AutoMobile', 'Habilitation'];

export default function SinistreFilterDropdown({ activeFilter, setActiveFilter }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    setActiveFilter(option);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full md:w-48 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{activeFilter}</span>
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  activeFilter === option
                    ? 'bg-[#476f66] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
