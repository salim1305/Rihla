import { getProfile, updateProfile } from './js/user.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getProfile();
    // Découper le nom si possible
    let firstname = '', lastname = '';
    if (data?.name) {
      const parts = data.name.split(' ');
      firstname = parts[0] || '';
      lastname = parts.slice(1).join(' ');
    }
    // ... (complète le code ici si besoin) ...
  } catch (e) {
    // ...
  }
});
