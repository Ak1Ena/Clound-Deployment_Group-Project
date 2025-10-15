"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQueueStatus = updateQueueStatus;
const Data_1 = require("../Database/Data");
/**
 * อัปเดตสถานะคิว (เฉพาะ admin)
 * @param role 'admin' | 'user'
 * @param userid หมายเลขผู้ใช้
 * @param status 'waiting' | 'serving' | 'success' | 'skipped'
 * @returns { success, message, data? }
 */
function updateQueueStatus(role, userid, status) {
    // ตรวจสิทธิ์ก่อน
    if (role !== "admin") {
        return { success: false, message: "Permission denied: admin only" };
    }
    // ตรวจว่ามี queue ที่ userid นี้ไหม
    const queue = Data_1.queueLists.find(q => q.userid === userid);
    if (!queue) {
        return { success: false, message: "Queue not found" };
    }
    // ตรวจสถานะที่ส่งมาถูกต้องหรือไม่
    const validStatuses = ["waiting", "serving", "success", "skipped"];
    if (!validStatuses.includes(status)) {
        return { success: false, message: `Invalid status: ${status}` };
    }
    // อัปเดตสถานะ
    queue.status = status;
    return {
        success: true,
        message: `Queue updated to '${status}' successfully`,
        data: queue,
    };
    // push
}
//# sourceMappingURL=AdminController.js.map