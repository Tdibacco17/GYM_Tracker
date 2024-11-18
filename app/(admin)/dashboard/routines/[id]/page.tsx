import { getExercisesByRoutine } from "@/app/actions/excerciseActions";
import { getFirstRoutine } from "@/app/actions/routineActions";
import FallbackRoutineCards from "@/components/Fallbacks/FallbackRoutineCards";
import ExerciseCard from "@/components/RoutinesPage/ExerciseCard";
import RoutinesButtons from "@/components/RoutinesPage/RoutinesButtons";
import { buttonVariants } from "@/components/ui/button";
import { ApiDataResponseInterface, ExcerciseData, UserRoutinesData } from "@/types/ActionsTypes";
import Link from "next/link";
import { Suspense } from "react";

export default function RoutineIdPage({ params }: { params: { id: string } }) {

    return (
        <Suspense fallback={<FallbackRoutineCards />}>
            <AsyncExercises routineId={params.id} />
        </Suspense>
    )
}

async function AsyncExercises({ routineId }: { routineId: string }) {
    const response: ApiDataResponseInterface = await getExercisesByRoutine(routineId);

    if (response.status === 404) {
        const response: ApiDataResponseInterface = await getFirstRoutine()
        const data: UserRoutinesData | null = response.data;
        const linkText = (response.status === 200 && data)
            ? `/dashboard/routines/${data.id}` : '/dashboard'

        return (
            <div className="flex flex-col items-center justify-center min-h-[100vh] w-full absolute top-0 pointer-events-none">
                <p className="text-muted-foreground text-sm">Ocurrio un error inesperado</p>
                <div>
                    <Link href={linkText}
                        className={`${buttonVariants({ variant: 'link' })} pointer-events-auto`}>Recargar
                    </Link>
                </div>
            </div>
        )
    }

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
