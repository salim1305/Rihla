// js/experience.js
import { api } from './api.js';

export async function getExperiences() {
  return api.get('/experiences');
}

export async function createExperience(data) {
  return api.postForm('/experiences', data);
}

export async function getExperienceById(id) {
  return api.get(`/experiences/${id}`);
}
