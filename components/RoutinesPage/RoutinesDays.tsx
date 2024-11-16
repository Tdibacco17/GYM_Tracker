import { UserRoutinesData } from "@/types/ApiProfile"

export default function RoutinesDays({ routinesData }: { routinesData: UserRoutinesData[] | null }) {

    return (
        <div className="flex flex-row items-center justify-start w-full overflow-x-scroll no-scrollbar overflow-y-hidden px-6 py-6 gap-12">
            {routinesData ?
                routinesData?.map((routineData, index) => {
                    const isActive = index === 0

                    return (
                        <p key={index} className={`${isActive ? "text-[#9162c0] font-semibold" : "text-muted-foreground"} font-semibold whitespace-nowrap text-left`}>
                            {routineData.name}
                        </p>
                    )
                })
                : <p className="text-sm text-muted-foreground font-semibold whitespace-nowrap text-left">
                    No hay existencias.
                </p>
            }
        </div>
    )
}