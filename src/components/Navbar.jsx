import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-white via-white to-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
         <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 from-10% via-sky-500 via-30% to-indigo-500 to-90%">
            MovieSearch
          </div>

           <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-cyan-300 transition-colors font-medium text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
                Home
              </span>
            </Link>
            <Link to="/favorites" className="hover:text-cyan-300 transition-colors font-medium text-xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
                Favorites
              </span>
            </Link>
          </div>

           <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-900 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

         {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-cyan-300 transition-colors font-medium text-lg"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
                Home
              </span>
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-cyan-300 transition-colors font-medium text-lg"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
                Favorites
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
