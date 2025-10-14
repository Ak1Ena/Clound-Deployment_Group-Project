import { getQueue, createRequestQueue } from '../Controller/QueueController';
import { queueLists } from '../Database/Data';

const runQueueTests = () => {
    let failed = 0;
    console.log('--- Running Queue Tests ---');

    // Setup: รีเซ็ตและสร้างข้อมูลเริ่มต้น
    // เราจะทำขั้นตอนนี้ในแต่ละเทสเคสเพื่อให้แน่ใจว่าข้อมูลไม่ปนกัน
    
    // --- T03: Test getQueue() ---
    console.log('\nTesting T03: getQueue...');
    // Setup สำหรับ T03
    queueLists.length = 0;
    queueLists.push({ id: 1, userid: 1, status: "success", createdAt: new Date().toISOString() });

    const t03Result = getQueue(1);
    
    // ตรวจคำตอบ: ผลลัพธ์ต้องเจอ และ userid ต้องเป็น 1
    if (t03Result && t03Result.userid === 1) {
        console.log(0); // pass
    } else {
        console.log(1); // fail
        failed++;
    }

    // --- T05: Test createRequestQueue() ---
    console.log('\nTesting T05: createRequestQueue...');
    // Setup สำหรับ T05
    queueLists.length = 0;
    queueLists.push(
        { id: 1, userid: 1, status: "success", createdAt: new Date().toISOString() },
        { id: 2, userid: 2, status: "waiting", createdAt: new Date().toISOString() }
    );
    const initialLength = queueLists.length;

    createRequestQueue({ userid: 3 });

    // ตรวจคำตอบ: list ต้องยาวขึ้น และคิวใหม่ที่เพิ่มเข้าไปต้องถูกต้อง
    const finalLength = queueLists.length;
    const newQueue = queueLists[finalLength - 1]; // ดึงคิวตัวล่าสุดออกมา
    
    if (finalLength === initialLength + 1 && newQueue && newQueue.userid === 3) {
        console.log(0); // pass
    } else {
        console.log(1); // fail
        failed++;
    }

    // --- สรุปผล ---
    console.log('\n--- Test Summary ---');
    if (failed === 0) {
        console.log('✅ All queue tests passed');
        process.exit(0);
    } else {
        console.log(`❌ ${failed} queue test(s) failed`);
        process.exit(1);
    }
};

// สั่งให้สคริปต์เทสทำงาน
runQueueTests();