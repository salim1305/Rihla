// test-auth.js
// Script de test automatisé pour inscription, connexion et récupération du profil
import { register, login, getToken } from './auth.js';
import { getProfile } from './user.js';

async function testAuthFlow() {
  const email = `test${Date.now()}@rihla.com`;
  const password = 'test1234';
  console.log('Test inscription...');
  try {
    const reg = await register(email, password);
    console.log('Inscription OK:', reg);
  } catch (e) {
    console.error('Erreur inscription:', e.message);
    return;
  }
  console.log('Test connexion...');
  try {
    const log = await login(email, password);
    console.log('Connexion OK:', log);
  } catch (e) {
    console.error('Erreur connexion:', e.message);
    return;
  }
  if (!getToken()) {
    console.error('Token non stocké après connexion');
    return;
  }
  console.log('Test récupération profil...');
  try {
    const profile = await getProfile();
    console.log('Profil récupéré:', profile);
  } catch (e) {
    console.error('Erreur profil:', e.message);
    return;
  }
  console.log('Tous les tests sont passés ✅');
}

// Lance le test automatiquement si exécuté dans le navigateur
if (typeof window !== 'undefined') {
  window.testAuthFlow = testAuthFlow;
  // testAuthFlow(); // décommente pour lancer automatiquement
}
