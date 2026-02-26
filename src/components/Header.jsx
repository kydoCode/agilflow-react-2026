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
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="AgilFlow" width="40" height="40" className="size-10" />
            <span className="text-base sm:text-lg md:text-xl font-bold text-white hidden xs:inline">AgilFlow</span>
          </Link>

          <nav aria-label="Navigation principale" className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="glass-button text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-2 min-h-[44px] flex items-center justify-center"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="glass-button text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-2 min-h-[44px] flex items-center justify-center"
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="glass-button text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-2 min-h-[44px] flex items-center justify-center whitespace-nowrap"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="glass-button text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-2 min-h-[44px] flex items-center justify-center"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white rounded-xl px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base font-semibold hover:bg-primary-dark transition-all min-h-[44px] flex items-center justify-center"
                >
                  Inscription
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
