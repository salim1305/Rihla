import express from "express";
import {
  getAllReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationController";
import { authenticate } from "../middlewares/authMiddleware";
import { validateBody } from "../middlewares/validate";
import { reservationSchema } from "../validators/listingValidator";

const router = express.Router();

router.get("/", authenticate, getAllReservations);
router.get("/:id", authenticate, getReservation);
router.post("/", authenticate, validateBody(reservationSchema), createReservation);
router.put("/:id", authenticate, validateBody(reservationSchema), updateReservation);
router.delete("/:id", authenticate, deleteReservation);

export default router;