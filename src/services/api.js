const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = {
  async register(name, email, password, role) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getUserStories(token) {
    const res = await fetch(`${API_URL}/userstories`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async createUserStory(token, data) {
    const res = await fetch(`${API_URL}/userstories`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateUserStory(token, id, data) {
    const res = await fetch(`${API_URL}/userstories/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async updateStoryStatus(token, id, status, position) {
    const res = await fetch(`${API_URL}/userstories/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status, position })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async deleteUserStory(token, id) {
    const res = await fetch(`${API_URL}/userstories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async changePassword(token, oldPassword, newPassword) {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};

export default api;
