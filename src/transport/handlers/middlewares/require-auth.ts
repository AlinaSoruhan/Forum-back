import type { RequestHandler } from "express";

export function createRequireAuth(
    verifyAccessToken: (token: string) => number
): RequestHandler {
    return (req, res, next) =>{
        const token = req.cookies?.accessToken

        if(typeof token !== "string"){
            res.status(401).json({
                message: "Unauthorized"
            })
            return
        }
        try{
            const userId = verifyAccessToken(token)
            res.locals.userId = userId
            next()
        } catch{
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } 
        
    
}