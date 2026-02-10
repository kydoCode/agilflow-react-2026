import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    asA: '',
    iWant: '', 
    soThat: '',
    priority: 'Medium', 
    status: 'Todo' 
  });
  const [editId, setEditId] = useState(null);
  
  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    loadStories();

    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        setEditId(null);
        setFormData({ asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'Todo' });
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [token, navigate, showModal]);

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
      const payload = {
        title: `En tant que ${formData.asA}, je veux ${formData.iWant}`,
        description: `Afin de ${formData.soThat}`,
        priority: formData.priority,
        status: formData.status
      };
      
      if (editId) {
        await api.updateUserStory(token, editId, payload);
      } else {
        await api.createUserStory(token, payload);
      }
      setShowModal(false);
      setFormData({ asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'Todo' });
      setEditId(null);
      loadStories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (story) => {
    const asAMatch = story.title.match(/En tant que (.+?), je veux (.+)/);
    const soThatMatch = story.description?.match(/Afin de (.+)/);
    
    setFormData({ 
      asA: asAMatch ? asAMatch[1] : '',
      iWant: asAMatch ? asAMatch[2] : story.title,
      soThat: soThatMatch ? soThatMatch[1] : story.description || '',
      priority: story.priority, 
      status: story.status 
    });
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

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-400 bg-red-500/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'Low': return 'text-green-400 bg-green-500/10';
      default: return 'text-white/60 bg-white/10';
    }
  };

  const sortByPriority = (a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  };

  const todoStories = stories.filter(s => s.status === 'Todo').sort(sortByPriority);
  const doingStories = stories.filter(s => s.status === 'Doing').sort(sortByPriority);
  const doneStories = stories.filter(s => s.status === 'Done').sort(sortByPriority);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Kanban Board</h1>
              <p className="text-white/60 mt-1 text-sm sm:text-base">
                Bienvenue, {user?.name} <span className="text-[#0D8B7D] text-xs sm:text-sm">({user?.role})</span>
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate('/profile')}
                className="glass-button text-sm sm:text-base min-h-[44px] px-3 sm:px-4"
              >
                Profile
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 sm:flex-none bg-[#0D8B7D] text-white rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold hover:bg-[#0c7a6d] transition-all min-h-[44px]"
              >
                + Add Task
              </button>
              <button
                onClick={handleLogout}
                className="glass-button text-sm sm:text-base min-h-[44px]"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* TODO Column */}
          <div className="flex flex-col">
            <div className="glass-card p-3 sm:p-4 mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white/90">Todo</h2>
              <span className="text-xs sm:text-sm text-white/50">{todoStories.length} tâches</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {todoStories.map(story => (
                <StoryCard key={story.id} story={story} onEdit={handleEdit} onDelete={handleDelete} getPriorityColor={getPriorityColor} />
              ))}
            </div>
          </div>

          {/* DOING Column */}
          <div className="flex flex-col">
            <div className="glass-card p-3 sm:p-4 mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white/90">Doing</h2>
              <span className="text-xs sm:text-sm text-white/50">{doingStories.length} tâches</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {doingStories.map(story => (
                <StoryCard key={story.id} story={story} onEdit={handleEdit} onDelete={handleDelete} getPriorityColor={getPriorityColor} />
              ))}
            </div>
          </div>

          {/* DONE Column */}
          <div className="flex flex-col">
            <div className="glass-card p-3 sm:p-4 mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white/90">Done</h2>
              <span className="text-xs sm:text-sm text-white/50">{doneStories.length} tâches</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {doneStories.map(story => (
                <StoryCard key={story.id} story={story} onEdit={handleEdit} onDelete={handleDelete} getPriorityColor={getPriorityColor} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
              setEditId(null);
              setFormData({ asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'Todo' });
            }
          }}
        >
          <div className="glass-card w-full max-w-lg p-4 sm:p-6 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setEditId(null);
                setFormData({ asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'Todo' });
              }}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
              aria-label="Fermer"
            >
              ×
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-4">{editId ? 'Modifier' : 'Nouvelle'} User Story</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">En tant que</label>
                <input
                  type="text"
                  value={formData.asA}
                  onChange={(e) => setFormData({...formData, asA: e.target.value})}
                  className="glass-input w-full"
                  placeholder="utilisateur, admin, développeur..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Je veux</label>
                <textarea
                  value={formData.iWant}
                  onChange={(e) => setFormData({...formData, iWant: e.target.value})}
                  className="glass-input w-full min-h-[80px]"
                  placeholder="pouvoir me connecter, créer des tâches..."
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Afin de</label>
                <textarea
                  value={formData.soThat}
                  onChange={(e) => setFormData({...formData, soThat: e.target.value})}
                  className="glass-input w-full min-h-[80px]"
                  placeholder="accéder à mon compte, organiser mon travail..."
                  rows="3"
                  required
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
                    setFormData({ asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'Todo' });
                  }}
                  className="flex-1 glass-button min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0D8B7D] text-white rounded-xl px-4 py-2 font-semibold hover:bg-[#0c7a6d] transition-all min-h-[44px]"
                >
                  {editId ? 'Save' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StoryCard({ story, onEdit, onDelete, getPriorityColor }) {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 shadow-2xl transition-all hover:border-white/20 hover:bg-white/10">
      <div className="absolute -inset-px bg-gradient-to-br from-[#0D8B7D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
          <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">
            #{story.id}
          </span>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityColor(story.priority)}`}>
            {story.priority}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors break-words mb-2">
          {story.title}
        </h3>
        
        {story.description && (
          <p className="text-xs sm:text-sm text-white/60 mb-4 break-words line-clamp-2">
            {story.description}
          </p>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(story)}
            className="flex-1 glass-button text-xs sm:text-sm min-h-[44px]"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(story.id)}
            className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-4 py-2 text-xs sm:text-sm hover:bg-red-500/30 transition-all min-h-[44px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
