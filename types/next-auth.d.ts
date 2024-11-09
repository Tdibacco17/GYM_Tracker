import NextAuth, { DefaultSession, DefaultUser, ISODateString } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        accessToken?: string;
    }

    interface Session extends DefaultSession {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
        }
        expires: ISODateString
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
