import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPageClient from "./page.client";

export default async function LoginPage() {
    const session = await getServerSession();

    if (session && session.user.email === process.env.ADMIN_EMAIL) {
        return redirect("/dashboard");
    }

    return <LoginPageClient />
}