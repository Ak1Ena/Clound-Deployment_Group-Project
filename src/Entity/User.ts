export type Role = 'user' | 'admin'

export default interface User {
    id: string;
    name: string;
    password: string;
    role: Role;
}
// push