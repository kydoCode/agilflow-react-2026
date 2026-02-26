import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const forgotSchema = z.object({
  email: z.string().email('Email invalide')
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      forgotSchema.parse({ email });
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/password-reset/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        toast.success('Email de réinitialisation envoyé');
      } else {
        toast.error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      toast.error(error.errors?.[0]?.message || 'Email invalide');
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

          <h2 className="text-xl font-semibold text-white text-center mb-2">Mot de passe oublié</h2>
          <p className="text-white/60 text-sm text-center mb-8">Entrez votre email pour recevoir un lien de réinitialisation</p>

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
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Envoi...' : 'Envoyer le lien'}
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
