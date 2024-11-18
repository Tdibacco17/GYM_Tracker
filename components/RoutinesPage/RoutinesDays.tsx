'use client'
import { UserRoutinesData } from "@/types/ActionsTypes"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function RoutinesDays({ routinesData }: { routinesData: UserRoutinesData[] | null }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-row items-center justify-start w-full overflow-x-scroll no-scrollbar overflow-y-hidden px-6 py-6 gap-8">
            {routinesData ?
                routinesData?.map((routineData, index) => {
                    const isActive = pathname === `/dashboard/routines/${routineData.id}`;

                    return (
                        <Link href={`/dashboard/routines/${routineData.id}`} key={index}
                            className={`${isActive ? "text-[#9162c0] font-semibold" : "text-muted-foreground"} font-semibold whitespace-nowrap text-left`}>
                            {routineData.name}
                        </Link>
                    )
                })
                : <p className="text-sm text-muted-foreground font-semibold whitespace-nowrap text-left">
                    No hay rutinas existentes.
                </p>
            }
        </div>
    )
}