import React from 'react';

const TypeFilter = ({ selectedType, onTypeChange }) => {
  const types = ['', 'movie', 'series']; 
  
  return (
    <div className="mb-4">
      <label htmlFor="type-filter" className="block text-sm font-medium text-white-700 mb-1">
        Filter by Type
      </label>
      <select
        id="type-filter"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
      >
        {types.map(type => (
          <option key={type || 'all'} value={type}>
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;