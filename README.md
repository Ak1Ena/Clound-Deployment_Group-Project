# Queue Calling
---
## Folder Structure
```

queue-calling/
│
├── dist/
├── public/
├── src/
│   ├── Entity/
│   ├── Routes/
|   ├── Controller/
|   ├── tests/
│   └── index.ts
├── package.json
├── tsconfig.json
├── Dockerfile
├── .dockerignore
└── .github/
    └── workflows/
        ├── main.yaml
        └── deploy.yaml
```
---
## Role Responsible

| Dev         | Responsibility                            | Related Tests |
| ----------- | ----------------------------------------- | ------------- |
| Dev 1 | Auth system (Register/Login ) | T01, T02      |
| Dev 2 | Queue creation & current tracking         | T03, T05      |
| Dev 3 | Admin update queue       | T04  |

---
## Deployment Plan

Environtment : NodeJS + Docker + Github Action

Container Registry: Docker hub(akiena/clound-deploy)

### Deployment flow
1. Dev push code --> Github action trigger main.yaml workflow.
2. install dependencies
3. run unit test
4. Release version code --> Github action trigger deploy.yaml workflow.
5. build the image
6. deploy to docker hub with (akiena/clound-deploy)

---
## Main Feature
- ลูกค้าสามารถจองคิวผ่านหน้าเว็บ
- พนักงานสามารถเรียกคิว / ข้ามคิวได้
- Admin ดูสถิติและจัดการคิวทั้งหมด
- ระบบมีการแจ้งเตือนสถานะคิวแบบเรียลไทม์
---
## Function
| Function              | Description                                      |
| --------------------- | ------------------------------------------------ |
| `registerUser()`      | สมัครสมาชิกใหม่                                  |
| `loginUser()`         | เข้าสู่ระบบ                                      |
| `createRequestQueue()`       | ทำการส่งขอ queue ใหม่ไปในระบบ                               |
| `updateQueueStatus()` | อัปเดตสถานะคิว (เช่น กำลังให้บริการ / เสร็จสิ้น) |
| `getQueue()` | ทำการเรียก queue โดยใช้ userid |

---



| Test Id | Function               | Test Description                                    | Input / Condition                                                   | Expected Result                         |
| ------- | ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------- |
| T01    | `registerUser(username,email,password)`       | ตรวจสอบว่าผู้ใช้สามารถสมัครสมาชิกด้วย email ถูกต้อง | `{ username: 'john', email: 'john@example.com', password: '1234', role: 'user' }` | Object user ถูกสร้าง, password ถูก hash |
| T02    | `loginUser(username/email, password)`          | ตรวจสอบการเข้าสู่ระบบด้วยรหัสผ่านถูกต้อง            | `{ username/email, password }`  |
| T03    | `getQueue(userid)`       | ตรวจสอบว่าระบบสามารถดึงข้อมูลคิว ผ่าน userid ได้ไหม         | `{ userid: 1}`          | แสดงตัวเลข queue ของ user พร้อมสถานะ                | true / login สำเร็จ                     |
| T04    | `updateQueueStatus(role,userid,status)`  | ตรวจสอบว่าเฉพาะ Admin สามารถอัปเดตสถานะ queue       | `role='admin', queueId=1, status:'success'`                                       | queue ถูกอัปเดตสำเร็จ                   |
| T05    | `createRequestQueue(userid)` | ตรวจสอบการสร้าง request queue ใหม่                  | `queueList=[{id:1, userid:1, status:"success"},{id:2, userid:2,status:"waiting"}], newRequest={id:3, userid:3,status:"wating"}`                      | newRequest ถูกเพิ่ม, ตำแหน่ง queue = 3  |


FROM T04 SET Admin = username : admin, password : admin


