import { Request, Response } from 'express';
import * as experienceService from '../services/experienceService';

export const createExperience = async (req: Request, res: Response) => {
  try {
    const { title, description, listingId } = req.body;
    // Correction 1 : cast explicite pour accéder à req.user
    const userId = (req as any).user?.id;
    // Correction 2 : vérification d'authentification
    if (!userId) {
      return res.status(401).json({ error: "Authentification requise" });
    }
    let image: string | undefined;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const experience = await experienceService.createExperience({
      title,
      description,
      image,
      userId,
      listingId: listingId ? Number(listingId) : undefined,
    });
    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de l'expérience" });
  }
};

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await experienceService.getAllExperiences();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des expériences' });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const experience = await experienceService.getExperienceById(id);
    if (!experience) return res.status(404).json({ error: 'Expérience non trouvée' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'expérience' });
  }
};
