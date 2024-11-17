'use client'
import { FormEvent, useState } from "react";
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
import { deleteRoutine, getFirstRoutine } from "@/app/actions/routineActions";
import { useRouter } from "next/navigation";
import { ApiDataResponseInterface, UserRoutinesData } from "@/types/ActionsTypes";
import { SpinIcon } from "../ui/icons";

export default function DeleteRoutine({ routineId }: { routineId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const response = await deleteRoutine(routineId)

        if (response.status === 500) {
            toast.error(response.message);
            return;
        }

        if (response.status !== 200) {
            toast.warning(response.message);
            return;
        }
        toast.success(response.message);
        const responsePush: ApiDataResponseInterface = await getFirstRoutine()
        const data: UserRoutinesData | null = responsePush.data;

        if (response.status === 200 && data) {
            router.push(`/dashboard/routines/${data.id}`)
        } else {
            router.push('/dashboard');
        }
    }

    return (
        <div className="flex justify-between items-end w-full gap-8">
            <AlertDialog >
                <AlertDialogTrigger asChild>
                    <Button disabled={loading} variant={'outline'}
                        className="flex items-center justify-center gap-2 h-9 w-[100px] min-w-[100px] max-w-[100px]" size={'sm'}>
                        {loading ? <SpinIcon /> : 'Borrar rutina'}
                    </Button>
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