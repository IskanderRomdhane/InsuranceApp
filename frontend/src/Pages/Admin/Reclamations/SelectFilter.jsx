import React from 'react';

const SelectFiltre = ({ options, value, onChange, icon }) => (
  <div className="relative w-full md:w-56">
    <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <span className="p-3 bg-gray-50 border-r border-gray-200">{icon}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-3 pl-3 pr-8 appearance-none bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

export default SelectFiltre;
