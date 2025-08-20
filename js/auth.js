import { api } from './api.js';

export async function login(email, password) {
  // Force string et trim pour éviter bug backend
  const data = await api.post('/auth/login', { email: String(email).trim(), password: String(password) });
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

export async function register(email, password) {
  // Validation stricte email côté frontend
  // On accepte un 3e argument optionnel : name
  const emailStr = String(email).trim();
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(emailStr)) {
    throw new Error('Veuillez saisir une adresse email valide.');
  }
  // name peut être undefined si appel legacy
  const payload = { email: emailStr, password: String(password) };
  if (arguments.length > 2 && arguments[2]) payload.name = arguments[2];
  return api.post('/auth/register', payload);
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = 'connexion.html';
}

export function getToken() {
  return localStorage.getItem('token');
}

