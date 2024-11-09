import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession();

  return (
    <section className="flex flex-col items-center gap-6 relative p-4 w-full h-full">

      <div className="absolute top-0 right-0 pt-4 pr-4">
        <SignOutButton />
      </div>

      <div className="rounded-full overflow-hidden bg-[#27272A]">
        <Image
          src={session?.user.image ? session?.user.image : "https://github.com/shadcn.png"}
          alt="Profile img"
          width={460}
          height={460}
          className="min-w-24 max-w-24 w-24 h-auto"
        />
      </div>
      <p className="text-muted-foreground">{session?.user.email || 'Bienvenido!'}</p>

      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-8">
          <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
            <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Peso actual
              </p>
              <p className="text-sm text-muted-foreground">
                90,5kg
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
            <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Peso deseado
              </p>
              <p className="text-sm text-muted-foreground">
                86,5kg
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center
        ">
          <Button variant={'secondary'} size={'lg'} className="font-semibold" >
            Crear una nueva rutina
          </Button>
        </div>
      </div>

    </section>
  );
}