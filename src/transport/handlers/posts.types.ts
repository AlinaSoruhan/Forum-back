import type { Request, Response } from "express"

export interface PostHandler {
    getPostById(request: Request, response: Response): Promise<void>;
    getAllPosts(request: Request, response: Response): Promise<void>;
    createPost(request: Request, response: Response): Promise<void>;
}
