'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FormEvent } from "react"
import { toast } from "sonner"
import { UserProfileData } from "@/types/ApiProfile"
import { updateProfileData } from "@/app/actions/profileActions"

export default function ProfileTabs({ profileData }: { profileData: UserProfileData | null }) {

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const name = (formData.get('name') as string)?.trim() || null;
        const weight = (formData.get('current-weight') as string)?.trim() || null;
        const height = (formData.get('desired-weight') as string)?.trim() || null;

        const response = await updateProfileData(name, weight, height);
        
        if (response.status === 500) {
            toast.error(response.message);
            return;
        }
        if (response.status !== 200) {
            toast.warning(response.message)
            return;
        }
        toast.success(response.message);
    }

    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="config">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="pt-8">
                <div className="w-full flex flex-col gap-8">
                    <div className="w-full flex flex-col gap-8">
                        <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                            <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                            <div className="space-y-1">
                                <p className="font-semibold leading-none tracking-tight">
                                    Peso actual
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {profileData?.weight || 'Ir en configuración'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                            <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                            <div className="space-y-1">
                                <p className="font-semibold leading-none tracking-tight">
                                    Peso deseado
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {profileData?.height || 'Ir en configuración'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button variant={'secondary'} size={'lg'} className="font-semibold" >
                            Crear una nueva rutina
                        </Button>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="config" className="pt-8">
                <Card className="border-none w-full">
                    <CardHeader className="pt-0 px-0 flex flex-col gap-[1.5rem]">
                        <div className="flex flex-col space-y-1.5 pt-0 px-0">
                            <CardTitle>Datos personales</CardTitle>
                            <CardDescription>
                                Administre la configuración de su cuenta.
                            </CardDescription>
                        </div>
                        <div className="bg-border h-[1px] w-full"></div>
                    </CardHeader>
                    <form onSubmit={handleUpdate}>
                        <CardContent className="space-y-2 px-0">
                            <div className="space-y-1">
                                <Label htmlFor="account-name">Nombre</Label>
                                <Input
                                    id="account-name"
                                    name="name"
                                    placeholder="Jhon Doe"
                                    type="text"
                                    defaultValue={profileData?.name || ''}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="account-current-weight">Peso actual</Label>
                                <Input
                                    id="account-current-weight"
                                    name="current-weight"
                                    placeholder="90,5 kg"
                                    type="text"
                                    defaultValue={profileData?.weight || ''}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="account-desired-weight">Peso deseado</Label>
                                <Input
                                    id="account-desired-weight"
                                    name="desired-weight"
                                    placeholder="87,5 kg"
                                    type="text"
                                    defaultValue={profileData?.height || ''}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="p-0">
                            <Button type="submit" variant={'violetPrimary'} className="w-full">Guardar cambios</Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>

        </Tabs>
    )
}