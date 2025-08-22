"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = async () => {
    return prisma.user.findMany({
        select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
    });
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data,
        select: { id: true, email: true, name: true, avatar: true, createdAt: true, updatedAt: true },
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
