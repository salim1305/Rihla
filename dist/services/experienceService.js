"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperienceById = exports.getAllExperiences = exports.createExperience = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient")); // Vérifie bien la casse du fichier !
const createExperience = async (data) => {
    // On clone l'objet pour ne pas muter l'original
    const cleanData = { ...data };
    if (cleanData.listingId === undefined ||
        cleanData.listingId === null ||
        cleanData.listingId === '') {
        delete cleanData.listingId;
    }
    return prismaClient_1.default.experience.create({ data: cleanData });
};
exports.createExperience = createExperience;
const getAllExperiences = async () => {
    return prismaClient_1.default.experience.findMany({
        include: { user: true, listing: true },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getAllExperiences = getAllExperiences;
const getExperienceById = async (id) => {
    return prismaClient_1.default.experience.findUnique({
        where: { id },
        include: { user: true, listing: true },
    });
};
exports.getExperienceById = getExperienceById;
