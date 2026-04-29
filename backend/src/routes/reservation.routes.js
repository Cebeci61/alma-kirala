const express = require("express");
const router = express.Router();

const {
  createReservation,
  getMyReservations,
  getStoreReservations,
  updateReservationStatus
} = require("../controllers/reservation.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);
router.get("/store", protect, getStoreReservations);
router.put("/:id/status", protect, updateReservationStatus);
module.exports = router;