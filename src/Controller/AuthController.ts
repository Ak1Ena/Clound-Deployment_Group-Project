import User, { Role } from '../Entity/User';
import { users } from '../Database/Data';

const hashPassword = (password: string) => `hashed-${password}`;

let userIdCounter = users.length + 1;

export class AuthController {
  // 🟢 Register user ใหม่
  static registerUser({ username, password, role }: { username: string, password: string, role?: Role }) {
    if (!username || !password) return { success: false, message: 'Missing fields' };

    const existingUser = users.find(u => u.name === username);
    if (existingUser) return { success: false, message: 'User already exists' };

    const newUser: User = {
      id: String(userIdCounter++),
      name: username,
      password: hashPassword(password),
      role: role || 'user'
    };

    users.push(newUser);
    return { success: true, user: { id: newUser.id, name: newUser.name, role: newUser.role } };
  }

  // 🟢 Login user
  static loginUser({ username, password }: { username: string, password: string }) {
    const user = users.find(u => u.name === username);
    if (!user || user.password !== hashPassword(password)) {
      return { success: false, message: 'Invalid credentials' };
    }

    return { success: true, userId: user.id, name: user.name, role: user.role };
  }
}
// push