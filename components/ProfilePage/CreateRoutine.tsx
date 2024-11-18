'use client'
import { createRoutine } from "@/app/actions/routineActions"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SpinIcon } from "../ui/icons"

export default function CreateRoutine() {
    const [routineName, setRoutineName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateRoutine = async () => {
        if (!routineName.trim()) {
            return
        }
        setLoading(true);
        const response = await createRoutine(routineName);

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }
        setLoading(false);
        setRoutineName('')
        toast.success(response.message);
    }


    return (
        <div className="flex flex-col w-full gap-2">
            <div>
                <Label htmlFor="routine-name" className="font-semibold leading-none tracking-tight text-base">
                    Crear una nueva rutina
                </Label>
            </div>
            <div className="flex gap-8 w-full">
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
                <Button disabled={routineName.trim().length === 0 || loading} variant={'violetPrimary'} size={'lg'}
                    className="font-semibold w-[110px] min-w-[110px] max-w-[110px]" onClick={handleCreateRoutine}
                >
                    {loading ? <SpinIcon /> : 'Crear'}
                </Button>
            </div>
        </div>
    )
}