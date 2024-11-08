export default function RoutinesDays() {
    const dias = ['Pecho 1', 'Espalda 1', ' Pierna 1', 'Pecho 2', 'Espalda 2', ' Pierna 2']

    return (
        // pl-4 pr-8
        <div className="relative flex flex-row justify-start items-center gap-4 w-full min-h-14 h-14 max-h-14 overflow-hidden">
            <div className="flex flex-row items-center justify-start w-full overflow-x-scroll no-scrollbar overflow-y-hidden px-4">
                {dias.map((routineData, index) => {
                    const isActive = index === 0

                    return (
                        <p key={index} className={`${isActive ? "text-[#9162c0] font-semibold" : "text-muted-foreground"} font-semibold whitespace-nowrap px-4 text-left`}>
                            {routineData}
                        </p>
                    )
                })}
            </div>
            {/* bg neblina */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent via-35% via-black/50 to-black/75 pointer-events-none" />
        </div>
    )
}