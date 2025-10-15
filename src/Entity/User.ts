export type Role = 'user' | 'admin'

export default interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}