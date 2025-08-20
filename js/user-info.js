import { getProfile } from './user.js';

(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const data = await getProfile();
    // Affiche le nom dans .user-name si présent
    document.querySelectorAll('.user-name').forEach(el => {
      el.textContent = data.name || '';
    });
    // Affiche la photo dans .user-avatar si présent
    document.querySelectorAll('.user-avatar').forEach(img => {
      if (data.avatar) img.src = data.avatar;
    });
  } catch (e) {
    // Si erreur, ne rien afficher
  }
})();
