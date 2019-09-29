import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/Controllers/SessionController';
import FinalistController from './app/Controllers/FinalistController';
import VoteController from './app/Controllers/VoteController';

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/finalists', FinalistController.index);

router.post('/votes', VoteController.store);
router.get('/votes', VoteController.index);
export default router;
