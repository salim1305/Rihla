import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
  });
};

export const updateUser = async (id: number, data: { name?: string; email?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};