import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import { loginSchema } from '../schemas/auth.schema';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(err => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await api.login(email, password);
      setAuth(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ global: 'Email ou mot de passe incorrect' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/logo.webp" alt="AgilFlow" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            AgilFlow
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full"
              required
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full"
              required
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {errors.global && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm">
              {errors.global}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 min-h-[44px]"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-white/60">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-primary-light hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
    
    <Footer />
  </div>
  );
}
