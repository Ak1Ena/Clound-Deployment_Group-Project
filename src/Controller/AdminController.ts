import { Request, Response } from "express"
import { queueLists } from "../Database/Data"

export const updateQueueStatus = (req: Request, res: Response) => {
  const { role, queueId, status } = req.body

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Permission denied – Only admin can update queue status",
    })
  }

  const queue = queueLists.find((q) => q.id === queueId)
  if (!queue) {
    return res.status(404).json({
      success: false,
      message: "Queue not found",
    })
  }

  queue.status = status
  return res.status(200).json({
    success: true,
    message: "Queue updated successfully",
    data: queue,
  })
}
