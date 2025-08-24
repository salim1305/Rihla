import { api } from './api.js';

const form = document.getElementById('hostExpForm');

// sélecteur des jours
const dayButtons = document.querySelectorAll(".days-selector button");
const hiddenDays = document.getElementById("selectedDays");
dayButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const selected = [...dayButtons].filter(b => b.classList.contains("active")).map(b => b.dataset.day);
    hiddenDays.value = selected.join(",");
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) return (window.location.href = 'connexion.html');

  const fd = new FormData(form);
  // Optionnel: remapper proprement tes champs pour le backend
  // ex: fd.set('title', ...), fd.set('price', ...), etc.

  try {
    await api.postForm('/api/listings', fd);
    alert('Expérience publiée avec succès !');
    window.location.href = 'profil.html';
  } catch (err) {
    alert(err.message || 'Erreur lors de la publication.');
  }
});
