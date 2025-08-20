import express from "express";
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} from "../controllers/listingController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateBody } from "../middlewares/validate";
import { listingSchema } from "../validators/listingValidator";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListing);
router.post("/", authenticate, validateBody(listingSchema), createListing);
router.put("/:id", authenticate, validateBody(listingSchema), updateListing);
router.delete("/:id", authenticate, deleteListing);

export default router;
