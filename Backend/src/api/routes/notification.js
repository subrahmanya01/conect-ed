import { Router } from 'express';
import { addNotification, getNotifications, makeNotificationRead, sendNotificationWhenAnswerAdded, sendNotificationWhenQuestionAdded } from '../controllers/notifications/index.js';

const router = Router();

// Answer
router.post('/add', addNotification);
router.get('/:id', getNotifications);
router.patch('/:id', makeNotificationRead);
router.get('/question-added/:userId/:questionId', sendNotificationWhenQuestionAdded);
router.get('/answer-added/:userId/:answerId', sendNotificationWhenAnswerAdded);


export default router