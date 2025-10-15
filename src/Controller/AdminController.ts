import { queueLists } from "../Database/Data";
import { QueueStatus } from "../Entity/Queue";

/**
 * อัปเดตสถานะคิว (เฉพาะ admin)
 * @param role 'admin' | 'user'
 * @param userid หมายเลขผู้ใช้
 * @param status 'waiting' | 'serving' | 'success' | 'skipped'
 * @returns { success, message, data? }
 */
export function updateQueueStatus(
  role: string,
  userid: number,
  status: QueueStatus
) {
  // ตรวจสิทธิ์ก่อน
  if (role !== "admin") {
    return { success: false, message: "Permission denied: admin only" };
  }

  // ตรวจว่ามี queue ที่ userid นี้ไหม
  const queue = queueLists.find(q => q.userid === userid);
  if (!queue) {
    return { success: false, message: "Queue not found" };
  }

  // ตรวจสถานะที่ส่งมาถูกต้องหรือไม่
  const validStatuses: QueueStatus[] = ["waiting", "serving", "success", "skipped"];
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
}
