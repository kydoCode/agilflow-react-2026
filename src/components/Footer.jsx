import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="glass-card mt-auto backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2025 kydoCode - AgilFlow Team</p>
          <div className="flex gap-4 sm:gap-6">
            <Link to="/legal" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
