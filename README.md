# Rihla API Backend

## Description
Backend Node.js/TypeScript sécurisé, documenté et prêt pour la production pour la plateforme Rihla (expériences & voyages).

## Fonctionnalités principales
- Authentification JWT sécurisée
- Gestion des utilisateurs, annonces, réservations, avis
- Validation des entrées (Joi)
- Sécurité (helmet, rate limiting, CORS)
- Logs structurés (Winston, morgan)
- Documentation Swagger (OpenAPI) sur `/api-docs`
- Gestion centralisée des erreurs
- Structure modulaire (services, contrôleurs, middlewares, routes)

## Lancer le projet
```bash
npm install
npx prisma generate
npx prisma migrate deploy # ou migrate dev pour dev
npx nodemon --watch "src/**/*.ts" --exec "npx ts-node src/index.ts"
```

## Variables d'environnement (.env)
```
PORT=5000
JWT_SECRET=un_secret_fort
DATABASE_URL=postgresql://user:password@host:port/db
```

## Tests
À venir : structure Jest/supertest pour tests unitaires et d'intégration.

## Documentation API
Swagger disponible sur : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Production
- Utiliser un reverse proxy (Nginx, Caddy)
- Activer HTTPS
- Configurer les variables d'environnement
- Superviser les logs (Winston)
- Sécuriser la base de données

# Frontend Rihla

- Placez vos scripts JS dans /js, vos styles dans /css.
- Utilisez les modules JS pour tous les appels API et l’authentification.
- Pour déployer, servez le dossier avec un serveur statique (ex: `npx serve .`).

Pour toute page nécessitant l’authentification, vérifiez le token au chargement :
import { getToken } from './js/auth.js';
if (!getToken()) window.location.href = 'connexion.html';

---
© Rihla 2025
