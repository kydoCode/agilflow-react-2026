import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Medium', status: 'Todo' });
  const [editId, setEditId] = useState(null);
  
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadStories();
  }, [token, navigate]);

  const loadStories = async () => {
    try {
      const data = await api.getUserStories(token);
      setStories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.updateUserStory(token, editId, formData);
      } else {
        await api.createUserStory(token, formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '', priority: 'Medium', status: 'Todo' });
      setEditId(null);
      loadStories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (story) => {
    setFormData({ title: story.title, description: story.description, priority: story.priority, status: story.status });
    setEditId(story.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette User Story ?')) return;
    try {
      await api.deleteUserStory(token, id);
      loadStories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-white/60 mt-1">Bienvenue, {user?.name} <span className="text-primary-light text-sm">({user?.role})</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary/20 border border-primary/30 text-primary-light rounded-xl px-4 py-2 hover:bg-primary/30 transition-all"
              >
                + Nouvelle US
              </button>
              <button
                onClick={handleLogout}
                className="glass-button"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <div key={story.id} className="glass-card p-6 hover:bg-white/15 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  story.status === 'Done' ? 'bg-accent/20 text-accent' :
                  story.status === 'Doing' ? 'bg-primary/20 text-primary-light' :
                  'bg-white/10 text-white/60'
                }`}>
                  {story.status}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  story.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                  story.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-white/10 text-white/60'
                }`}>
                  {story.priority}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-3">{story.description}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(story)}
                  className="flex-1 glass-button text-sm"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-4 py-2 text-sm hover:bg-red-500/30 transition-all"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-white/60">Aucune User Story. Créez-en une !</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Modifier' : 'Nouvelle'} User Story</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="glass-input w-full min-h-[100px]"
                  rows="4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priorité</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="glass-input w-full"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="glass-input w-full"
                  >
                    <option value="Todo">Todo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormData({ title: '', description: '', priority: 'Medium', status: 'Todo' });
                  }}
                  className="flex-1 glass-button"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary/20 border border-primary/30 text-primary-light rounded-xl px-4 py-2 hover:bg-primary/30 transition-all"
                >
                  {editId ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
