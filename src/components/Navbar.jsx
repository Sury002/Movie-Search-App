import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-br from-white via-white to-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 from-10% via-sky-500 via-30% to-indigo-500 to-90%">
            MovieSearch
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-cyan-300 transition-colors font-medium text-xl">
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300'>
                Home
              </span>
            </Link>
            <Link to="/favorites" className="hover:text-cyan-300 transition-colors font-medium text-xl">
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300'>
                Favorites
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;