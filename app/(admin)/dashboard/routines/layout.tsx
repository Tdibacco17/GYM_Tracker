import { getRoutines } from "@/app/actions/routineActions";
import FallbackRoutines from "@/components/Fallbacks/FallbackRoutines";
import RoutinesDays from "@/components/RoutinesPage/RoutinesDays";
import { ApiDataResponseInterface } from "@/types/ActionsTypes";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default function RoutinesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col relative pt-20 -mb-4 w-full h-full">
            <div className="flex flex-col justify-center fixed top-0 left-0 z-20 border-b h-[72px] max-h-[72px] w-full max-w-[768px] bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                <div className="relative flex flex-row justify-start items-center gap-4 w-full overflow-hidden">
                    <Suspense fallback={<FallbackRoutines />}>
                        <AsyncRoutines />
                    </Suspense>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-transparent via-35% via-black/50 to-black/75 pointer-events-none" />
                </div>
            </div>
            {children}
        </section>
    )
}

async function AsyncRoutines() {
    const session = await getServerSession();
    if (!session) return null

    const routinesData: ApiDataResponseInterface = await getRoutines();

    return <RoutinesDays routinesData={routinesData.data} />
}
