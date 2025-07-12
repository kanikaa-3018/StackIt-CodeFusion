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

router.route('/')
  .get(getAllQuestions)
  .post(protect, createQuestion);

router
  .route('/:id')
  .get(getQuestionById)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

router.put('/:id/vote', protect, voteQuestion);
router.put('/:id/accept/:answerId', protect, acceptAnswer);

export default router;
