// user.js
import { api } from './api.js';

export async function getProfile() {
  return api.get('/users/me');
}

export async function updateProfile(data) {
  // Si data est un FormData, on envoie en POST multipart
  if (data instanceof FormData) {
    return api.postForm('/users/me', data);
  }
  return api.post('/users/me', data);
}
