import { Router } from 'express';
import { getQuestionsAsPerSearch, getQuestionsPerPageAsPerSearch } from '../controllers/search/index.js';

const router = Router();

// Search
router.get('/:keyword', getQuestionsAsPerSearch);
router.get('/:keyword/:page/:pageSize', getQuestionsPerPageAsPerSearch);

export default router