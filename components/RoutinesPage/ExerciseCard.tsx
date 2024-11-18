'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon, TrashIcon, Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ExcerciseData, UpdateValuesExercise } from "@/types/ActionsTypes";
import parseWeight from "@/utils/parseWeight";
import { deleteExercise } from "@/app/actions/excerciseActions";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SpinIcon } from "../ui/icons";
import { updateExercise } from "@/app/actions/routineActions";

export default function ExerciseCard({
    isBorderB, exerciseData, routineId
}: {
    isBorderB: boolean, exerciseData: ExcerciseData, routineId: string
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [repetitions, setRepetitions] = useState<number>(exerciseData.repetitions)
    const [weight, setWeight] = useState<number>(() => { return parseFloat(parseWeight(exerciseData.weight)); });

    const handleCloseEdit = () => {
        setIsOpen(!isOpen)
        setRepetitions(exerciseData.repetitions)
        setWeight(() => { return parseFloat(parseWeight(exerciseData.weight)) })
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
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

    const handleUpdateValues = async () => {
        const updates: UpdateValuesExercise = {
            repetitions: repetitions !== exerciseData.repetitions ? repetitions : null,
            weight: weight !== parseFloat(parseWeight(exerciseData.weight)) ? weight : null,
        };

        if (!updates.repetitions && !updates.weight) {
            setIsOpen(!isOpen);
            return;
        }

        setLoadingUpdate(true)
        const response = await updateExercise(routineId, exerciseData.id, updates);

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }
        setIsOpen(!isOpen)
        setLoadingUpdate(false)
        toast.success(response.message);
    }

    const handleIncrementRepetitions = () => {
        setRepetitions((prev) => prev + 1);
    };

    const handleDecrementRepetitions = () => {
        setRepetitions((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleIncrementWeight = () => {
        setWeight((prev) => prev + 0.5);
    };

    const handleDecrementWeight = () => {
        setWeight((prev) => (prev > 0 ? prev - 0.5 : prev));
    };

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
                                    <div onClick={handleUpdateValues}
                                        className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        {loadingUpdate ? <SpinIcon /> : <CheckIcon className="h-7 w-7" />}
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
                                    <div onClick={handleCloseEdit}
                                        className="h-10 w-full flex justify-center items-center cursor-pointer">
                                        <Cross2Icon className="h-6 w-6" />
                                    </div>
                                </>
                                : <>
                                    <AlertDialog >
                                        <AlertDialogTrigger asChild>
                                            <Button disabled={loadingDelete} variant={'hidden'} size={'hidden'}
                                                className="h-10 w-full flex justify-center items-center cursor-pointer ">
                                                {loadingDelete ? <SpinIcon /> : <TrashIcon className="h-6 w-6" />}
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Atención</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Seguro que quieres eliminar este ejercicio?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="w-full flex flex-row justify-center items-end gap-6">
                                                <AlertDialogCancel type="button" className="w-full">Cancelar</AlertDialogCancel>
                                                <form onSubmit={handleDelete} className="w-full">
                                                    <AlertDialogAction type="submit"
                                                        className={buttonVariants({ variant: 'destructive', className: 'w-full' })}>
                                                        Eliminar
                                                    </AlertDialogAction>
                                                </form>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>}
                        </div>
                        <div className={`relative flex flex-col items-end justify-center gap-6 h-full w-full`}>
                            <div className="flex items-center gap-4">
                                <p className="whitespace-nowrap text-sm text-muted-foreground">
                                    {`${repetitions} reps.`}
                                </p>
                                <div className="flex gap-6">
                                    <Button size={'icon'} variant="violet"
                                        disabled={repetitions === 1}
                                        onClick={handleDecrementRepetitions}>
                                        <MinusIcon className="h-5 w-5" />
                                    </Button>
                                    <Button size={'icon'} variant="violet"
                                        onClick={handleIncrementRepetitions}>
                                        <PlusIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="whitespace-nowrap text-sm text-muted-foreground">
                                    {`${weight} kg`}
                                </p>
                                <div className="flex gap-6">
                                    <Button size={'icon'} variant="violet"
                                        disabled={weight === 0.5}
                                        onClick={handleDecrementWeight}>
                                        <MinusIcon className="h-5 w-5" />
                                    </Button>
                                    <Button size={'icon'} variant="violet"
                                        onClick={handleIncrementWeight}>
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