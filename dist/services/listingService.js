"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.createListing = exports.getListingById = exports.getAllListings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllListings = async () => {
    return prisma.listing.findMany({
        include: { host: true, reservations: true, reviews: true },
    });
};
exports.getAllListings = getAllListings;
const getListingById = async (id) => {
    return prisma.listing.findUnique({
        where: { id },
        include: { host: true, reservations: true, reviews: true },
    });
};
exports.getListingById = getListingById;
const createListing = async (data) => {
    return prisma.listing.create({ data });
};
exports.createListing = createListing;
const updateListing = async (id, data) => {
    return prisma.listing.update({ where: { id }, data });
};
exports.updateListing = updateListing;
const deleteListing = async (id) => {
    return prisma.listing.delete({ where: { id } });
};
exports.deleteListing = deleteListing;
