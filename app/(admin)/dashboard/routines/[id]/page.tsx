import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesButtons from "@/components/RoutinesPage/RoutinesButtons";
import { SpinIcon } from "@/components/ui/icons";
import { Suspense } from "react";

export default function RoutineIdPage({ params }: { params: { id: string } }) {

    return (
        <Suspense fallback={<SpinIcon />}>
            <AsyncExercises routineId={params.id} />
        </Suspense>
    )
}

async function AsyncExercises({ routineId }: { routineId: string }) {
    const arreglo = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            <RoutinesButtons routineId={routineId}/>
            {arreglo.map((_, index) => {
                return <ExerciseCard key={index} isBorderB={index >= arreglo.length - 1} />
            })}
        </>
    )
}
