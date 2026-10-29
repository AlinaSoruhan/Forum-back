import type { db as database } from '../prisma/db.ts'
import type { NewPostData } from './post.interface.ts'

type Storage = typeof database;

export function createPostRepository(db: Storage) {
    const findAll = async () => {
        return db.orm.public.Post.orderBy(item => item.id.asc()).all();
    };

    const findById = async (postId: number) => {
        return db.orm.public.Post.where({ id: postId }).first();
    };

    const insert = async (payload: NewPostData) => {
        const { title, content } = payload;
        return db.orm.public.Post.create({
            title,
            content: content ?? null,
        });
    };

    return { 
        findAll, 
        findById, 
        insert 
    };
}
