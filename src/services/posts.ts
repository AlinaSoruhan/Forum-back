import type { IPostRepository } from "../domain/posts.ts"; 
import type { PostService } from "../domain/post/post.types.ts";

export function createPostService(repo: IPostRepository): PostService {
    function getPosts() {
        return repo.findAll();
    }

    function getPost(id: number) {
        return repo.findById(id);
    }

    function createPost(payload: { title: string; content?: string | null }) {
        const postData = {
            title: payload.title,
            content: payload.content ?? null,
        };
        
        return repo.insert(postData);
    }

    return { 
        getPosts, 
        getPost, 
        createPost 
    };
}
