'use client'
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton() {
    return (
        <Button variant={'violet'} size={'sm'} onClick={() => signOut()}>
            Cerrar sesión
        </Button>
    )
}