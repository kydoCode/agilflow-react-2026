import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="glass-card mt-auto backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/60">
          <p>
            &copy; {currentYear}{' '}
            <a 
              href="https://www.sylvainclement.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              kydoCode
            </a>
            {' '}- AgilFlow Team
          </p>
          <div className="flex gap-3 sm:gap-4 md:gap-6">
            <Link to="/legal" className="hover:text-white transition-colors whitespace-nowrap">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors whitespace-nowrap">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
