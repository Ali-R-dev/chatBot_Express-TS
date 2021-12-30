import express, { Request, Response } from "express";
const router = express.Router();
import ChatController from "../controllers/ChatController";
// for 404 requests
const return404 = (req: Request, res: Response) => {
  res.status(404).json({ messgae: "404 Not found" });
};
// chat route
router.post("/api/chat", ChatController);
router.get("*", return404).post("*", return404);
export default router;
