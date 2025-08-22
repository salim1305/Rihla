"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationController_1 = require("../controllers/reservationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validate_1 = require("../middlewares/validate");
const listingValidator_1 = require("../validators/listingValidator");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticate, reservationController_1.getAllReservations);
router.get("/:id", authMiddleware_1.authenticate, reservationController_1.getReservation);
router.post("/", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.reservationSchema), reservationController_1.createReservation);
router.put("/:id", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.reservationSchema), reservationController_1.updateReservation);
router.delete("/:id", authMiddleware_1.authenticate, reservationController_1.deleteReservation);
exports.default = router;
