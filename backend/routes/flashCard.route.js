import express from "express";
import {
  getFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
  deleteFlashcardsByFileTitle,
} from "../controllers/flashCard.controller.js";

const router = express.Router();

router.get("/getFlashcards/:id", getFlashcards);

router.post("/createFlashcard", createFlashcard);

router.put("/updateFlashcard/:flashcardId", updateFlashcard);

router.delete("/deleteFlashcard/:id", deleteFlashcardById);

router.delete("/deleteFlashcards/", deleteFlashcardsByFileTitle);

export default router;
