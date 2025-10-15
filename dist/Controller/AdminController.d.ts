import { QueueStatus } from "../Entity/Queue";
/**
 * อัปเดตสถานะคิว (เฉพาะ admin)
 * @param role 'admin' | 'user'
 * @param userid หมายเลขผู้ใช้
 * @param status 'waiting' | 'serving' | 'success' | 'skipped'
 * @returns { success, message, data? }
 */
export declare function updateQueueStatus(role: string, userid: number, status: QueueStatus): {
    success: boolean;
    message: string;
    data?: never;
} | {
    success: boolean;
    message: string;
    data: import("../Entity/Queue").default;
};
//# sourceMappingURL=AdminController.d.ts.map