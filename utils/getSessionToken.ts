'use server';
import { getToken } from "next-auth/jwt";
import { cookies } from 'next/headers';
import { compare } from "./bcrypt";

export async function getSessionToken() {
    try {
        const session = await getToken({
            req: {
                cookies: {
                    'next-auth.session-token': cookies().get('next-auth.session-token')?.value
                }
            } as any,
            secret: process.env.NEXTAUTH_SECRET as string
        });

        if (!session) {
            return null;
        }
        if (!(await compare(process.env.ACCESS_TOKEN, session.accessToken))) {
            return null;
        }

        return session;
    } catch (error) {
        console.error("Failed to get session: ", error);
        return null;
    }
}
