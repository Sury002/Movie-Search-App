import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<div className="text-center py-8">404 - Page Not Found</div>} />
        </Routes>
      </div>
    </FavoritesProvider>
  );
};

export default App;