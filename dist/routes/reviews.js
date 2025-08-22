"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validate_1 = require("../middlewares/validate");
const listingValidator_1 = require("../validators/listingValidator");
const router = express_1.default.Router();
router.get("/", reviewController_1.getAllReviews);
router.get("/:id", reviewController_1.getReview);
router.post("/", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.reviewSchema), reviewController_1.createReview);
router.put("/:id", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.reviewSchema), reviewController_1.updateReview);
router.delete("/:id", authMiddleware_1.authenticate, reviewController_1.deleteReview);
exports.default = router;
