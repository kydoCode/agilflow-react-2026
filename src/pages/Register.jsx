import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import { registerSchema } from '../schemas/auth.schema';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teammate');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse({ name, email, password, role });
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(err => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const data = await api.register(name, email, password, role);
      setAuth(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ global: 'Erreur lors de l\'inscription' });
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
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input w-full"
              required
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

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
              minLength="6"
              required
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="glass-input w-full"
            >
              <option value="teammate">Teammate</option>
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
              <option value="product owner">Product Owner</option>
              <option value="scrum master">Scrum Master</option>
              <option value="administrator">Administrator</option>
            </select>
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
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-white/60">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary-light hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
    
    <Footer />
  </div>
  );
}
