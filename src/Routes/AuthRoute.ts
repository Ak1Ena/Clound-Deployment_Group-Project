import { Router, Request, Response } from 'express';
import { AuthController } from '../Controller/AuthController';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const result = AuthController.registerUser({ username, email, password, role });

  if (result.success)
    res.status(201).json({ message: 'User registered successfully', user: result.user });
  else
    res.status(400).json({ message: result.message });
});

router.post('/login', (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;
  const result = AuthController.loginUser({ usernameOrEmail, password });
  if (result.success)
    res.status(200).json({ message: 'Login successful', userId: result.userId, name: result.name });
  else
    res.status(401).json({message: 'Invalid credentials'} );
});

export default router;