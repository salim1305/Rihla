// js/config.js
// Configuration globale pour l'application Rihla
// Ce fichier doit être inclus avant les autres scripts dans les pages HTML

(function() {
  // Configuration par défaut
  const defaultConfig = {
    API_BASE_URL: "http://localhost:5000",
    APP_ENV: "development"
  };

  // Détection automatique de l'environnement basée sur l'URL actuelle
  function detectEnvironment() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return {
        API_BASE_URL: "http://localhost:5000",
        APP_ENV: "development"
      };
    } else {
      // En production, essayer de deviner l'URL de l'API
      const protocol = window.location.protocol;
      const port = window.location.port;
      
      // Si c'est un sous-domaine api.*
      if (hostname.startsWith('api.')) {
        return {
          API_BASE_URL: `${protocol}//${hostname}${port ? ':' + port : ''}`,
          APP_ENV: "production"
        };
      }
      
      // Sinon, assume que l'API est sur le même domaine avec le port 5000 ou sur un sous-domaine
      return {
        API_BASE_URL: `${protocol}//api.${hostname.replace('www.', '')}`,
        APP_ENV: "production"
      };
    }
  }

  // Fusionner avec la configuration détectée
  const config = { ...defaultConfig, ...detectEnvironment() };

  // Rendre la configuration disponible globalement
  window.__RIHLA_CONFIG__ = config;
  window.__RIHLA_API__ = config.API_BASE_URL;

  // Afficher la configuration en mode debug
  if (config.APP_ENV === "development") {
    console.log("🔧 Configuration Rihla:", config);
  }
})();