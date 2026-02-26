import { useState, useEffect } from 'react';
import { sprintService } from '../services/sprint.service';
import { Plus, Calendar, Target } from 'lucide-react';

export default function SprintList() {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSprints();
  }, []);

  const loadSprints = async () => {
    try {
      const { data } = await sprintService.getAll();
      setSprints(data);
    } catch (error) {
      console.error('Error loading sprints:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      planned: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || colors.planned;
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sprints</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          New Sprint
        </button>
      </div>

      <div className="grid gap-4">
        {sprints.map(sprint => (
          <div key={sprint.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{sprint.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sprint.status)}`}>
                  {sprint.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {sprint.userStories?.length || 0} stories
              </div>
            </div>

            {sprint.goal && (
              <div className="flex items-start gap-2 mb-4 text-gray-700">
                <Target size={18} className="mt-1 flex-shrink-0" />
                <p>{sprint.goal}</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(sprint.startDate).toLocaleDateString()}</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(sprint.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
