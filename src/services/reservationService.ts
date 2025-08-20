import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReservations = async () => {
  return prisma.reservation.findMany({ include: { user: true, listing: true } });
};

export const getReservationById = async (id: number) => {
  return prisma.reservation.findUnique({ where: { id }, include: { user: true, listing: true } });
};

export const createReservation = async (data: {
  userId: number;
  listingId: number;
  startDate: Date;
  endDate: Date;
}) => {
  return prisma.reservation.create({ data });
};

export const updateReservation = async (id: number, data: Partial<{ startDate: Date; endDate: Date }>) => {
  return prisma.reservation.update({ where: { id }, data });
};

export const deleteReservation = async (id: number) => {
  return prisma.reservation.delete({ where: { id } });
};
