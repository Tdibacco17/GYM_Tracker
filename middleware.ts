import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        // console.log(req.nextauth.token)

        try {
            const session = req.nextauth.token

            if (!session) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // console.log(token);
                if (!token) return false
                // if (!token.roles?.includes('A')) {
                //     return false
                // }
                return true
            },
        },
    },
)

export const config = {
    matcher: ['/dashboard/:path*'],
};