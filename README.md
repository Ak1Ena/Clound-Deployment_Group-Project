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
│   └── index.ts
├── tests/
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
| Dev 1 | Auth system (Register/Login + Role check) | T01, T02      |
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
| `getCurrentQueue()`   | ดึงข้อมูลคิวปัจจุบันแบบเรียลไทม์                 |

---

## Test Specsification
Test Id | Features | Test Description | Expected Result|
--- | --- | --- | ---
T01 | Register API | ตรวจสอบว่าผู้ใช้สามารถลงทะเบียนโดยใช้ username, email, password | 201 CREATED
T02 | Login API | ตรวจสอบว่าผู้ใช้สามารถที่จะลงชื่อเข้าใช้โดยใช้ username หรือ email และ password ได้ | 200 OK + userid |
T03 | Request Queue | ตรวจสอบว่าระบบสามารถrequest queue ได้ | 200 OK |
T04 | Update Queue Status | ตรวจสอบว่าเฉพาะ Admin เท่านั้นที่สามารถเปลี่ยนสถานะคิวได้ | 200 OK
T05 | Get Current Queue | ระบบต้องสามารถ tracking Queue ที่อยู่ในปัจจุบันได้ | 200 OK + Queue Data
---
FROM T04 SET Admin = username : admin, password : admin


