import { Router, Request, Response } from 'express';
import { createRequestQueue, getQueue } from '../Controller/QueueController';

const router = Router();

/*
 T05: API สำหรับสร้างคิวใหม่
  POST /queues
 */
router.post('/queues', (req: Request, res: Response) => {
    try {
        const { userid } = req.body;

        if (!userid) {
            return res.status(400).json({ message: 'Userid is required in the body' });
        }

        const newQueue = createRequestQueue(userid);
        res.status(201).json(newQueue);
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/*
 T03: API สำหรับดึงข้อมูลคิว
  GET /queues/:userid
 */
router.get('/queues/:userid', (req: Request<{ userid: string }>, res: Response) => {
    try {
        const userid = parseInt(req.params.userid, 10);
        
        if (isNaN(userid)) {
            return res.status(400).json({ message: 'Userid must be a number' });
        }

        const foundQueue = getQueue(userid);

        if (foundQueue) {
            res.status(200).json(foundQueue);
        } else {
            res.status(404).json({ message: 'Queue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;