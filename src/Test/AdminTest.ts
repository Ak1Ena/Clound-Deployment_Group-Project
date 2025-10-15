import { updateQueueStatus } from '../Controller/AdminController';
import { queueLists } from '../Database/Data';

console.log("🔍 Running T04: updateQueueStatus(role, userid, status)");

// เตรียมข้อมูลจำลอง
queueLists.length = 0;
queueLists.push({ id: 1, userid: 1, status: "waiting", createdAt: new Date().toISOString() });

// Case 1: admin update สำเร็จ
const result1 = updateQueueStatus("admin", 1, "success");
console.log("Case 1 (Admin):", result1);
console.assert(result1.success === true, "❌ Expected success for admin");

// Case 2: user ไม่มีสิทธิ์
const result2 = updateQueueStatus("user", 1, "serving");
console.log("Case 2 (User):", result2);
console.assert(result2.success === false, "❌ Expected fail for user");


console.log("\n T04 Completed.");
