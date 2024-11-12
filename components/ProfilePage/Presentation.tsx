import Image from "next/image";
import { getServerSession } from "next-auth";

export default async function Presentation() {
    const session = await getServerSession();
    return (
        <>
            <div className="rounded-full min-w-24 max-w-24 w-24 min-h-24 h-24 max-h-24 overflow-hidden bg-[#27272A]">
                <Image
                    src={session?.user.image ? session?.user.image : "https://github.com/shadcn.png"}
                    alt="Profile img"
                    width={460}
                    height={460}
                    className="min-w-24 max-w-24 w-24 h-auto"
                />
            </div>
            <p className="text-muted-foreground">{session?.user.email || `Bienvenido`}</p>
        </>
    )
}