import { getRoutines } from "@/app/actions/routineActions";
import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesButtons from "@/components/RoutinesPage/RoutinesButtons";
import RoutinesDays from "@/components/RoutinesPage/RoutinesDays";
import { SpinIcon } from "@/components/ui/icons";
import { ApiDataResponseInterface } from "@/types/ApiTypes";
import { Suspense } from "react";

export default function RoutinePage() {
    return (
        <section className="flex flex-col relative pt-[2.5rem] -mb-4 w-full h-full">
            <div className="flex flex-col justify-center fixed top-0 left-0 z-20 border-b w-full max-w-[768px] bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                <Routines />
            </div>
            <Suspense fallback={<SpinIcon />}>
                <ExercisesGrid />
            </Suspense>
        </section>
    )
}

async function Routines() {
    const routinesData: ApiDataResponseInterface = await getRoutines();

    return <RoutinesDays routinesData={routinesData.data} />
}


async function ExercisesGrid() {
    const arreglo = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            <RoutinesButtons />
            {arreglo.map((_, index) => {
                return <ExerciseCard key={index} isBorderB={index >= arreglo.length - 1} />
            })}
        </>
    )
}
