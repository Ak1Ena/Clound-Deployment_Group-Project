import { queueLists } from '../Database/Data';
import Queue from '../Entity/Queue';

export function getQueue(userid: number): Queue | undefined {
    console.log(`[Logic] getQueue for userid: ${userid}`);
    return queueLists.find(q => q.userid === userid);
}

export function createRequestQueue(userid: number): Queue {
    console.log(`[Logic] createRequestQueue for userid: ${userid}`);
    const newId = queueLists.length > 0 ? Math.max(...queueLists.map(q => q.id)) + 1 : 1;

    const newQueue: Queue = {
        id: newId,
        userid: userid,
        status: 'waiting',
        createdAt: new Date().toISOString()
    };
    
    queueLists.push(newQueue);
    return newQueue;
}