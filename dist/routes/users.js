"use strict";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const validate_1 = require("../middlewares/validate");
const userValidator_1 = require("../validators/userValidator");
const router = express_1.default.Router();
// Route admin only
router.get("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.requireRole)('admin'), userController_1.getUsers);
// Protected routes
router.get("/me", authMiddleware_1.authenticate, userController_1.getMe);
router.put("/me", authMiddleware_1.authenticate, (0, validate_1.validateBody)(userValidator_1.updateUserSchema), userController_1.updateMe);
// Nouvelle route pour update avec upload (multipart)
router.post("/me", authMiddleware_1.authenticate, uploadMiddleware_1.upload.single('avatar'), userController_1.updateMe);
router.delete("/me", authMiddleware_1.authenticate, userController_1.deleteMe);
exports.default = router;
