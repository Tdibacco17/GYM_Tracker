import DeleteRoutine from "./DeleteRoutine";
import ExerciseCreate from "./ExerciseCreate";


export default function RoutinesButtons({ routineId }: { routineId: string }) {

    return (
        <div className={`w-full px-6 pb-6`}>
            <div className="w-full h-full">
                <div className="w-full h-full flex justify-between items-center">
                    <div className="flex justify-start gap-4 w-full">
                        <DeleteRoutine routineId={routineId} />
                    </div>
                    <div className="flex justify-end gap-4 w-full">
                        <ExerciseCreate routineId={routineId} />
                    </div>
                </div>
            </div>
        </div>
    )
}