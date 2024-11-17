'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon, TrashIcon, Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ExcerciseData } from "@/types/ActionsTypes";
import parseWeight from "@/utils/parseWeight";
import { deleteExercise } from "@/app/actions/excerciseActions";
import { toast } from "sonner";

export default function ExerciseCard({ isBorderB, exerciseData, routineId }: { isBorderB: boolean, exerciseData: ExcerciseData, routineId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        const response = await deleteExercise(exerciseData.id, routineId);

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }
        toast.success(response.message);
    }

    return (
        <div className={`w-full overflow-hidden h-full px-6`}>
            <div className={`relative w-full h-full ${isBorderB ? "" : "border-b"}`}>

                {/* card content */}
                <div className={`h-full w-full flex flex-col justify-between gap-12  py-8`}>
                    <div>
                        <p className="whitespace-nowrap text-2xl font-semibold tracking-tight">{exerciseData.name}</p>
                    </div>
                    <div className="flex gap-8">
                        <p className="whitespace-nowrap text-sm text-muted-foreground">{`${exerciseData.repetitions} repeticiones`}</p>
                        <Badge variant={'violet'} className="whitespace-nowrap">
                            {`${parseWeight(exerciseData.weight)} kg`}
                        </Badge>
                    </div>
                </div>

                {/* Fondo difuminado */}
                <div className={`${isOpen ? "bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40" : "bg-transparent"} absolute top-0 -left-6 h-full w-full transition-background duration-300 pointer-events-none`} />

                {/* Botonera */}
                <div className={`absolute top-0 ${isOpen ? "right-0" : "-right-[228px]"} bg-background transition-all duration-300 w-[275px] h-full py-8`}>
                    <div className="border-l flex justify-end items-center h-full">
                        <div className="flex flex-col justify-between items-center w-14 h-full">
                            {isOpen
                                ? <>
                                    <div className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        <CheckIcon className="h-7 w-7" />
                                    </div>
                                </>
                                : <>
                                    <div onClick={() => setIsOpen(!isOpen)}
                                        className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        <Pencil2Icon className="h-5 w-5" />
                                    </div>
                                </>}
                            {isOpen
                                ? <>
                                    <div onClick={() => setIsOpen(!isOpen)}
                                        className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        <Cross2Icon className="h-6 w-6" />
                                    </div>
                                </>
                                : <>
                                    <div onClick={handleDelete} className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        <TrashIcon className="h-6 w-6" />
                                    </div>
                                </>}
                        </div>
                        <div className={`relative flex flex-col items-end justify-center gap-6 h-full w-full`}>
                            <div className="flex items-center gap-4">
                                <p className="whitespace-nowrap text-sm text-muted-foreground">12 Reps.</p>
                                <div className="flex gap-6">
                                    <Button size={'icon'} variant="violet">
                                        <MinusIcon className="h-5 w-5" />
                                    </Button>
                                    <Button size={'icon'} variant="violet">
                                        <PlusIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="whitespace-nowrap text-sm text-muted-foreground">25,5 Kg.</p>
                                <div className="flex gap-6">
                                    <Button size={'icon'} variant="violet">
                                        <MinusIcon className="h-5 w-5" />
                                    </Button>
                                    <Button size={'icon'} variant="violet">
                                        <PlusIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}