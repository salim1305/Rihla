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
exports.deleteListing = exports.updateListing = exports.createListing = exports.getListing = exports.getListings = void 0;
const listingService = __importStar(require("../services/listingService"));
const getListings = async (_req, res, next) => {
    try {
        const listings = await listingService.getAllListings();
        res.json(listings);
    }
    catch (err) {
        next(err);
    }
};
exports.getListings = getListings;
const getListing = async (req, res, next) => {
    try {
        const listing = await listingService.getListingById(Number(req.params.id));
        res.json(listing);
    }
    catch (err) {
        next(err);
    }
};
exports.getListing = getListing;
const createListing = async (req, res, next) => {
    try {
        // Récupère les chemins des fichiers uploadés
        let photos = [];
        if (req.files && Array.isArray(req.files)) {
            photos = req.files.map((file) => file.path.replace(/\\/g, '/'));
        }
        const data = { ...req.body, photos };
        const listing = await listingService.createListing(data);
        res.status(201).json(listing);
    }
    catch (err) {
        next(err);
    }
};
exports.createListing = createListing;
const updateListing = async (req, res, next) => {
    try {
        const listing = await listingService.updateListing(Number(req.params.id), req.body);
        res.json(listing);
    }
    catch (err) {
        next(err);
    }
};
exports.updateListing = updateListing;
const deleteListing = async (req, res, next) => {
    try {
        await listingService.deleteListing(Number(req.params.id));
        res.json({ message: "Listing deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteListing = deleteListing;
