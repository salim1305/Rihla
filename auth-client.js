// auth-client.js
// Gestion centralisée de l'authentification et des appels API pour un frontend HTML/JS

// Configuration de l'API - utilise une variable globale ou l'environnement, sinon localhost par défaut
const API_URL = window.__RIHLA_API__ || 
  (typeof process !== 'undefined' && process.env?.API_BASE_URL) || 
  "http://localhost:5000";

export async function register(email, password, role = "user") {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function getProfile() {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { "Authorization": "Bearer " + token }
  });
  return res.json();
}

export async function updateProfile(data) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getListings() {
  const res = await fetch(`${API_URL}/listings`);
  return res.json();
}

export async function createListing(listing) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  const res = await fetch(`${API_URL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(listing)
  });
  return res.json();
}
// Ajoute d'autres fonctions selon les besoins (réservations, avis, etc.)
