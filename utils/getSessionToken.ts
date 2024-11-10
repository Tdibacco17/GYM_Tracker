'use server';
import { getToken } from "next-auth/jwt";
import { cookies } from 'next/headers';
import { compare } from "./bcrypt";
import { NextAuthToken } from "@/types/ModelsTypes";

export async function getSessionToken(): Promise<NextAuthToken | null> {
    try {
        const session = await getToken({
            req: {
                cookies: {
                    'next-auth.session-token': cookies().get('next-auth.session-token')?.value
                }
            } as any,
            secret: process.env.NEXTAUTH_SECRET as string
        }) as NextAuthToken | null;

        if (!session) {
            return null;
        }
        if (!(await compare(process.env.ACCESS_TOKEN, session?.accessToken))) {
            return null;
        }

        return session;
    } catch (error) {
        console.error("Failed to get session: ", error);
        return null;
    }
}
