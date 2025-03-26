import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import TypeFilter from '../components/TypeFilter';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [type, setType] = useState('');
  
  useEffect(() => {
    const loadDefaultMovies = async () => {
      try {
        setLoading(true);
        const defaultQueries = ['avengers', 'inception', 'interstellar', 'the dark knight'];
        const allMovies = [];
        
        for (const query of defaultQueries) {
          const { movies: results } = await searchMovies(query);
          const validMovies = results.filter(movie => movie.Poster !== 'N/A');
          allMovies.push(...validMovies);
        }
        
        const uniqueMovies = allMovies.reduce((acc, current) => {
          const x = acc.find(item => item.imdbID === current.imdbID);
          if (!x) return acc.concat([current]);
          return acc;
        }, []).slice(0, 8);
        
        setMovies(uniqueMovies);
      } catch (err) {
        console.error("Error loading default movies:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (!query) loadDefaultMovies();
  }, [query]);

  const handleSearch = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const { movies: results, totalResults } = await searchMovies(searchQuery, page, type);
      setMovies(results);
      setTotalPages(Math.ceil(totalResults / 10));
      setQuery(searchQuery);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };
  
  const handleTypeChange = (newType) => {
    setType(newType);
    if (query) handleSearch(query, 1);
  };
  
  const handlePageChange = (page) => {
    if (query) handleSearch(query, page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-black to-90% text-white"> 
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-white">
            The Movie Vault
          </h1>
          <p className="text-gray-300 text-xl">Discover your favorite movies and TV shows</p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-white/10">
          <SearchBar onSearch={handleSearch} />
          <TypeFilter selectedType={type} onTypeChange={handleTypeChange} />
        </div>
        
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded mb-6 text-center max-w-2xl mx-auto backdrop-blur-sm">
            {error}
          </div>
        )}
        
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          !loading && !error && query && (
            <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto border border-white/10">
              <p className="text-gray-300 text-lg">No movies found for "{query}"</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;