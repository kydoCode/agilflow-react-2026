import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';

export default function Profile() {
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user || !token) {
    navigate('/login');
    return null;
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      await api.changePassword(token, oldPassword, newPassword);
      setSuccess('Mot de passe modifié avec succès');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="glass-card p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-[#0D8B7D] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
              {getInitials(user.name)}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-white/60 text-sm sm:text-base">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="glass-card p-4 sm:p-6 mb-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Informations</h2>
          
          <div>
            <label className="block text-sm text-white/60 mb-1">Email</label>
            <p className="text-white break-words">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Rôle</label>
            <p className="text-white capitalize">{user.role}</p>
          </div>

          {user.createdAt && (
            <div>
              <label className="block text-sm text-white/60 mb-1">Membre depuis</label>
              <p className="text-white">{formatDate(user.createdAt)}</p>
            </div>
          )}
        </div>

        {/* Changement mot de passe */}
        <div className="glass-card p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Sécurité</h2>
          
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:bg-primary-dark transition-all min-h-[44px]"
            >
              Modifier le mot de passe
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ancien mot de passe</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="glass-input w-full"
                  minLength="6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="glass-input w-full"
                  minLength="6"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-sm text-green-400">
                  {success}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setError('');
                    setSuccess('');
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="flex-1 glass-button min-h-[44px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white rounded-xl px-4 py-2 font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {loading ? 'Modification...' : 'Confirmer'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 glass-button min-h-[44px]"
          >
            Retour Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-4 py-2 font-semibold hover:bg-red-500/30 transition-all min-h-[44px]"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
