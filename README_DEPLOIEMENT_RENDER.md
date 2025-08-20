# Déploiement de Rihla sur Render.com

## Prérequis
- Un compte gratuit sur https://render.com/
- Un compte GitHub (ou GitLab/Bitbucket) avec ton projet pushé dessus
- Ton domaine rihlama.com prêt à être configuré

## 1. Préparer le dépôt Git
- Mets à jour ton code local, commit & push tout sur GitHub

## 2. Créer la base PostgreSQL sur Render
1. Va sur https://dashboard.render.com/
2. Clique sur "New +" > "PostgreSQL"
3. Donne un nom (ex: rihla-db), choisis le plan gratuit
4. Une fois créée, copie l’URL de connexion (DATABASE_URL)

## 3. Déployer l’API Node.js/Express
1. "New +" > "Web Service"
2. Connecte ton repo GitHub
3. Build Command: `npm install && npx prisma generate`
4. Start Command: `npm run start` ou `node server.js` (selon ton projet)
5. Environment:
   - `DATABASE_URL` = (URL Render PostgreSQL)
   - `JWT_SECRET` = (une valeur secrète)
   - `PORT` = 10000 (ou laisse vide)
   - `NODE_ENV` = production
6. Clique "Create Web Service"
7. Une fois déployé, va dans l’onglet Shell et lance :
   - `npx prisma migrate deploy`

## 4. Déployer le frontend (HTML/CSS/JS)
- Si tu veux le servir via Express, rien à faire.
- Sinon, crée un "Static Site" sur Render, connecte le dossier frontend.

## 5. Lier le domaine rihlama.com
1. Dans Render, va sur ton service > Settings > Custom Domains
2. Ajoute rihlama.com
3. Suis les instructions DNS (ajoute un enregistrement CNAME ou A chez ton registrar)
4. SSL sera automatique

## 6. Adapter la config backend
- Mets à jour CORS dans Express pour autoriser rihlama.com
- Mets à jour les URLs dans le frontend si besoin

## 7. Tester
- Vérifie que tout fonctionne sur https://rihlama.com

---

Pour toute étape, demande-moi de générer le code, la config, ou de t’expliquer en détail !
