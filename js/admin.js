
import { api } from './api.js';

export async function getAdminUsers(token) {
  return api.get('/admin/users', token);
}
export async function getAdminReservations(token) {
  return api.get('/admin/reservations', token);
}
export async function getAdminExperiences(token) {
  return api.get('/admin/experiences', token);
}
export async function getAdminListings(token) {
  return api.get('/admin/listings', token);
}

// Affichage dynamique du dashboard admin
const token = localStorage.getItem('token');
const content = document.getElementById('admin-content');

function renderList(title, items, renderItem) {
  content.innerHTML = `<h2>${title}</h2>` + (items.length ? items.map(renderItem).join('') : '<p>Aucune donnée.</p>');
}

async function showUsers() {
  try {
    const users = await getAdminUsers(token);
    renderList('Utilisateurs', users, u => `<div><b>${u.email}</b> (${u.role})</div>`);
  } catch (e) { content.innerHTML = '<h2>Accès refusé</h2>'; }
}
async function showReservations() {
  try {
    const reservations = await getAdminReservations(token);
    renderList('Réservations', reservations, r => `<div>${r.user?.email} → ${r.listing?.title} du ${new Date(r.startDate).toLocaleDateString()} au ${new Date(r.endDate).toLocaleDateString()}</div>`);
  } catch (e) { content.innerHTML = '<h2>Accès refusé</h2>'; }
}
async function showExperiences() {
  try {
    const experiences = await getAdminExperiences(token);
    renderList('Expériences', experiences, e => `<div><b>${e.title}</b> par ${e.user?.email} (${e.listing?.title || 'Aucune annonce'})</div>`);
  } catch (e) { content.innerHTML = '<h2>Accès refusé</h2>'; }
}
async function showListings() {
  try {
    const listings = await getAdminListings(token);
    renderList('Annonces', listings, l => `<div><b>${l.title}</b> par ${l.host?.userId} (${l.reservations.length} réservations, ${l.reviews.length} avis, ${l.experiences.length} expériences)</div>`);
  } catch (e) { content.innerHTML = '<h2>Accès refusé</h2>'; }
}

document.getElementById('tab-users').onclick = showUsers;
document.getElementById('tab-reservations').onclick = showReservations;
document.getElementById('tab-experiences').onclick = showExperiences;
document.getElementById('tab-listings').onclick = showListings;

// Affiche les utilisateurs par défaut
showUsers();
