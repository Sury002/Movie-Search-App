import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 w-full">
      <div className="flex w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="flex-grow px-3 py-2 sm:px-4 sm:py-3 rounded-md focus:outline-none text-black text-sm sm:text-base md:text-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-md transition duration-200 text-sm sm:text-base md:text-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
