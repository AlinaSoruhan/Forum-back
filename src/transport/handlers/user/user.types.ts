import type { Request, Response } from "express";
import type { AuthCredentialsRequest } from "./types.js"; 

export interface UserHandler {
    register: (
        req: Request<{}, {}, AuthCredentialsRequest>,
        res: Response
    ) => Promise<void>;

    login: (
        req: Request<{}, {}, AuthCredentialsRequest>,
        res: Response
    ) => Promise<void>; 

    refresh: (
        req: Request,
        res: Response
    ) => Promise<void>;

    me: (
        req: Request,
        res: Response
    ) => Promise<void>;
}
