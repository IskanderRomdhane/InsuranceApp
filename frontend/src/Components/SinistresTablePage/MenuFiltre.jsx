import React from 'react'
import {ChevronDown,ChevronUp} from "lucide-react";
const MenuFiltre = ({
    label,
    options,
    optionActive,
    setOptionActive,
    isOpen,
    setIsOpen,
  }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    const selectOption = (e, option) => {
      e.stopPropagation();
      setOptionActive(option);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className="flex items-center justify-between w-40 px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        >
          <span>
            {label}: {optionActive}
          </span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  optionActive === option ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={(e) => selectOption(e, option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

export default MenuFiltre