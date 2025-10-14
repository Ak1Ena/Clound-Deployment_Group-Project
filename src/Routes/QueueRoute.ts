import { Router } from 'express';
import { getQueue, createRequestQueue } from '../Controller/QueueController';

const router = Router();

router.post('/queues', createRequestQueue);
router.get('/queues/:userid', getQueue);

export default router;