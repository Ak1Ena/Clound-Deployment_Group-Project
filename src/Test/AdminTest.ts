import { updateQueueStatus } from '../Controller/AdminController';
import { queueLists } from '../Database/Data';

const runAdminTests = () => {
  let failed = 0;
  console.log('--- Running Logic Tests for Admin ---');

  // ✅ เตรียมข้อมูลจำลอง
  queueLists.length = 0;
  queueLists.push({
    id: 1,
    userid: 1,
    status: "waiting",
    createdAt: new Date().toISOString()
  });

  // --- T04: Test updateQueueStatus() for admin ---
  console.log('\nTesting T04: updateQueueStatus (admin)...');

  const req: any = { body: { role: 'admin', queueId: 1, status: 'success' } };
  const res: any = {
    status: (code: number) => {
      res.statusCode = code;
      return res;
    },
    json: (data: any) => {
      res.data = data;
      return res;
    }
  };

  updateQueueStatus(req, res);

  if (res.statusCode === 200 && res.data?.success === true) {
    console.log(0); // pass
    console.log('Response:', res.data);
  } else {
    console.log(1); // fail
    failed++;
  }

  // --- ทดสอบ Non-admin ---
  console.log('\nTesting T04: updateQueueStatus (non-admin)...');

  const req2: any = { body: { role: 'user', queueId: 1, status: 'success' } };
  const res2: any = {
    status: (code: number) => {
      res2.statusCode = code;
      return res2;
    },
    json: (data: any) => {
      res2.data = data;
      return res2;
    }
  };

  updateQueueStatus(req2, res2);

  if (res2.statusCode === 403 && res2.data?.success === false) {
    console.log(0); // pass
    console.log('Response:', res2.data);
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

runAdminTests();
