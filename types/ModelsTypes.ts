export interface User {
    id: string;
    email: string;
    password: string;
    access_token: string;
    name?: string,
    weight?: string,
    height?: string,
}

export interface NextAuthToken {
    email: string;
    picture: string;
    sub: string;
    accessToken: string;
    id: string;
    iat: number;
    exp: number;
    jti: string;
}