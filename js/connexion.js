import { login } from './auth.js';

const form = document.getElementById('login-form');
const errorEl = document.getElementById('login-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = '';
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await login(email, password);
    if (res?.token) {
      localStorage.setItem('token', res.token);
      window.location.href = 'profil.html';
    } else {
      errorEl.textContent = res?.error || res?.message || 'Erreur de connexion.';
    }
  } catch (err) {
    errorEl.textContent = err.message || 'Erreur serveur.';
  }
});
