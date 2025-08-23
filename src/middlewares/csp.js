// Ajoute la politique CSP côté serveur Express pour toutes les routes
const csp = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "connect-src 'self' http://localhost:5000",
      "img-src 'self' data:",
      "style-src 'self'",
      "script-src 'self'"
    ].join('; ')
  );
  next();
};

module.exports = csp;
