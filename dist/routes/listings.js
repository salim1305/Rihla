"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingController_1 = require("../controllers/listingController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validate_1 = require("../middlewares/validate");
const listingValidator_1 = require("../validators/listingValidator");
const router = express_1.default.Router();
router.get("/", listingController_1.getListings);
router.get("/:id", listingController_1.getListing);
router.post("/", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.listingSchema), listingController_1.createListing);
router.put("/:id", authMiddleware_1.authenticate, (0, validate_1.validateBody)(listingValidator_1.listingSchema), listingController_1.updateListing);
router.delete("/:id", authMiddleware_1.authenticate, listingController_1.deleteListing);
exports.default = router;
