import { Router } from 'express';
import { follow, getFollowers, getFollowings, unFollow } from '../controllers/user/index.js';

const router = Router();

// Answer
router.post('/follow', follow);
router.post('/un-follow', unFollow);
router.get('/followers/:id', getFollowers);
router.get('/following/:id', getFollowings);


export default router