import User, { Role } from '../Entity/User';
import { users } from '../Database/Data';

const hashPassword = (password: string) => `hashed-${password}`;

let userIdCounter = 1;

export class AuthController {

    static registerUser({ username, email, password, role }: { username: string, email: string, password: string, role?: Role }) {
        if (!username || !email || !password) return { success: false, message: 'Missing fields' };

        const existingUser = users.find(u => u.name === username || u.email === email);
        if (existingUser) return { success: false, message: 'User already exists' };

        const newUser: User = {
            id: String(userIdCounter++),
            name: username,
            email,
            password: hashPassword(password),
            role: role || 'user'
        };

        users.push(newUser);

        return { success: true, user: { id: newUser.id, name: newUser.name } };
    }

    static loginUser({ usernameOrEmail, password }: { usernameOrEmail: string, password: string }) {
        const user = users.find(u => u.name === usernameOrEmail || u.email === usernameOrEmail);
        if (!user || user.password !== hashPassword(password)) return { success: false };

        return { success: true, userId: user.id, name: user.name };
    }
}