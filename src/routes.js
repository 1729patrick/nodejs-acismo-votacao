import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import FinalistController from './app/controllers/FinalistController';
import VoteController from './app/controllers/VoteController';
import PodiumController from './app/controllers/PodiumController';

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/finalists', FinalistController.index);

router.post('/votes/:finalistId', VoteController.store);

router.get('/podiums', PodiumController.index);

export default router;
