import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/eventController";
import { authenticate } from "../middleware/auth";

const router = Router();

//api/user
router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);
export default router;
