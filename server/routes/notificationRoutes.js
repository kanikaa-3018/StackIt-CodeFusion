import express from 'express';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUserNotifications);
router.patch('/:id/read', protect, markNotificationAsRead);
router.patch('/read-all', protect, markAllNotificationsAsRead);
router.delete('/:id', protect, deleteNotification);

export default router;
