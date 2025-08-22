"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const router = express_1.default.Router();
// Exemple : voir tous les utilisateurs
router.get('/users', authMiddleware_1.authenticate, adminMiddleware_1.requireAdmin, async (req, res) => {
    const users = await prismaClient_1.default.user.findMany();
    res.json(users);
});
// Voir toutes les réservations
router.get('/reservations', authMiddleware_1.authenticate, adminMiddleware_1.requireAdmin, async (req, res) => {
    const reservations = await prismaClient_1.default.reservation.findMany({ include: { user: true, listing: true } });
    res.json(reservations);
});
// Voir toutes les expériences
router.get('/experiences', authMiddleware_1.authenticate, adminMiddleware_1.requireAdmin, async (req, res) => {
    const experiences = await prismaClient_1.default.experience.findMany({ include: { user: true, listing: true } });
    res.json(experiences);
});
// Voir toutes les annonces
router.get('/listings', authMiddleware_1.authenticate, adminMiddleware_1.requireAdmin, async (req, res) => {
    const listings = await prismaClient_1.default.listing.findMany({ include: { host: true, reservations: true, reviews: true, experiences: true } });
    res.json(listings);
});
// Tu pourras ajouter d'autres routes admin ici (stats, logs, support, etc.)
exports.default = router;
