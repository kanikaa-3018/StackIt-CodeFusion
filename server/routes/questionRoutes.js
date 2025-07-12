import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  acceptAnswer,
} from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for all questions
router.route('/')
  .get(getAllQuestions)          // GET /api/questions
  .post(protect, createQuestion); // POST /api/questions

// Routes for a single question by ID
router.route('/:id')
  .get(getQuestionById)          // GET /api/questions/:id
  .put(protect, updateQuestion)  // PUT /api/questions/:id
  .delete(protect, deleteQuestion); // DELETE /api/questions/:id

// Route for voting on a question
router.put('/:id/vote', protect, voteQuestion); // PUT /api/questions/:id/vote

// Route to accept an answer
router.put('/:id/accept/:answerId', protect, acceptAnswer); // PUT /api/questions/:id/accept/:answerId

export default router;
