import { queueLists } from '../Database/Data';
import Queue from '../Entity/Queue';

export function getQueue(userid: number): Queue | undefined {
    console.log(`กำลังค้นหาคิวสำหรับ userid: ${userid}`);
    const foundQueue = queueLists.find(queue => queue.userid === userid);
    return foundQueue;
}

export function createRequestQueue(request: { userid: number }): Queue {
    console.log(`ได้รับคำขอสร้างคิวใหม่สำหรับ userid: ${request.userid}`);

    const newId = queueLists.length > 0 ? Math.max(...queueLists.map(q => q.id)) + 1 : 1;

    const newQueue: Queue = {
        id: newId,
        userid: request.userid,
        status: 'waiting',
        createdAt: new Date().toISOString()
    };

    queueLists.push(newQueue);
    console.log('สร้างคิวใหม่สำเร็จ:', newQueue);
    console.log('สถานะ queueLists ปัจจุบัน:', queueLists);

    return newQueue;
}