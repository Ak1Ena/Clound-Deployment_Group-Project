"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueue = getQueue;
exports.createRequestQueue = createRequestQueue;
const Data_1 = require("../Database/Data");
function getQueue(userid) {
    console.log(`[Logic] getQueue for userid: ${userid}`);
    return Data_1.queueLists.find(q => q.userid === userid);
}
function createRequestQueue(userid) {
    console.log(`[Logic] createRequestQueue for userid: ${userid}`);
    const newId = Data_1.queueLists.length > 0 ? Math.max(...Data_1.queueLists.map(q => q.id)) + 1 : 1;
    const newQueue = {
        id: newId,
        userid: userid,
        status: 'waiting',
        createdAt: new Date().toISOString()
    };
    Data_1.queueLists.push(newQueue);
    return newQueue;
}
//# sourceMappingURL=QueueController.js.map