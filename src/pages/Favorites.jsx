import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-pink-900 to-90%...">
            Your Favorites
          </h1>
          <p className="text-gray-300 text-xl">{favorites.length} saved items</p>
        </div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl max-w-2xl mx-auto border border-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-pink-700 to-90% ... rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">No favorites yet</h3>
            <p className="text-gray-300 mb-6">Save your favorite movies to find them later</p>
            <Link 
              to="/" 
              className="inline-block bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-pink-700 to-90% ... hover:from-amber-600 hover:to-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;