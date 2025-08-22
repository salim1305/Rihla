"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperienceById = exports.getAllExperiences = exports.createExperience = void 0;
const experienceService = __importStar(require("../services/experienceService"));
const createExperience = async (req, res) => {
    try {
        const { title, description, listingId } = req.body;
        // Correction 1 : cast explicite pour accéder à req.user
        const userId = req.user?.id;
        // Correction 2 : vérification d'authentification
        if (!userId) {
            return res.status(401).json({ error: "Authentification requise" });
        }
        let image;
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
    }
    catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'expérience" });
    }
};
exports.createExperience = createExperience;
const getAllExperiences = async (req, res) => {
    try {
        const experiences = await experienceService.getAllExperiences();
        res.json(experiences);
    }
    catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des expériences' });
    }
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const experience = await experienceService.getExperienceById(id);
        if (!experience)
            return res.status(404).json({ error: 'Expérience non trouvée' });
        res.json(experience);
    }
    catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'expérience' });
    }
};
exports.getExperienceById = getExperienceById;
