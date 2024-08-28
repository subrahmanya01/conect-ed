import { Router } from 'express';
import { addChat, getChatByFromToUserid, getChatUsersForUserId } from '../controllers/chat/index.js';
const router = Router();

// Answer
router.post('/add-chat', addChat);
router.get('/get/:from/:to', getChatByFromToUserid);
router.get('/get-chat-users/:id', getChatUsersForUserId);

export default router