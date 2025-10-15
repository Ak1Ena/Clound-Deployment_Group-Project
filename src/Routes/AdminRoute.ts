import express from "express"
import { updateQueueStatus } from "../Controller/AdminController"

const router = express.Router()

router.post("/update-queue", updateQueueStatus)

export default router
