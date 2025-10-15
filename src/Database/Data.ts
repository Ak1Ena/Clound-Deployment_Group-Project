import User, { Role } from '../Entity/User'
import Queue from '../Entity/Queue'

// 🧩 Mock database: users & queues
export const users: User[] = [
  {
    id: '1',
    name: 'admin',
    password: 'hashed-admin', // ใช้ hash เดียวกับ AuthController
    role: 'admin'
  }
]

export const queueLists: Queue[] = []
