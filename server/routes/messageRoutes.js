import express from 'express';
import {
  sendMessage,
  getMessagesForRoom
} from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:roomId', protect, getMessagesForRoom);

export default router;
