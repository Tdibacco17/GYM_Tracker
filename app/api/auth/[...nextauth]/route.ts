import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import { compare } from "@/utils/bcrypt";
import { User } from "@/types/ModelsTypes";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "m@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // console.log(credentials)
                try {
                    if (!credentials?.email || !credentials?.password) return null;
                    if (credentials?.email !== process.env.ADMIN_EMAIL) return null

                    const response = await pool.query<User>(
                        "SELECT id, email, password, access_token FROM users WHERE email = $1",
                        [credentials?.email]
                    );
                    const user: User | undefined = response.rows[0];

                    if (!user || !(await compare(credentials?.password, user.password))) {
                        return null;
                    }

                    if (!(await compare(process.env.ACCESS_TOKEN, user.access_token))) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        image: "https://github.com/shadcn.png", // user.image ||
                        accessToken: user.access_token
                    };

                } catch (error) {
                    console.error("Error in authorize function:", error); // line fix build
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            // console.log('JWT Callback:', token);
            return token;
        },
        async session({ session }) {
            // session.user.email = session.user.email;
            // session.user.image = session.user.image;
            // session.user.accessToken  = token.accessToken ;
            // console.log('Session Callback:', session);
            return session;
        },
    },
    pages: {
        signIn: '/'
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }