import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import timeMiddleware from './app/middlewares/time';
import SessionController from './app/controllers/SessionController';
import FinalistController from './app/controllers/FinalistController';
import VoteController from './app/controllers/VoteController';
import PodiumController from './app/controllers/PodiumController';

const router = new Router();

router.use(timeMiddleware);

router.post('/acismo/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/acismo/finalists', FinalistController.index);

router.post('/acismo/votes/:finalistId', VoteController.store);

router.get('/acismo/podiums', PodiumController.index);

export default router;
