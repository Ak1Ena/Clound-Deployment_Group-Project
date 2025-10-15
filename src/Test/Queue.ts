import { getQueue, createRequestQueue } from '../Controller/QueueController';
import { queueLists } from '../Database/Data';

const runQueueTests = () => {
    let failed = 0;
    console.log('--- Running Logic Tests for Queue ---');
    
    // --- T03: Test getQueue() ---
    console.log('\nTesting T03: getQueue...');
    queueLists.length = 0; 
    queueLists.push({ id: 1, userid: 1, status: "success", createdAt: new Date().toISOString() });
    
    const t03Result = getQueue(1);
    
    if (t03Result && t03Result.userid === 1) {
        console.log(0); // pass
        console.log(t03Result);
    } else {
        console.log(1); // fail
        failed++;
    }

    // --- T05: Test createRequestQueue() ---
console.log('\nTesting T05: createRequestQueue...');
queueLists.length = 0; // เคลียร์ข้อมูลเก่า
queueLists.push(
    { id: 1, userid: 1, status: "success", createdAt: new Date().toISOString() },
    { id: 2, userid: 2, status: "waiting", createdAt: new Date().toISOString() }
);
const initialLength = queueLists.length; 
createRequestQueue(3);
    
const newQueue = queueLists[queueLists.length - 1];
    
if (queueLists.length === initialLength + 1 && newQueue && newQueue.userid === 3) {
    console.log(0); // pass 
    console.log(newQueue);
} else {
    console.log(1); // fail
    failed++;
}

    // --- สรุปผล ---
    console.log('\n--- Test Summary ---');
    if (failed === 0) {
        console.log('✅ All tests passed');
        process.exit(0);
    } else {
        console.log(`❌ ${failed} test(s) failed`);
        process.exit(1);
    }
};

runQueueTests();