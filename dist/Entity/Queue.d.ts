export type QueueStatus = 'waiting' | 'serving' | 'success' | 'skipped';
export default interface Queue {
    id: number;
    userid: number;
    status: QueueStatus;
    createdAt: string;
}
//# sourceMappingURL=Queue.d.ts.map