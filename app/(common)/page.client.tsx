'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { GitHubIcon, GoogleIcon, SpinIcon } from "@/components/ui/icons";

export default function LoginPageClient() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) return
        setLoading(true);

        const response = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: '/dashboard'
        })
        // console.log(response)
        if (!response?.ok || response?.status === 401) {
            setErrorMessage('Credenciales invalidas');
            setLoading(false);
            setTimeout(() => {
                setErrorMessage(null);
            }, 4000)
        } else {
            setTimeout(() => {
                setLoading(false);
                router.push('/dashboard')
            }, 2000)
        }
    }

    return (
        <Card className="w-full sm:w-96 border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold leading-none tracking-tight text-center">Iniciar sesión</CardTitle>
                <CardDescription className="text-sm text-muted-foreground text-center">Bienvenido de nuevo! Por favor inicia sesión para continuar</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="">
                <CardContent className="grid gap-y-[1.25rem]">
                    <div className="grid grid-cols-2 gap-x-4">
                        <Button disabled={true} size="sm" type="button" variant={'outline'} className="text-sm font-medium px-3 whitespace-nowrap h-9">
                            <GitHubIcon /> GitHub
                        </Button>
                        <Button disabled={true} size="sm" type="button" variant={'outline'} className="text-sm font-medium px-3 whitespace-nowrap h-9">
                            <GoogleIcon /> Google
                        </Button>
                    </div>
                    <p className="flex items-center gap-x-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        O CONTINUAR CON
                    </p>
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" name="email" placeholder="m@example.com" type="email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="login-password">Contraseña</Label>
                            <Input id="login-password" name="password" placeholder="********" type="password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-between gap-4 w-full relative">
                    <Button disabled={loading} type="submit" className="w-full flex justify-center items-center relative" variant={'violetPrimary'}>
                        {loading && <SpinIcon />} Continuar
                    </Button>
                    {errorMessage && <small className="absolute -bottom-4 text-sm text-red-800 whitespace-nowrap font-semibold">{errorMessage}</small>}
                </CardFooter>
            </form>
        </Card>
    );
}
