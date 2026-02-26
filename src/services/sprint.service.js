import api from './api';

export const sprintService = {
  getAll: () => api.get('/sprints'),
  getById: (id) => api.get(`/sprints/${id}`),
  create: (data) => api.post('/sprints', data),
  update: (id, data) => api.put(`/sprints/${id}`, data),
  delete: (id) => api.delete(`/sprints/${id}`),
  addUserStory: (sprintId, userStoryId) => api.post(`/sprints/${sprintId}/userstories`, { userStoryId })
};
