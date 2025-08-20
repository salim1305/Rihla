/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs (admin seulement)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Récupère le profil de l'utilisateur connecté
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *       401:
 *         description: Non autorisé
 *   put:
 *     summary: Met à jour le profil de l'utilisateur connecté
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *   delete:
 *     summary: Supprime le compte de l'utilisateur connecté
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Compte supprimé
 *       401:
 *         description: Non autorisé
 */

import express from "express";
import { getUsers, getMe, updateMe, deleteMe } from "../controllers/userController";
import { upload } from "../middlewares/uploadMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
import { validateBody } from "../middlewares/validate";
import { updateUserSchema } from "../validators/userValidator";

const router = express.Router();

// Route admin only
router.get("/", authenticate, requireRole('admin'), getUsers);

// Protected routes
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, validateBody(updateUserSchema), updateMe);
// Nouvelle route pour update avec upload (multipart)
router.post("/me", authenticate, upload.single('avatar'), updateMe);
router.delete("/me", authenticate, deleteMe);

export default router;