import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesDays from "@/components/RoutinesPage/RoutinesDays";
import { Suspense } from "react";

export default function RoutinePage() {
    return (
        <section className="flex flex-col relative pt-12 -mb-4 w-full">
            <div className="flex justify-center h-16 fixed top-0 left-0 z-10 border-b w-full max-w-[768px] bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                <RoutinesDays />
                <div className="h-full flex items-center justify-center border-l px-6">
                    <p className="whitespace-nowrap text-base font-semibold">
                        + Ejercicio
                    </p>
                </div>
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
            {arreglo.map((_, index) => {
                return <ExerciseCard key={index} isBorderB={index >= arreglo.length - 1} />
            })}
        </>
    )
}
