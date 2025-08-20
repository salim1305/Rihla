/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification et gestion des comptes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un JWT
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */

import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { validateBody } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/userValidator";

const router = express.Router();

// Routes d’authentification
router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);

export default router;