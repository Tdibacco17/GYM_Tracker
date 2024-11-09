import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function NotFound() {
    const session = await getServerSession();

    if (session && session.user.email === process.env.ADMIN_EMAIL) {
        return redirect("/dashboard");
    }

    return redirect("/")
}