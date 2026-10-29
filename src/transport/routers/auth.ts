import { Router, type RequestHandler } from "express";
import type { UserHandler } from "../handlers/user/user.types.js"; 

export function createUserRouter(
    handler: UserHandler, 
    requireAuth: RequestHandler 
) {
    const router = Router();
    router.post('/register', handler.register);
    router.post("/login", handler.login);
    router.post('/refresh', handler.refresh);

    router.get('/me', requireAuth, handler.me);

    return router;
}
