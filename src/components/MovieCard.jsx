import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  if (movie.Poster === 'N/A') return null;

  const posterUrl = movie.Poster;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="relative h-80 overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.Title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300x450/2d3748/ffffff?text=${encodeURIComponent(movie.Title.substring(0, 30))}`;
              e.target.className = "w-full h-full object-contain bg-gray-700 p-4";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 text-white truncate">{movie.Title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">{movie.Year}</p>
            <span className={`text-xs px-2 py-1 rounded capitalize ${
              movie.Type === 'movie' ? 'bg-blue-600/80 text-white' :
              movie.Type === 'series' ? 'bg-purple-600/80 text-white' :
              'bg-amber-600/80 text-white'
            }`}>
              {movie.Type}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;