"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../Controller/AuthController");
const router = (0, express_1.Router)();
router.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;
    const result = AuthController_1.AuthController.registerUser({ username, email, password, role });
    if (result.success)
        res.status(201).json({ message: 'User registered successfully', user: result.user });
    else
        res.status(400).json({ message: result.message });
});
router.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const result = AuthController_1.AuthController.loginUser({ usernameOrEmail, password });
    if (result.success)
        res.status(200).json({ message: 'Login successful', userId: result.userId, name: result.name });
    else
        res.status(401).json({ message: 'Invalid credentials' });
});
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map