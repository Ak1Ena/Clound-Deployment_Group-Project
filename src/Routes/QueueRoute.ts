import { Router, Request, Response } from 'express';
import { getQueue, createRequestQueue } from '../Controller/QueueController';

const router = Router();

// POST /queues  -> body: { userid: number }
router.post('/queues', (req: Request, res: Response) => {
    const userid = Number(req.body?.userid);
    if (!Number.isInteger(userid) || userid <= 0) {
        return res.status(400).json({ message: 'Invalid userid' });
    }

    try {
        const newQueue = createRequestQueue({ userid });
        return res.status(201).json(newQueue);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to create queue' });
    }
});

// GET /queues/:userid
router.get('/queues/:userid', (req: Request, res: Response) => {
    const userid = Number(req.params.userid);
    if (!Number.isInteger(userid) || userid <= 0) {
        return res.status(400).json({ message: 'Invalid userid' });
    }

    const found = getQueue(userid);
    if (!found) {
        return res.status(404).json({ message: 'Queue not found' });
    }
    return res.json(found);
});

export default router;