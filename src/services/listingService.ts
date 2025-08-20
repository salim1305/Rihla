import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllListings = async () => {
  return prisma.listing.findMany({
    include: { host: true, reservations: true, reviews: true },
  });
};

export const getListingById = async (id: number) => {
  return prisma.listing.findUnique({
    where: { id },
    include: { host: true, reservations: true, reviews: true },
  });
};

export const createListing = async (data: {
  hostId: number;
  title: string;
  description: string;
  price: number;
  location: string;
}) => {
  return prisma.listing.create({ data });
};

export const updateListing = async (id: number, data: Partial<{ title: string; description: string; price: number; location: string }>) => {
  return prisma.listing.update({ where: { id }, data });
};

export const deleteListing = async (id: number) => {
  return prisma.listing.delete({ where: { id } });
};
