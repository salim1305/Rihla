import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReviews = async () => prisma.review.findMany({ include: { user: true, listing: true } });
export const getReviewById = async (id: number) => prisma.review.findUnique({ where: { id }, include: { user: true, listing: true } });
export const createReview = async (data: { userId: number; listingId: number; rating: number; comment?: string }) => prisma.review.create({ data });
export const updateReview = async (id: number, data: Partial<{ rating: number; comment?: string }>) => prisma.review.update({ where: { id }, data });
export const deleteReview = async (id: number) => prisma.review.delete({ where: { id } });