'use client'
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton() {
    return (
        <Button variant={'violet'} size={'sm'} onClick={() => signOut()}
            className="flex items-center justify-center gap-2 h-9 font-bold">
            Cerrar sesión
        </Button>
    )
}