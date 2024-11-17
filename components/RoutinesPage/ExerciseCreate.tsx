'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import { NewExerciseData } from "@/types/ActionsTypes"
import { addExerciseToRoutine } from "@/app/actions/excerciseActions"
import { ApiResponseInterface } from "@/types/ApiTypes"
import { toast } from "sonner"


export default function ExerciseCreate({ routineId }: { routineId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const exerciseRef = useRef<HTMLInputElement>(null)
    const repetitionsRef = useRef<HTMLInputElement>(null)
    const weightRef = useRef<HTMLInputElement>(null)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = exerciseRef.current?.value;
        const repetitions = repetitionsRef.current?.value;
        const weight = weightRef.current?.value;

        if (!name || !repetitions || !weight) {
            return;
        }

        const newExercise: NewExerciseData = {
            routineId,
            name,
            repetitions: parseInt(repetitions, 10),
            weight: parseFloat(weight),
        }

        const response: ApiResponseInterface = await addExerciseToRoutine(newExercise)

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }

        if (exerciseRef.current) exerciseRef.current.value = "";
        if (repetitionsRef.current) repetitionsRef.current.value = "";
        if (weightRef.current) weightRef.current.value = "";
        toast.success(response.message);
        setIsOpen(!isOpen)
    }


    useEffect(() => {
        if (!isOpen) {
            if (exerciseRef.current) exerciseRef.current.value = "";
            if (repetitionsRef.current) repetitionsRef.current.value = "";
            if (weightRef.current) weightRef.current.value = "";
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant={'violet'} className="flex items-center justify-center gap-2 h-9" size={'sm'}><PlusIcon />Ejercicio</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <SheetHeader>
                    <SheetTitle>Nuevo ejercicio</SheetTitle>
                    <SheetDescription>
                        Completar los valores en el formulario.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreate}>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="exercise-name">Nombre</Label>
                                    <Input
                                        id="exercise-name"
                                        name="name"
                                        placeholder="Ejemplo: Sentadillas"
                                        className="col-span-4"
                                        ref={exerciseRef}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="exercise-repetitions">Repeticiones</Label>
                                    <Input
                                        id="exercise-repetitions"
                                        name="repetitions"
                                        type="number"
                                        placeholder="Ejemplo: 12"
                                        className="col-span-4"
                                        ref={repetitionsRef}
                                        min={1}
                                        required
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("Las repeticiones deben ser al menos 1.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>

                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="exercise-weight">Peso</Label>
                                    <Input
                                        id="exercise-weight"
                                        name="weight"
                                        type="number"
                                        placeholder="Ejemplo: 87.5"
                                        step="0.1"
                                        min="0.1"
                                        className="col-span-4"
                                        ref={weightRef}
                                        required
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("El peso debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" variant={'violetPrimary'} size={'lg'}>Crear ejercicio</Button>
                </form>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" variant={'violetPrimary'} size={'lg'}>Crear ejercicio</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent >
        </Sheet >
    )
}