'use client'
import { Button } from "@/components/ui/button";
import {useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon, TrashIcon, Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export default function ExerciseCard({ isBorderB }: { isBorderB: boolean }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className={`w-full overflow-hidden px-4`}>
                <div className={`relative w-full px-4 py-8 ${isBorderB ? "" : "border-b"}`}>
                    <div className={`min-h-28 h-28 w-full flex flex-col justify-between`}>
                        <div>
                            <p className="whitespace-nowrap text-2xl font-semibold tracking-tight">Pecho plano</p>
                            <p className="whitespace-nowrap text-sm text-muted-foreground">12 Repeticiones</p>
                        </div>
                        <div>
                            <Badge variant={'violet'} className="whitespace-nowrap">
                                25,5 kg
                            </Badge>
                        </div>
                    </div>
                    {/* Fondo difuminado */}
                    <div className={`${isOpen ? "bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/40" : "bg-transparent"} absolute top-0 left-0 h-full w-full transition-background duration-300`} />
                    {/* Botonera */}
                    <div className={`absolute top-0 ${isOpen ? "right-0" : "-right-[228px]"} bg-background transition-all duration-300 py-8 w-[275px] h-full flex justify-end items-center `}>
                        <div className="border-l flex flex-col justify-between items-center w-14 h-full">
                            {isOpen
                                ? <>
                                    <div className="h-full w-full flex justify-center items-center">
                                        <div>
                                            <CheckIcon className="h-7 w-7" />
                                        </div>
                                    </div>
                                </>
                                : <>
                                    <div onClick={() => setIsOpen(!isOpen)} className="h-full w-full flex justify-center items-center">
                                        <div>
                                            <Pencil2Icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                </>}
                            {isOpen
                                ? <>
                                    <div onClick={() => setIsOpen(!isOpen)} className="h-full w-full flex justify-center items-center">
                                        <div>
                                            <Cross2Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                </>
                                : <>
                                    <div className="h-full w-full flex justify-center items-center">
                                        <div>
                                            <TrashIcon className="h-6 w-6" />
                                        </div>
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
        </>
    )
}