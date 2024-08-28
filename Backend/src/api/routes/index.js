import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import user from './user.js';
import question from './questions.js'
import answer from './answers.js'
import friend from './friends.js'
import search from './search.js'
import chat from './chat.js'
import notification from './notification.js'

const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/user', user);
router.use('/question', question);
router.use('/answer', answer);
router.use('/friend', friend);
router.use('/search', search);
router.use('/chat', chat);
router.use('/notification',notification);

export default router;