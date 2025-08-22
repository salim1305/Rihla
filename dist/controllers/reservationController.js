"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.createReservation = exports.getReservation = exports.getAllReservations = void 0;
const reservationService = __importStar(require("../services/reservationService"));
const getAllReservations = async (_req, res, next) => {
    try {
        const reservations = await reservationService.getReservations();
        res.json(reservations);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllReservations = getAllReservations;
const getReservation = async (req, res, next) => {
    try {
        const reservation = await reservationService.getReservationById(Number(req.params.id));
        res.json(reservation);
    }
    catch (err) {
        next(err);
    }
};
exports.getReservation = getReservation;
const createReservation = async (req, res, next) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    }
    catch (err) {
        next(err);
    }
};
exports.createReservation = createReservation;
const updateReservation = async (req, res, next) => {
    try {
        const reservation = await reservationService.updateReservation(Number(req.params.id), req.body);
        res.json(reservation);
    }
    catch (err) {
        next(err);
    }
};
exports.updateReservation = updateReservation;
const deleteReservation = async (req, res, next) => {
    try {
        await reservationService.deleteReservation(Number(req.params.id));
        res.json({ message: "Reservation deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteReservation = deleteReservation;
