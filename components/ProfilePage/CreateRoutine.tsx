'use client'
import { createRoutine } from "@/app/actions/routineActions"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function CreateRoutine() {
    const [routineName, setRoutineName] = useState<string>("");

    const handleCreateRoutine = async () => {
        if (!routineName.trim()) {
            return
        }

        const response = await createRoutine(routineName);

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }
        toast.success(response.message);
        setRoutineName('')
    }


    return (
        <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col gap-2 justify-between w-full">
                <Label htmlFor="routine-name">Crear una nueva rutina</Label>
                <div className="flex flex-col gap-2 justify-between">
                    <Label htmlFor="routine-name">Este input es para crear una nueva rutina</Label>
                    <Input
                        id="routine-name"
                        name="routineName"
                        placeholder="Nombre de la rutina"
                        type="text"
                        value={routineName}
                        className="w-full"
                        onChange={(e) => setRoutineName(e.target.value)}
                        required
                        onInvalid={(e) =>
                            e.currentTarget.setCustomValidity("Por favor, ingrese un nombre para la rutina.")
                        }
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                </div>

            </div>
            <div className="flex items-end">
                <Button disabled={routineName.trim().length === 0} variant={'secondary'} size={'lg'} className="font-semibold"
                    onClick={handleCreateRoutine}
                >
                    Crear
                </Button>
            </div>
        </div>
    )
}