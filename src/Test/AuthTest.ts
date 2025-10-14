import { AuthController } from '../Controller/AuthController';
import { users } from '../Database/Data';
import User, { Role } from '../Entity/User';

users.length = 0;

const unit_test = () => {

    // T01: registerUser
    const t01Input = { username: 'john', email: 'john@example.com', password: '1234', role: 'user' as Role };
    const t01Result = AuthController.registerUser(t01Input);
    console.log('T01 Register:', t01Result);
    if (t01Result.success) {
        console.log(t01Result.user?.name === 'john' ? 0 : 1); // 0 = pass
    } else {
        console.log('Error:', t01Result.message);
    }

    // T02: loginUser
    const t02Input = { usernameOrEmail: 'john', password: '1234' };
    const t02Result = AuthController.loginUser(t02Input);
    console.log('T02 Login:', t02Result);
    console.log(t02Result.success ? 0 : 1); // 0 = pass

    //  fail login test
    const failLogin = AuthController.loginUser({ usernameOrEmail: 'john', password: 'wrong' });
    console.log('Fail Login:', failLogin);
    console.log(!failLogin.success ? 0 : 1); // 0 = pass
};

unit_test();
