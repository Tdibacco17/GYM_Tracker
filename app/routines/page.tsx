import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesButtons from "@/components/RoutinesPage/RoutinesButtons";
import RoutinesDays from "@/components/RoutinesPage/RoutinesDays";
import { Suspense } from "react";

export default function RoutinePage() {
    return (
        <section className="flex flex-col relative pt-[2.5rem] -mb-4 w-full">
            <div className="flex flex-col justify-center fixed top-0 left-0 z-20 border-b w-full max-w-[768px] bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                <RoutinesDays />
            </div>
            <Suspense fallback={<p>Cargando..</p>}>
                <ExercisesGrid />
            </Suspense>
        </section>
    )
}

async function ExercisesGrid() {
    const arreglo = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            <RoutinesButtons />
            {arreglo.map((_, index) => {
                return <ExerciseCard key={index} isBorderT={index === 0} />
            })}
        </>
    )
}
