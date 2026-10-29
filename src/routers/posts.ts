import { Router } from "express"
import type { PostHandler } from "../transport/handlers/posts.types.ts"

export function createPostRouter(postController: PostHandler) {
    const apiRouter = Router();

    apiRouter.route("/posts")
        .get(postController.getAllPosts)
        .post(postController.createPost);

    apiRouter.get("/posts/:id", postController.getPostById);

    return apiRouter;
}
