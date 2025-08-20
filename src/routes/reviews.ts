import express from "express";
import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateBody } from "../middlewares/validate";
import { reviewSchema } from "../validators/listingValidator";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReview);
router.post("/", authenticate, validateBody(reviewSchema), createReview);
router.put("/:id", authenticate, validateBody(reviewSchema), updateReview);
router.delete("/:id", authenticate, deleteReview);

export default router;