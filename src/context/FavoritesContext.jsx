import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  
  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
  };
  
  const removeFavorite = (movie) => {
    const newFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};