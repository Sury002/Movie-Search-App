import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { FavoritesContext } from '../context/FavoritesContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  
  const isFavorite = favorites.some(fav => fav.imdbID === id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-red-900/50 border border-red-700 text-red-100 px-6 py-4 rounded max-w-md text-center">
        {error}
        <Link to="/" className="block mt-4 text-blue-400 hover:underline">
          ← Back to search
        </Link>
      </div>
    </div>
  );

  if (!movie) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800/50 text-white px-6 py-4 rounded max-w-md text-center">
        No movie found
        <Link to="/" className="block mt-4 text-blue-400 hover:underline">
          ← Back to search
        </Link>
      </div>
    </div>
  );

  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : `https://via.placeholder.com/500x750/1a202c/ffffff?text=${encodeURIComponent(movie.Title.substring(0, 30))}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-400 hover:underline mb-6">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to search
        </Link>
        
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/500x750/1a202c/ffffff?text=${encodeURIComponent(movie.Title.substring(0, 30))}`;
                }}
              />
            </div>
            <div className="p-6 md:w-2/3 lg:w-3/4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{movie.Title} ({movie.Year})</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.Genre?.split(', ').map(genre => (
                      <span key={genre} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm capitalize">
                      {movie.Type}
                    </span>
                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {movie.Runtime}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => isFavorite ? removeFavorite(movie) : addFavorite(movie)}
                  className={`flex items-center px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors duration-200`}
                >
                  {isFavorite ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove Favorite
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add Favorite
                    </>
                  )}
                </button>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-blue-400">Plot</h2>
                <p className="text-gray-300">{movie.Plot}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-700/50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Details</h3>
                  <div className="space-y-3 text-gray-300">
                    {movie.Director && movie.Director !== 'N/A' && (
                      <div>
                        <span className="font-medium block text-gray-400">Director:</span>
                        <span>{movie.Director}</span>
                      </div>
                    )}
                    {movie.Writer && movie.Writer !== 'N/A' && (
                      <div>
                        <span className="font-medium block text-gray-400">Writer:</span>
                        <span>{movie.Writer}</span>
                      </div>
                    )}
                    {movie.Actors && movie.Actors !== 'N/A' && (
                      <div>
                        <span className="font-medium block text-gray-400">Actors:</span>
                        <span>{movie.Actors}</span>
                      </div>
                    )}
                    {movie.Language && movie.Language !== 'N/A' && (
                      <div>
                        <span className="font-medium block text-gray-400">Language:</span>
                        <span>{movie.Language}</span>
                      </div>
                    )}
                    {movie.Country && movie.Country !== 'N/A' && (
                      <div>
                        <span className="font-medium block text-gray-400">Country:</span>
                        <span>{movie.Country}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Ratings</h3>
                  <div className="space-y-4">
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-gray-300">IMDb Rating</span>
                          <span className="text-white">{movie.imdbRating}/10</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                          <div 
                            className="bg-yellow-500 h-2.5 rounded-full" 
                            style={{ width: `${parseFloat(movie.imdbRating) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {movie.Ratings?.map(rating => (
                      <div key={rating.Source}>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-300">{rating.Source}</span>
                          <span className="text-white">{rating.Value}</span>
                        </div>
                        {rating.Source === 'Rotten Tomatoes' && rating.Value && (
                          <div className="w-full bg-gray-600 rounded-full h-2.5 mt-1">
                            <div 
                              className="bg-red-600 h-2.5 rounded-full" 
                              style={{ width: rating.Value.replace('%', '') + '%' }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {movie.Type === 'series' && (
                <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/50">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Series Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    {movie.totalSeasons && (
                      <div>
                        <span className="font-medium block text-gray-400">Total Seasons:</span>
                        <span>{movie.totalSeasons}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {movie.Type === 'episode' && (
                <div className="bg-purple-900/20 p-5 rounded-lg border border-purple-800/50">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400">Episode Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    {movie.Season && (
                      <div>
                        <span className="font-medium block text-gray-400">Season:</span>
                        <span>{movie.Season}</span>
                      </div>
                    )}
                    {movie.Episode && (
                      <div>
                        <span className="font-medium block text-gray-400">Episode:</span>
                        <span>{movie.Episode}</span>
                      </div>
                    )}
                    {movie.seriesID && (
                      <div className="col-span-2">
                        <Link 
                          to={`/movie/${movie.seriesID}`} 
                          className="text-blue-400 hover:underline inline-flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          View full series details
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;