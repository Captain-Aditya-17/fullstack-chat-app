import express from 'express';
import { getUsers, getMessages, sendMessage } from '../controllers/message.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getMessages);
router.post('/send/:id', authMiddleware, sendMessage);

export default router;
