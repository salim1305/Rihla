import { getExperiences, createExperience } from './js/experience.js';

async function renderExperiences() {
  const list = document.getElementById('experiences-list');
  list.innerHTML = '';
  const experiences = await getExperiences();
  experiences.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'experience';
    div.innerHTML = `
      <h3>${exp.title}</h3>
      <p>${exp.description}</p>
      ${exp.image ? `<img src="${exp.image}" style="max-width:200px;">` : ''}
    `;
    list.appendChild(div);
  });
}
// ... (complète le code ici si besoin) ...
