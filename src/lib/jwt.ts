import "dotenv/config"
import jwt from "jsonwebtoken"

const secretAccess = process.env.JWT_ACCESS_SECRET
const secretRefresh = process.env.JWT_REFRESH_SECRET

if (!secretAccess) throw new Error("JWT_ACCESS_SECRET is not defined")
if (!secretRefresh) throw new Error("JWT_REFRESH_SECRET is not defined")

export function signAccessToken(userId: number): string {
    return jwt.sign({}, secretAccess, { 
        algorithm: "HS256",
        subject: String(userId),
        expiresIn: "15m"
    })
}

export function signRefreshToken(userId: number): string {
    return jwt.sign({ type: "refresh" }, secretRefresh, { 
        algorithm: "HS256",
        subject: String(userId),
        expiresIn: "7d"
    })
}

export function verifyAccessToken(token: string): number {
    try {
        const payload = jwt.verify(token, secretAccess, {
            algorithms: ["HS256"]
        })
        
        if (typeof payload === "string" || typeof payload.sub !== "string") {
            throw new Error()
        }
        
        const userId = Number(payload.sub)
        if (isNaN(userId)) throw new Error() 
        
        return userId
    } catch (error) {
        throw new Error("INVALID_ACCESS_TOKEN")
    }
}

export function verifyRefreshToken(token: string): number {
    try {
        const payload = jwt.verify(token, secretRefresh, {
            algorithms: ["HS256"]
        })
        
        const payloadObj = payload as Record<string, any>
        
        if (typeof payload === "string" || typeof payloadObj.sub !== "string" || payloadObj.type !== "refresh") {
            throw new Error()
        }
        
        const userId = Number(payloadObj.sub)
        if (isNaN(userId)) throw new Error()
        
        return userId
    } catch (error) {
        throw new Error("INVALID_REFRESH_TOKEN")
    }
}
