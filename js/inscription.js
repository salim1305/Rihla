import { register } from './js/auth.js';

const form = document.getElementById('signupForm');
const steps = form.querySelectorAll('.form-step');
const nextBtns = form.querySelectorAll('.next-step');
const prevBtns = form.querySelectorAll('.prev-step');
let current = 0;

function setStep(i) {
  current = Math.max(0, Math.min(i, steps.length - 1));
  steps.forEach((s, idx) => s.classList.toggle('is-active', idx === current));
  // Mettre à jour la barre de progression si elle existe
}
// ... (complète le code ici si besoin) ...
