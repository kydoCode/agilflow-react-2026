import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import { loginSchema } from '../schemas/auth.schema';
import { analytics } from '../analytics';
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
      analytics.login();
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
          <img src="/logo.png" alt="AgilFlow" width="48" height="48" className="size-12" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            AgilFlow
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full"
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
              required
            />
            {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1" role="alert">{errors.password}</p>}
          </div>

          {errors.global && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm" role="alert">
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
        
        <p className="text-center mt-2 text-sm text-white/60">
          <Link to="/forgot-password" className="text-primary-light hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>
      </div>
    </main>
    
    <Footer />
  </div>
  );
}
