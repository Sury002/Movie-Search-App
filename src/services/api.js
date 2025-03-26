const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${type ? `&type=${type}` : ''}`
    );
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Something went wrong');
    }
    
    const validMovies = data.Search ? data.Search.filter(movie => movie.Poster !== 'N/A') : [];
    
    return {
      movies: validMovies,
      totalResults: parseInt(data.totalResults) || 0,
    };
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};