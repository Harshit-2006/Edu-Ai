import express from "express";
import {
  getGeneratedMcqs,
  getGeneratedFlashcards,
} from "../controllers/genAi.controller.js";

const router = express.Router();

// router to handle the mcq generation for both topic type and text type input
router.post("/mcqs", getGeneratedMcqs);

// router to handle the flashcard generation for both topic type and text type input
router.post("/flashcards", getGeneratedFlashcards);

export default router;
