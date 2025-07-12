import express from 'express';
import {
  postAnswer,
  getAnswersByQuestionId,
  voteAnswer,
  acceptAnswer
} from '../controllers/answerController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:questionId', protect, postAnswer);
router.get('/:questionId', getAnswersByQuestionId);
router.post('/:answerId/vote', protect, voteAnswer);
router.patch('/:answerId/accept', protect, acceptAnswer);

export default router;
