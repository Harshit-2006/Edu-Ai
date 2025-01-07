import express from "express";
import {
  getMcqs,
  createMcq,
  updateMcq,
  deleteMcqById,
  deleteMcqByFileTitle,
} from "../controllers/mcq.controller.js";

const router = express.Router();

router.get("/getMcqs/:id", getMcqs);

router.post("/createMcq", createMcq);

router.put("/updateMcq/:mcqId", updateMcq);

router.delete("/deleteMcq/:id", deleteMcqById);

router.delete("/deleteMcqs/",deleteMcqByFileTitle);

export default router;
