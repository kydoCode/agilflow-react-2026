import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const resetSchema = z.object({
  password: z.string().min(6, 'Minimum 6 caractères'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const result = resetSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(err => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: formData.password })
      });
      if (response.ok) {
        toast.success('Mot de passe réinitialisé');
        navigate('/login');
      } else {
        toast.error('Token invalide ou expiré');
      }
    } catch {
      toast.error('Erreur serveur');
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">AgilFlow</h1>
          </div>

          <h2 className="text-xl font-semibold text-white text-center mb-8">Nouveau mot de passe</h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="glass-input w-full"
                autoComplete="new-password"
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={!!errors.password}
                required
              />
              {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1" role="alert">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="glass-input w-full"
                autoComplete="new-password"
                aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                aria-invalid={!!errors.confirmPassword}
                required
              />
              {errors.confirmPassword && <p id="confirm-error" className="text-red-400 text-xs mt-1" role="alert">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-white/60">
            <Link to="/login" className="text-primary-light hover:underline">
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
