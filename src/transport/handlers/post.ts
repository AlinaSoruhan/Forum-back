import type { Request, Response } from "express";
import type { PostService } from "../../domain/post/post.types.js";
import type { PostHandler } from "./posts.types.js";

export function createPostHandler(postService: PostService): PostHandler {

    async function getAllPosts(_request: Request, response: Response) {
        const data = await postService.getPosts();
        response.status(200).json(data);
    }

    async function getPostById(request: Request, response: Response) {
        const postId = parseInt(request.params.id, 10);
        
        if (isNaN(postId) || postId <= 0) {
            response.status(400).json({ error: "INVALID_POST_ID" });
            return;
        }

        const item = await postService.getPost(postId);
        if (!item) {
            response.status(404).json({ error: "POST_NOT_FOUND" });
            return;
        }

        response.status(200).json(item);
    }

    async function createPost(request: Request, response: Response) {
        const body = request.body || {};
        const titleText = body.title;
        const contentText = body.content;

        if (!titleText || typeof titleText !== "string" || !titleText.trim()) {
            response.status(422).json({ error: "TITLE_IS_REQUIRED" });
            return;
        }

        if (contentText && typeof contentText !== "string") {
            response.status(422).json({ error: "CONTENT_MUST_BE_A_STRING" });
            return;
        }

        const createdArticle = await postService.createPost({ 
            title: titleText, 
            content: contentText ?? null 
        });
        
        response.status(201).json(createdArticle);
    }

    return { 
        getAllPosts, 
        getPostById, 
        createPost 
    };
}
