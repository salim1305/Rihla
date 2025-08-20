import express from 'express';
import { requireAdmin } from '../middlewares/adminMiddleware';
import { authenticate } from '../middlewares/authMiddleware';
import prisma from '../utils/prismaClient';

const router = express.Router();

// Exemple : voir tous les utilisateurs
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Voir toutes les réservations
router.get('/reservations', authenticate, requireAdmin, async (req, res) => {
  const reservations = await prisma.reservation.findMany({ include: { user: true, listing: true } });
  res.json(reservations);
});

// Voir toutes les expériences
router.get('/experiences', authenticate, requireAdmin, async (req, res) => {
  const experiences = await prisma.experience.findMany({ include: { user: true, listing: true } });
  res.json(experiences);
});

// Voir toutes les annonces
router.get('/listings', authenticate, requireAdmin, async (req, res) => {
  const listings = await prisma.listing.findMany({ include: { host: true, reservations: true, reviews: true, experiences: true } });
  res.json(listings);
});

// Tu pourras ajouter d'autres routes admin ici (stats, logs, support, etc.)

export default router;
