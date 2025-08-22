"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (role) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ error: "Forbidden: insufficient rights" });
    }
    if (req.user.role !== role) {
        return res.status(403).json({ error: "Forbidden: insufficient rights" });
    }
    next();
};
exports.requireRole = requireRole;
