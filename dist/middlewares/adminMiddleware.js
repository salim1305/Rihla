"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
function requireAdmin(req, res, next) {
    const user = req.user;
    if (!user || user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });
    }
    next();
}
