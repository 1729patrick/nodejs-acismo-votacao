import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/Controllers/SessionController';
import FinalistController from './app/Controllers/FinalistController';
import VoteController from './app/Controllers/VoteController';
import PodiumController from './app/Controllers/PodiumController';

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/finalists', FinalistController.index);

router.post('/votes/:finalistId', VoteController.store);

router.get('/podiums', PodiumController.index);

router.get('/test', VoteController.test);
export default router;
