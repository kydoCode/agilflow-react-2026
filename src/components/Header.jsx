import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="glass-card sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.webp" alt="AgilFlow" className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-lg sm:text-xl font-bold text-white">AgilFlow</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="glass-button text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[44px]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="glass-button text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[44px]"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="glass-button text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[44px]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="glass-button text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[44px]"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold hover:bg-primary-dark transition-all min-h-[44px]"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
