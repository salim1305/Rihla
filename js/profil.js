// JS pour la page profil.html (extraction du script inline)
import { logout } from './auth.js';
import { getProfile } from './user.js';

// Redirige si pas connecté
const token = localStorage.getItem('token');
if (!token) window.location.href = 'connexion.html';

// Remplir le profil avec les vraies infos utilisateur
(async () => {
  try {
    const data = await getProfile();
    // Afficher l'avatar
    if (data.avatar) {
      document.getElementById('profileAvatar').src = data.avatar;
    }
    // Afficher prénom/nom si possible
    let displayName = data.name || '';
    if (data.name) {
      const parts = data.name.split(' ');
      if (parts.length > 1) {
        displayName = `<span>${parts[0]}</span> <span>${parts.slice(1).join(' ')}</span>`;
      }
    }
    document.getElementById('profileName').innerHTML = displayName;
  } catch (e) {
    logout();
  }
})();

// Activer le bouton 'Éditer le profil' de façon fiable (id dédié)
const editBtn = document.getElementById('editProfileBtn');
if (editBtn) {
  editBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'editer-profil.html';
  });
}

// Tabs
function activateTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('is-active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('is-active'));
  tab.classList.add('is-active');
  document.getElementById('tab-' + tab.dataset.tab).classList.add('is-active');
}
document.querySelectorAll('button.tab').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    activateTab(btn);
  });
});

// transformer le lien "Connexion" en "Déconnexion" si présent
const links = document.querySelectorAll('.nav-links a, .footer a');
links.forEach(a => {
  if (a.textContent?.trim().toLowerCase().includes('déconnexion')) {
    a.addEventListener('click', (e) => { e.preventDefault(); logout(); });
  }
});
