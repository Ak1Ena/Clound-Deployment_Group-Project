import { Router } from 'express';
import { AuthController } from '../Controller/AuthController';

const router = Router();

/**
 * @route POST /api/register
 * @desc สมัครสมาชิกใหม่ (username, password, role)
 */
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  // ตรวจสอบ input
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }

  const result = AuthController.registerUser({ username, password, role });
  res.status(result.success ? 201 : 400).json(result);
});

/**
 * @route POST /api/login
 * @desc เข้าสู่ระบบ (username, password)
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบ input
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }

  const result = AuthController.loginUser({ username, password });
  res.status(result.success ? 200 : 401).json(result);
});

export default router;
