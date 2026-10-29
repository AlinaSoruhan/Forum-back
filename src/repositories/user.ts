import type { UserRepository } from "../domain/user/repository.js";

type Database = typeof import("../prisma/db.js").db;

export function createUserRepository(database: Database): UserRepository {
    return {
        async createUser(data) {
            try {
                return await database.orm.public.User.create({ data });
            } catch (error) {
               
                throw error;
            }
        }, 

        async getByEmail(email) {
            return await database.orm.public.User
                .where({ email })
                .first();
        },

        async getById(id) {
            return await database.orm.public.User
                .where({ id })
                .first();
        }
    };
}
