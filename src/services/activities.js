import api from '../services/api';

export async function getActivities(dayId, token) {
  return await api.get(`activities/${dayId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function signUpActivity(id, token) {
  return await api.put(`activities/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getActivitiesUser(token) {
  return await api.get('activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
