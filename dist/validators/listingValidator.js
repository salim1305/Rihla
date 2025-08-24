"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.reservationSchema = exports.listingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.listingSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    description: joi_1.default.string().min(10).max(1000).required(),
    price: joi_1.default.number().positive().required(),
    location: joi_1.default.string().min(2).max(100).required(),
    photos: joi_1.default.array().items(joi_1.default.string()).optional(),
});
exports.reservationSchema = joi_1.default.object({
    listingId: joi_1.default.number().required(),
    startDate: joi_1.default.date().iso().required(),
    endDate: joi_1.default.date().iso().greater(joi_1.default.ref('startDate')).required(),
    guests: joi_1.default.number().min(1).max(20).required(),
});
exports.reviewSchema = joi_1.default.object({
    listingId: joi_1.default.number().required(),
    rating: joi_1.default.number().min(1).max(5).required(),
    comment: joi_1.default.string().min(3).max(500).required(),
});
