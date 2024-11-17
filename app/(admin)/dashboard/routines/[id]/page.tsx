import { getExercisesByRoutine } from "@/app/actions/excerciseActions";
import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesButtons from "@/components/RoutinesPage/RoutinesButtons";
import { SpinIcon } from "@/components/ui/icons";
import { ExcerciseData } from "@/types/ActionsTypes";
import { ApiDataResponseInterface } from "@/types/ApiTypes";
import { Suspense } from "react";

export default function RoutineIdPage({ params }: { params: { id: string } }) {

    return (
        <Suspense fallback={<SpinIcon />}>
            <AsyncExercises routineId={params.id} />
        </Suspense>
    )
}

async function AsyncExercises({ routineId }: { routineId: string }) {
    const response: ApiDataResponseInterface = await getExercisesByRoutine(routineId);
    const data: ExcerciseData[] | null = response.data;

    return (
        <>
            <RoutinesButtons routineId={routineId} />
            {data ? data.map((exerciseData: ExcerciseData, index) => {
                return <ExerciseCard key={exerciseData.id} routineId={routineId} exerciseData={exerciseData} isBorderB={index >= data.length - 1} />
            })
                : <div className="px-6">
                    <p className="py-2 h-9 text-muted-foreground text-sm">
                        No hay ejercicios.
                    </p>
                </div>}
        </>
    )
}
