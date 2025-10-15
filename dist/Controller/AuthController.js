"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Data_1 = require("../Database/Data");
const hashPassword = (password) => `hashed-${password}`;
let userIdCounter = 1;
class AuthController {
    static registerUser({ username, email, password, role }) {
        if (!username || !email || !password)
            return { success: false, message: 'Missing fields' };
        const existingUser = Data_1.users.find(u => u.name === username || u.email === email);
        if (existingUser)
            return { success: false, message: 'User already exists' };
        const newUser = {
            id: String(userIdCounter++),
            name: username,
            email,
            password: hashPassword(password),
            role: role || 'user'
        };
        Data_1.users.push(newUser);
        return { success: true, user: { id: newUser.id, name: newUser.name } };
    }
    static loginUser({ usernameOrEmail, password }) {
        const user = Data_1.users.find(u => u.name === usernameOrEmail || u.email === usernameOrEmail);
        if (!user || user.password !== hashPassword(password))
            return { success: false };
        return { success: true, userId: user.id, name: user.name };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map