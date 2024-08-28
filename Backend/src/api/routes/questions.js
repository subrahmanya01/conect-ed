import { Router } from 'express';
import { addQuestion, deleteQuestion, editQuestion, getQuestionById, getQuestionByUserId, getQuestions, getQuestionsByPage } from '../controllers/posts/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// Question
router.post('/add', addQuestion);
router.patch('/edit', editQuestion);
router.delete('/delete/:id', deleteQuestion);
router.get('/', auth, getQuestions);
router.get('/:userId', getQuestionByUserId);
router.get('/page/:page/:pageSize', getQuestionsByPage);
router.get('/get/:questionId', getQuestionById);

export default router