"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QueueController_1 = require("../Controller/QueueController");
const router = (0, express_1.Router)();
/*
 T05: API สำหรับสร้างคิวใหม่
  POST /queues
 */
router.post('/queues', (req, res) => {
    try {
        const { userid } = req.body;
        if (!userid) {
            return res.status(400).json({ message: 'Userid is required in the body' });
        }
        const newQueue = (0, QueueController_1.createRequestQueue)(userid);
        res.status(201).json(newQueue);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
/*
 T03: API สำหรับดึงข้อมูลคิว
  GET /queues/:userid
 */
router.get('/queues/:userid', (req, res) => {
    try {
        const userid = parseInt(req.params.userid, 10);
        if (isNaN(userid)) {
            return res.status(400).json({ message: 'Userid must be a number' });
        }
        const foundQueue = (0, QueueController_1.getQueue)(userid);
        if (foundQueue) {
            res.status(200).json(foundQueue);
        }
        else {
            res.status(404).json({ message: 'Queue not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
//# sourceMappingURL=QueueRoute.js.map