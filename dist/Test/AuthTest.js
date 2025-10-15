"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../Controller/AuthController");
const Data_1 = require("../Database/Data");
Data_1.users.length = 0;
const unit_test = () => {
    var _a;
    let failed = 0;
    // T01: registerUser
    const t01Input = { username: 'john', email: 'john@example.com', password: '1234', role: 'user' };
    const t01Result = AuthController_1.AuthController.registerUser(t01Input);
    console.log('T01 Register:', t01Result);
    if (t01Result.success) {
        if (((_a = t01Result.user) === null || _a === void 0 ? void 0 : _a.name) === 'john') {
            console.log(0); // pass
        }
        else {
            console.log(1); // fail
            failed++;
        }
    }
    else {
        console.log('Error:', t01Result.message);
        failed++;
    }
    // T02: loginUser with username
    const t02Input1 = { usernameOrEmail: 'john', password: '1234' };
    const t02Result1 = AuthController_1.AuthController.loginUser(t02Input1);
    console.log('T02 Login (username):', t02Result1);
    if (t02Result1.success) {
        console.log(0); // pass
    }
    else {
        console.log(1); // fail
        failed++;
    }
    // T02: loginUser with email
    const t02Input2 = { usernameOrEmail: 'john@example.com', password: '1234' };
    const t02Result2 = AuthController_1.AuthController.loginUser(t02Input2);
    console.log('T02 Login (email):', t02Result2);
    if (t02Result2.success) {
        console.log(0); // pass
    }
    else {
        console.log(1); // fail
        failed++;
    }
    // fail login test
    const failLogin = AuthController_1.AuthController.loginUser({ usernameOrEmail: 'john', password: 'wrong' });
    console.log('Fail Login:', failLogin);
    if (!failLogin.success) {
        console.log(0); // pass
    }
    else {
        console.log(1); // fail
        failed++;
    }
    if (failed === 0) {
        console.log('✅ All tests passed');
        process.exit(0);
    }
    else {
        console.log(`❌ ${failed} test(s) failed`);
        process.exit(1);
    }
};
unit_test();
//# sourceMappingURL=AuthTest.js.map