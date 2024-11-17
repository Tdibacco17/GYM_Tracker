'use client'
import { FormEvent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { toast } from "sonner";
import { UserRoutinesData } from "@/types/ActionsTypes";
import { deleteRoutine } from "@/app/actions/routineActions";
import { Label } from "@/components/ui/label"

export default function DeleteRoutine({ routinesData }: { routinesData: UserRoutinesData[] | null }) {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();

        const response = await deleteRoutine(selectedValue)

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }

        if (response.status !== 200) {
            toast.warning(response.message);
            return;
        }
        toast.success(response.message);
        setSelectedValue("");
    }

    return (
        <div className="flex justify-between items-end w-full gap-8">
            <div className="flex flex-col gap-2 justify-between w-full">
                <Label >Eliminar una rutina</Label>
                {routinesData && routinesData?.length > 0
                    ? <Select onValueChange={setSelectedValue} value={selectedValue || ""}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Seleccionar especialidad`} />
                        </SelectTrigger>
                        <SelectContent className="!min-w-full !w-full">
                            <SelectGroup >
                                {routinesData?.map((item: UserRoutinesData, index: number) => {
                                    return <SelectItem key={index} value={`${item.id}`}>
                                        {item.name}
                                    </SelectItem>
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    : <p className="py-2 h-9 text-muted-foreground text-sm">No hay existencias.</p>}
            </div>
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button disabled={selectedValue === ""} size={'lg'} type="button" variant={"destructive"} >Eliminar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Atención</AlertDialogTitle>
                        <AlertDialogDescription>
                            Seguro que quieres eliminar esta rutina?
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
        </div>
    )
}