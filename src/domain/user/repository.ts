import type { User } from "./entity";

export type NewUser = Omit<User, "id">

export interface UserRepository {
    createUser: (data: NewUser) => Promise<User>;
    getByEmail: (email: string) => Promise<User | null>; 
    getById: (id: number) => Promise<User | null>;
}
