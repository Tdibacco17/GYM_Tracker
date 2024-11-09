'use client'
import { Button } from "../ui/button";

export default function RoutinesButtons() {

    return (
        <div className={`h-24 w-full px-8`}>
            <div className="w-full h-full flex justify-between items-center">
                <div className="flex justify-start gap-4 w-full">
                    <Button variant={'outline'} size={'sm'}>
                        Borrar rutina
                    </Button>
                </div>
                <div className="flex justify-end gap-4 w-full">
                    <Button variant={'violet'} size={'sm'} className="font-semibold uppercase">
                        + Ejercicio
                    </Button>
                </div>
            </div>
        </div>
    )
}