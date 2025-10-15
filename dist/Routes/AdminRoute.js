"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../Controller/AdminController");
const router = (0, express_1.Router)();
/**
 * @route POST /api/update-queue
 * @desc เฉพาะ admin เท่านั้นที่สามารถอัปเดตสถานะคิวได้
 * @body { role: 'admin' | 'user', userid: number, status: 'waiting' | 'serving' | 'success' | 'skipped' }
 */
router.post("/update-queue", (req, res) => {
    try {
        const { role, userid, status } = req.body;
        // ✅ ตรวจสอบ input
        if (!role || !userid || !status) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: role, userid, status",
            });
        }
        // ✅ เรียก business logic (controller)
        const result = (0, AdminController_1.updateQueueStatus)(role, Number(userid), status);
        // ✅ ส่งผลลัพธ์กลับให้ frontend
        res.status(result.success ? 200 : 403).json(result);
    }
    catch (error) {
        console.error("Error in /update-queue:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.default = router;
//push
//# sourceMappingURL=AdminRoute.js.map