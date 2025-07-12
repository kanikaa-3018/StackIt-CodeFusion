import express from 'express';
import {
  addComment,
  getCommentsByParent,
  deleteComment
} from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addComment); 
router.get('/:parentType/:parentId', getCommentsByParent); 
router.delete('/:id', protect, deleteComment);

export default router;
