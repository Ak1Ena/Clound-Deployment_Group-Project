import { Role } from '../Entity/User';
export declare class AuthController {
    static registerUser({ username, email, password, role }: {
        username: string;
        email: string;
        password: string;
        role?: Role;
    }): {
        success: boolean;
        message: string;
        user?: never;
    } | {
        success: boolean;
        user: {
            id: string;
            name: string;
        };
        message?: never;
    };
    static loginUser({ usernameOrEmail, password }: {
        usernameOrEmail: string;
        password: string;
    }): {
        success: boolean;
        userId?: never;
        name?: never;
    } | {
        success: boolean;
        userId: string;
        name: string;
    };
}
//# sourceMappingURL=AuthController.d.ts.map