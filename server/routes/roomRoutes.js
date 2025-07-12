import express from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  joinRoom,
  leaveRoom,
  getMyRooms,
  searchRooms,
} from "../controllers/roomController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRoom);
router.get("/", getAllRooms);
router.get("/my", protect, getMyRooms);
router.get("/search", searchRooms);
router.get("/:id", getRoomById);
router.post("/:id/join", protect, joinRoom);
router.post("/:id/leave", protect, leaveRoom);

export default router;
