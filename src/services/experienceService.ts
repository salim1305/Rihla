import prisma from '../utils/prismaClient'; // Vérifie bien la casse du fichier !

// Typage plus strict pour éviter les erreurs
type ExperienceInput = {
  title: string;
  description: string;
  image?: string;
  userId: number;
  listingId?: number;
};

export const createExperience = async (data: ExperienceInput) => {
  // On clone l'objet pour ne pas muter l'original
  const cleanData: any = { ...data };
  if (
    cleanData.listingId === undefined ||
    cleanData.listingId === null ||
    cleanData.listingId === ''
  ) {
    delete cleanData.listingId;
  }
  return prisma.experience.create({ data: cleanData });
};

export const getAllExperiences = async () => {
  return prisma.experience.findMany({
    include: { user: true, listing: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getExperienceById = async (id: number) => {
  return prisma.experience.findUnique({
    where: { id },
    include: { user: true, listing: true },
  });
};
