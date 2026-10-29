import express, { Express } from "express"

import { db as databaseInstance } from "./prisma/db.js"
import { createPostRepository } from "./repositories/posts.js"
import { createPostService } from "./services/posts.js"
import { createPostHandler } from "./transport/handlers/post.js"
import { createPostRouter } from "./routers/posts.js"

export function createApp(): Express {
    const server = express();

    server.use(express.json());

    const repository = createPostRepository(databaseInstance);
    const service = createPostService(repository);
    const handler = createPostHandler(service);
    
    server.use(createPostRouter(handler));

    return server;
}
