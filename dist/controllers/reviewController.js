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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReview = exports.getAllReviews = void 0;
const reviewService = __importStar(require("../services/reviewService"));
const getAllReviews = async (_req, res, next) => {
    try {
        res.json(await reviewService.getReviews());
    }
    catch (err) {
        next(err);
    }
};
exports.getAllReviews = getAllReviews;
const getReview = async (req, res, next) => {
    try {
        res.json(await reviewService.getReviewById(Number(req.params.id)));
    }
    catch (err) {
        next(err);
    }
};
exports.getReview = getReview;
const createReview = async (req, res, next) => {
    try {
        res.status(201).json(await reviewService.createReview(req.body));
    }
    catch (err) {
        next(err);
    }
};
exports.createReview = createReview;
const updateReview = async (req, res, next) => {
    try {
        res.json(await reviewService.updateReview(Number(req.params.id), req.body));
    }
    catch (err) {
        next(err);
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res, next) => {
    try {
        await reviewService.deleteReview(Number(req.params.id));
        res.json({ message: "Review deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteReview = deleteReview;
