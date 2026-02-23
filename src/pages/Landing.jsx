import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Landing() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero */}
          <div className="mb-12 sm:mb-16">
            <img 
              src="/logo.webp" 
              alt="AgilFlow" 
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              AgilFlow
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Effortlessly design, manage and track User Stories as team - the Agile way !
            </p>
          </div>

          {/* Slogan */}
          <div className="glass-card p-8 sm:p-12 mb-12 sm:mb-16">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D8B7D]">
                Simplify.
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                Collaborate.
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Succeed.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-primary text-white rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-primary-dark transition-all min-h-[44px]"
              >
                Accéder au Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-primary text-white rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-primary-dark transition-all min-h-[44px]"
                >
                  Commencer gratuitement
                </Link>
                <Link
                  to="/login"
                  className="glass-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[44px]"
                >
                  Se connecter
                </Link>
              </>
            )}
          </div>

          {/* Promo Video */}
          <div className="mt-12 sm:mt-16">
            <div className="glass-card p-2 sm:p-3 overflow-hidden">
              <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe
                  src="https://player.vimeo.com/video/1167232498?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="AgilFlow - Présentation"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Kanban Board</h3>
              <p className="text-white/70 text-xs sm:text-sm md:text-base">
                Visualisez vos User Stories en colonnes Todo, Doing, Done
              </p>
            </div>
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Collaboration</h3>
              <p className="text-white/70 text-xs sm:text-sm md:text-base">
                Travaillez en équipe avec des rôles définis
              </p>
            </div>
            <div className="glass-card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Simplicité</h3>
              <p className="text-white/70 text-xs sm:text-sm md:text-base">
                Interface intuitive et moderne pour tous
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
