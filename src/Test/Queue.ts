import { getQueue, createRequestQueue } from '../Controller/QueueController';
import { queueLists } from '../Database/Data';

const runQueueTests = () => {
    let failed = 0;
    console.log('--- Running Queue Tests ---');

    // Setup: รีเซ็ตและสร้างข้อมูลเริ่มต้น
    queueLists.length = 0;
    queueLists.push(
        { id: 1, userid: 1, status: "success", createdAt: new Date().toISOString() },
        { id: 2, userid: 2, status: "waiting", createdAt: new Date().toISOString() }
    );
    
    // --- T03: Test getQueue() ---
    console.log('\nTesting T03: getQueue...');
    const t03Result = getQueue(1);
    
    if (t03Result && t03Result.userid === 1) {
        console.log(0); // pass
        console.log('Found Queue:', t03Result);
    } else {
        console.log(1); // fail
        failed++;
    }

    // --- T05: Test createRequestQueue() ---
    console.log('\nTesting T05: createRequestQueue...');
    const initialLength = queueLists.length;
    createRequestQueue({ userid: 3 });
    const finalLength = queueLists.length;
    const newQueue = queueLists[finalLength - 1];

   
    if (finalLength === initialLength + 1 && newQueue && newQueue.userid === 3) {
        console.log(0); // pass
    } else {
        console.log(1); // fail
        failed++;
    }

    console.log('\n--- Test Summary ---');
    if (failed === 0) {
        console.log('✅ All tests passed');
        process.exit(0);
    } else {
        console.log(`❌ ${failed} test(s) failed`);
        process.exit(1);
    }
};

// สั่งให้ฟังก์ชันเทสทำงาน
runQueueTests();