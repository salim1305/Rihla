# Configuration DNS et Déploiement - Rihla

## Problème DNS résolu

Ce document décrit les solutions apportées aux problèmes de configuration DNS dans l'application Rihla.

### Problèmes identifiés et résolus

1. **Erreur DNS Prisma** : `getaddrinfo ENOTFOUND binaries.prisma.sh`
   - **Solution** : Simplification de la configuration Prisma pour utiliser uniquement les binaires natifs
   - **Fichier modifié** : `prisma/schema.prisma`

2. **URLs hardcodées** : Les URLs d'API étaient hardcodées sur `localhost:5000`
   - **Solution** : Configuration dynamique via variables d'environnement
   - **Fichiers modifiés** : `src/index.ts`, `js/api.js`, `auth-client.js`

3. **CORS restrictif** : Seulement localhost autorisé
   - **Solution** : Configuration CORS basée sur les variables d'environnement
   - **Fichier modifié** : `src/index.ts`

## Configuration des variables d'environnement

### Fichier `.env`

```bash
# Configuration de base
PORT=5000
NODE_ENV=production

# Base de données
DATABASE_URL="postgresql://user:password@host:port/db"

# Sécurité
JWT_SECRET="your-strong-jwt-secret-here"
JWT_REFRESH_SECRET="your-strong-refresh-secret-here"

# Configuration des domaines pour CORS et API
FRONTEND_URL="https://votredomaine.com,https://www.votredomaine.com"
API_BASE_URL="https://api.votredomaine.com"
```

## Déploiement par environnement

### Développement local
```bash
FRONTEND_URL="http://localhost:3000,http://localhost:5500,http://127.0.0.1:5500"
API_BASE_URL="http://localhost:5000"
```

### Production
```bash
FRONTEND_URL="https://rihla.com,https://www.rihla.com"
API_BASE_URL="https://api.rihla.com"
```

## Configuration DNS recommandée

### Structure des domaines

1. **Frontend** : `https://rihla.com` ou `https://www.rihla.com`
2. **API Backend** : `https://api.rihla.com`
3. **Documentation** : `https://api.rihla.com/api-docs`

### Configuration DNS requise

```
# Enregistrements A/AAAA ou CNAME
rihla.com          -> IP_du_serveur_frontend
www.rihla.com      -> rihla.com (CNAME)
api.rihla.com      -> IP_du_serveur_backend
```

## Configuration automatique du frontend

Le fichier `js/config.js` détecte automatiquement l'environnement :

- **Localhost** : Utilise `http://localhost:5000`
- **Production** : Utilise `https://api.domaine.com` basé sur l'URL actuelle

### Inclusion dans les pages HTML

Ajoutez avant les autres scripts :
```html
<script src="js/config.js"></script>
```

## Résolution des problèmes DNS

### 1. Prisma ne peut pas télécharger les binaires

**Problème** : `getaddrinfo ENOTFOUND binaries.prisma.sh`

**Solutions** :
1. Utiliser uniquement les binaires natifs (fait)
2. Si nécessaire, pré-télécharger les binaires dans un environnement avec accès internet
3. Utiliser une image Docker avec Prisma pré-installé

### 2. API non accessible depuis le frontend

**Vérifications** :
1. Variable `API_BASE_URL` correctement définie
2. CORS configuré pour autoriser le domaine frontend
3. Certificats SSL valides en HTTPS
4. Firewall/réseau autorise les connexions

### 3. Configuration CORS

Le backend accepte maintenant les origines définies dans `FRONTEND_URL` :
```typescript
const frontendUrls = process.env.FRONTEND_URL?.split(',') || [
  "http://localhost:3000",
  "http://localhost:5500", 
  "http://127.0.0.1:5500",
];
```

## Commandes utiles

```bash
# Test de résolution DNS
nslookup api.votredomaine.com

# Test de connectivité API
curl https://api.votredomaine.com/

# Vérification des variables d'environnement
npm run build && npm start

# Génération Prisma (après résolution DNS)
npm run generate
```

## Support

En cas de problèmes persistants :
1. Vérifier la configuration DNS du domaine
2. Tester la connectivité réseau
3. Consulter les logs du serveur
4. Vérifier les certificats SSL/TLS