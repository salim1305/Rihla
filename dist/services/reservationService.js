"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservationById = exports.getReservations = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getReservations = async () => {
    return prisma.reservation.findMany({ include: { user: true, listing: true } });
};
exports.getReservations = getReservations;
const getReservationById = async (id) => {
    return prisma.reservation.findUnique({ where: { id }, include: { user: true, listing: true } });
};
exports.getReservationById = getReservationById;
const createReservation = async (data) => {
    return prisma.reservation.create({ data });
};
exports.createReservation = createReservation;
const updateReservation = async (id, data) => {
    return prisma.reservation.update({ where: { id }, data });
};
exports.updateReservation = updateReservation;
const deleteReservation = async (id) => {
    return prisma.reservation.delete({ where: { id } });
};
exports.deleteReservation = deleteReservation;
