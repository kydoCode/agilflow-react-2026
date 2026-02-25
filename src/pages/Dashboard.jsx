import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { userStorySchema } from '../schemas/userstory.schema';
import { analytics } from '../analytics';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const COLUMNS = [
  { id: 'BACKLOG',  label: 'Backlog',   color: 'text-white/50' },
  { id: 'TO_DO',   label: 'To Do',     color: 'text-blue-400' },
  { id: 'DOING',   label: 'Doing',     color: 'text-yellow-400' },
  { id: 'TO_TEST', label: 'To Test',   color: 'text-purple-400' },
  { id: 'ISSUE',   label: 'Issue',     color: 'text-red-400' },
  { id: 'DONE',    label: 'Done',      color: 'text-green-400' },
];

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const PRIORITY_COLORS = {
  High:   'text-red-400 bg-red-500/10',
  Medium: 'text-yellow-400 bg-yellow-500/10',
  Low:    'text-green-400 bg-green-500/10',
};

const EMPTY_FORM = { asA: '', iWant: '', soThat: '', priority: 'Medium', status: 'BACKLOG' };

function StoryCard({ story, onEdit, onDelete, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: story.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl hover:border-white/20 hover:bg-white/10 transition-all"
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">#{story.id}</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${PRIORITY_COLORS[story.priority] || 'text-white/60 bg-white/10'}`}>
            {story.priority}
          </span>
          <span {...attributes} {...listeners} className="cursor-grab text-white/30 hover:text-white/60 text-lg leading-none select-none">⠿</span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white/90 break-words mb-2 line-clamp-2">{story.title}</h3>

      {story.description && (
        <p className="text-xs text-white/50 mb-3 break-words line-clamp-2">{story.description}</p>
      )}

      <div className="flex flex-col gap-2">
        <button onClick={() => onEdit(story)} className="w-full glass-button text-xs min-h-[36px]">Edit</button>
        <button onClick={() => onDelete(story.id)} className="w-full bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl px-3 py-1 text-xs hover:bg-red-500/30 transition-all min-h-[36px]">Delete</button>
      </div>
    </div>
  );
}

function KanbanColumn({ column, stories, onEdit, onDelete, activeId }) {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div className="flex flex-col">
      <div className="glass-card p-3 mb-3">
        <h2 className={`text-sm font-bold ${column.color}`}>{column.label}</h2>
        <span className="text-xs text-white/40">{stories.length}</span>
      </div>
      <SortableContext items={stories.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3 min-h-[60px]">
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onEdit={onEdit}
              onDelete={onDelete}
              isDragging={activeId === story.id}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const { user, token, logout } = useAuthStore();
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    loadStories();

    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) closeModal();
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

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData(EMPTY_FORM);
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    const result = userStorySchema.safeParse(formData);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach(err => { if (err.path[0]) errs[err.path[0]] = err.message; });
      setFormErrors(errs);
      return;
    }

    const payload = {
      title: `En tant que ${formData.asA}, je veux ${formData.iWant}`,
      description: `Afin de ${formData.soThat}`,
      priority: formData.priority,
      status: formData.status
    };
    try {
      if (editId) {
        await api.updateUserStory(token, editId, payload);
        analytics.userStoryUpdate();
        toast.success('User Story modifiée');
      } else {
        await api.createUserStory(token, payload);
        analytics.userStoryCreate();
        toast.success('User Story créée');
      }
      closeModal();
      loadStories();
    } catch (err) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (story) => {
    const titleMatch = story.title.match(/En tant que (.+?), je veux (.+)/);
    const descMatch = story.description?.match(/Afin de (.+)/);
    setFormData({
      asA:      titleMatch ? titleMatch[1] : '',
      iWant:    titleMatch ? titleMatch[2] : story.title,
      soThat:   descMatch  ? descMatch[1]  : story.description || '',
      priority: story.priority,
      status:   story.status
    });
    setEditId(story.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette User Story ?')) return;
    try {
      await api.deleteUserStory(token, id);
      analytics.userStoryDelete();
      toast.success('User Story supprimée');
      loadStories();
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = async ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const draggedStory = stories.find(s => s.id === active.id);
    if (!draggedStory) return;

    // Trouver la colonne cible (over peut être une story ou une colonne)
    const targetStory = stories.find(s => s.id === over.id);
    const isColumn = COLUMNS.find(c => c.id === over.id);
    const targetStatus = isColumn ? over.id : (targetStory ? targetStory.status : over.id);

    if (!COLUMNS.find(c => c.id === targetStatus)) return;
    if (draggedStory.status === targetStatus) return;

    // Update optimiste
    const previousStories = stories;
    setStories(prev => prev.map(s => s.id === active.id ? { ...s, status: targetStatus } : s));

    try {
      await api.updateStoryStatus(token, active.id, targetStatus, 0);
      analytics.kanbanDrag(draggedStory.status, targetStatus);
    } catch (err) {
      setStories(previousStories);
      toast.error('Erreur lors du déplacement');
    }
  };

  const activeStory = stories.find(s => s.id === activeId);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 sm:p-8">
        <div className="max-w-[1600px] mx-auto">

          <div className="glass-card p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Kanban Board</h1>
                <p className="text-white/60 mt-1 text-sm">
                  {user?.name} <span className="text-[#0D8B7D] text-xs">({user?.role})</span>
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto bg-[#0D8B7D] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#0c7a6d] transition-all min-h-[44px]"
              >
                + Add Task
              </button>
            </div>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 pb-4">
              {COLUMNS.map(col => (
                <KanbanColumn
                  key={col.id}
                  column={col}
                  stories={stories.filter(s => s.status === col.id).sort((a, b) => {
                    const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
                    return pd !== 0 ? pd : b.id - a.id;
                  })}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  activeId={activeId}
                />
              ))}
            </div>

            <DragOverlay>
              {activeStory && (
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-4 shadow-2xl opacity-90">
                  <h3 className="text-sm font-semibold text-white/90">{activeStory.title}</h3>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="glass-card w-full max-w-lg p-4 sm:p-6 relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none" aria-label="Fermer">×</button>
              <h2 className="text-lg font-bold mb-4">{editId ? 'Modifier' : 'Nouvelle'} User Story</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">En tant que</label>
                  <input type="text" value={formData.asA} onChange={(e) => setFormData({...formData, asA: e.target.value})} className="glass-input w-full" placeholder="utilisateur, admin..." required />
                  {formErrors.asA && <p className="text-red-400 text-xs mt-1">{formErrors.asA}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Je veux</label>
                  <textarea value={formData.iWant} onChange={(e) => setFormData({...formData, iWant: e.target.value})} className="glass-input w-full min-h-[80px]" rows="3" required />
                  {formErrors.iWant && <p className="text-red-400 text-xs mt-1">{formErrors.iWant}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Afin de</label>
                  <textarea value={formData.soThat} onChange={(e) => setFormData({...formData, soThat: e.target.value})} className="glass-input w-full min-h-[80px]" rows="3" required />
                  {formErrors.soThat && <p className="text-red-400 text-xs mt-1">{formErrors.soThat}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priorité</label>
                    <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="glass-input w-full">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="glass-input w-full">
                      {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={closeModal} className="flex-1 glass-button min-h-[44px]">Annuler</button>
                  <button type="submit" className="flex-1 bg-[#0D8B7D] text-white rounded-xl px-4 py-2 font-semibold hover:bg-[#0c7a6d] transition-all min-h-[44px]">{editId ? 'Sauvegarder' : 'Ajouter'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
