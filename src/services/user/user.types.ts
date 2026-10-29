import type { AuthInput, PublicUser } from "./types.js" // Убедитесь, что пути к вашим типам верны

export interface TokenSigner {
    signAccessToken: (userId: number) => string;
    signRefreshToken: (userId: number) => string;
}

export interface TokenVerifier {
    verifyAccessToken: (token: string) => number;
    verifyRefreshToken: (token: string) => number;
}

export interface UserTokens {
    accessToken: string;
    refreshToken: string;
}

export interface UserService {
    register: (input: AuthInput) => Promise<PublicUser>;
    login: (input: AuthInput) => Promise<{ user: PublicUser } & UserTokens>;
    refresh: (refreshToken: string) => Promise<UserTokens>;
    me: (userId: number) => Promise<PublicUser>;
}
