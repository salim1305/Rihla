import express from 'express';
import * as experienceController from '../controllers/experienceController';
import { authenticate } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

// Créer une expérience (avec image optionnelle)
router.post('/', authenticate, upload.single('image'), experienceController.createExperience);

// Lister toutes les expériences
router.get('/', experienceController.getAllExperiences);

// Obtenir une expérience par id
router.get('/:id', experienceController.getExperienceById);

export default router;
