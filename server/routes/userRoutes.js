import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  refreshAcessToken,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/refresh_access_token", refreshAcessToken);
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

export default router;
