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
import { ApiResponseInterface, NewExerciseData, RepetitionsType, WeightType } from "@/types/ActionsTypes"
import { addExerciseToRoutine } from "@/app/actions/excerciseActions"
import { toast } from "sonner"
import { SpinIcon } from "../ui/icons"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ExerciseCreate({ routineId }: { routineId: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const exerciseRef = useRef<HTMLInputElement>(null)
    const repetitionsRef = useRef<HTMLInputElement>(null)
    const weightRef = useRef<HTMLInputElement>(null)
    const [repetitionsType, setRepetitionsType] = useState<RepetitionsType | undefined>(undefined);
    const [weightType, setWeightType] = useState<WeightType | undefined>(undefined);

    const isValidStep = (value: number, step: number = 0.5): boolean => {
        return (value % step === 0);
    }

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = exerciseRef.current?.value;
        const repetitions = repetitionsRef.current?.value;
        const weight = weightRef.current?.value;

        if (!name || !repetitions || !weight || !repetitionsType || !weightType) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        const weightValue = parseFloat(weight);
        if (!isValidStep(weightValue)) {
            toast.error("El peso debe ser de 0.5 en 0.5");
            return;
        }

        setLoading(true)
        const newExercise: NewExerciseData = {
            routineId,
            name,
            repetitions: parseInt(repetitions, 10),
            weight: weightValue,
            repetitionsType: repetitionsType,
            weightType: weightType,
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
        setRepetitionsType(undefined);
        setWeightType(undefined);
        setIsOpen(!isOpen)
        setLoading(false)
        toast.success(response.message);
    }

    useEffect(() => {
        if (!isOpen) {
            if (exerciseRef.current) exerciseRef.current.value = "";
            if (repetitionsRef.current) repetitionsRef.current.value = "";
            if (weightRef.current) weightRef.current.value = "";
            setRepetitionsType(undefined);
            setWeightType(undefined);
        }
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button variant={'violet'}
                    className="flex items-center justify-center gap-2 h-9 font-bold w-[100px] min-w-[100px] max-w-[100px]" size={'sm'}>
                    <PlusIcon />
                    Ejercicio
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto h-full min-w-full wrapper:min-w-[750px] ">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-semibold leading-none tracking-tight text-left">Nuevo ejercicio</SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground text-left">
                        Completar los valores en el formulario.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleCreate}>
                    <div className={`flex flex-col py-8`}>
                        <div className="grid gap-8 h-full">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="exercise-name">Nombre</Label>
                                    <Input
                                        id="exercise-name"
                                        name="name"
                                        placeholder="Sentadillas"
                                        className="w-full"
                                        ref={exerciseRef}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-8 w-full">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <Label htmlFor="exercise-repetitions">Repeticiones</Label>
                                        <Input
                                            id="exercise-repetitions"
                                            name="repetitions"
                                            type="number"
                                            placeholder="12"
                                            className="w-full"
                                            ref={repetitionsRef}
                                            min={1}
                                            required
                                            onInvalid={(e) =>
                                                e.currentTarget.setCustomValidity("Las repeticiones deben ser al menos 1.")
                                            }
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between">
                                        <Label>Tipo de repeticiones</Label>
                                        <Select
                                            name="repetitions_type"
                                            onValueChange={(value) => setRepetitionsType(value as RepetitionsType)}
                                        >
                                            <SelectTrigger className="w-full h-10">
                                                <SelectValue placeholder="Seleccionar tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Seleccionar tipo</SelectLabel>
                                                    <SelectItem value="unilateral">
                                                        Unilateral
                                                        <span className="text-muted-foreground text-xs pl-2">
                                                            (un brazo/pierna)
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="bilateral">
                                                        Bilateral
                                                        <span className="text-muted-foreground text-xs pl-2">
                                                            (ambos brazos/piernas)
                                                        </span>
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8 w-full">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <Label htmlFor="exercise-weight">Peso</Label>
                                        <Input
                                            id="exercise-weight"
                                            name="weight"
                                            type="number"
                                            placeholder="87.5"
                                            step="0.1"
                                            min="0.1"
                                            className="w-full"
                                            ref={weightRef}
                                            required
                                            onInvalid={(e) =>
                                                e.currentTarget.setCustomValidity("El peso debe ser mayor a 0.")
                                            }
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 justify-between">
                                        <Label>Tipo de peso</Label>
                                        <Select
                                            name="weight_type"
                                            onValueChange={(value) => setWeightType(value as WeightType)}
                                        >
                                            <SelectTrigger className="w-full h-10">
                                                <SelectValue placeholder="Seleccionar tipo de peso" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Seleccionar tipo</SelectLabel>
                                                    <SelectItem value="per_side">Por lado</SelectItem>
                                                    <SelectItem value="total">
                                                        General
                                                        <span className="text-muted-foreground text-xs pl-2">
                                                            (total)
                                                        </span></SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button disabled={loading} type="submit" variant={'violetPrimary'} size={'lg'} className="font-semibold w-[165px] min-w-[165px] max-w-[165px]">
                            {loading ? <SpinIcon /> : 'Crear ejercicio'}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}