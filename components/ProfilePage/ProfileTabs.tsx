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
import { AccountData, UserProfileData } from "@/types/ApiProfile"
import { updateProfileData } from "@/app/actions/profileActions"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { calculateBenedictCalories } from "@/utils/calorieCalculator"

export default function ProfileTabs({ profileData }: { profileData: UserProfileData | null }) {

    const caloriasDiarias = calculateBenedictCalories(profileData);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const accountData: AccountData = {
            currentWeight: parseFloat(formData.get('current_weight') as string) || null,
            desiredWeight: parseFloat(formData.get('desired_weight') as string) || null,
            height: parseFloat(formData.get('height') as string) || null,
            age: parseInt(formData.get('age') as string) || null,
            gender: formData.get('gender') as string || null,
            dailyActivity: formData.get('daily_activity') as string || null,
            weightGoal: formData.get('weight_goal') as string || null,
            weightChangeGoal: parseFloat(formData.get('weight_change_goal') as string) || null,
        };

        const response = await updateProfileData(accountData);

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
                    <div className="grid grid-cols-2 w-full gap-8">
                        <div className="w-full flex flex-col gap-8">
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Peso actual
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {profileData?.current_weight || 'Ir en configuración'}
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
                                        {profileData?.desired_weight || 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-8">
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Objetivo
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {profileData?.weight_change_goal || 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Calorías diarias recomendadas
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {caloriasDiarias ? `${caloriasDiarias.toFixed(2)} kcal` : 'Ir en configuración'}
                                    </p>
                                </div>
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
                <Card className="border-none w-full p-0">
                    <CardHeader className="pt-0 px-0 pb-8 flex flex-col gap-[1.5rem]">
                        <div className="flex flex-col space-y-1.5 pt-0 px-0">
                            <CardTitle>Datos personales</CardTitle>
                            <CardDescription>
                                Administre la configuración de su cuenta.
                            </CardDescription>
                        </div>
                        <div className="bg-border h-[1px] w-full"></div>
                    </CardHeader>
                    <form onSubmit={handleUpdate}>
                        <CardContent className="space-y-2 p-0 flex flex-col gap-8">
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2">
                                    <Label>Genero</Label>
                                    <Select defaultValue={profileData?.gender || ''} name="gender">
                                        <SelectTrigger className="w-full h-10">
                                            <SelectValue placeholder="Género" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectGroup >
                                                <SelectLabel>Seleccionar género</SelectLabel>
                                                <SelectItem value="male">Masculino</SelectItem>
                                                <SelectItem value="female">Femenino</SelectItem>
                                                <SelectItem value="other">Otro</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label>Actividad diria</Label>
                                    <Select defaultValue={profileData?.daily_activity || ''} name="daily_activity">
                                        <SelectTrigger className="w-full h-10">
                                            <SelectValue placeholder="Actividad diaria" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectGroup >
                                                <SelectLabel>Seleccionar nivel de actividad</SelectLabel>
                                                <SelectItem value="sedentary">Sedentario</SelectItem>
                                                <SelectItem value="lightly_active">Ligera</SelectItem>
                                                <SelectItem value="moderately_active">Moderada</SelectItem>
                                                <SelectItem value="very_active">Intensa</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2">
                                    <Label>Objetivo</Label>
                                    <Select defaultValue={profileData?.weight_goal || ''} name="weight_goal">
                                        <SelectTrigger className="w-full h-10">
                                            <SelectValue placeholder="Seleccionar objetivo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Seleccionar objetivo de peso</SelectLabel>
                                                <SelectItem value="gain">Subir de peso</SelectItem>
                                                <SelectItem value="lose">Bajar de peso</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="weight_change_goal">{'Peso a cambiar por semana (kg)'}</Label>
                                    <Input
                                        id="weight_change_goal"
                                        name="weight_change_goal"
                                        placeholder="0.5"
                                        type="number"
                                        step="0.1"
                                        defaultValue={profileData?.weight_change_goal || ''}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="account-height">{'Altura (cm)'}</Label>
                                    <Input
                                        id="account-height"
                                        name="height"
                                        placeholder="175"
                                        type="number"
                                        step="0.1"
                                        defaultValue={profileData?.height || ''}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="account-age">Edad</Label>
                                    <Input
                                        id="account-age"
                                        name="age"
                                        placeholder="30"
                                        type="number"
                                        defaultValue={profileData?.age || ''}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="account-current-weight">Peso actual</Label>
                                    <Input
                                        id="account-current-weight"
                                        name="current_weight"
                                        placeholder="90.5"
                                        type="number"
                                        step="0.1"
                                        defaultValue={profileData?.current_weight || ''}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="account-desired-weight">Peso deseado</Label>
                                    <Input
                                        id="account-desired-weight"
                                        name="desired_weight"
                                        placeholder="87.5"
                                        type="number"
                                        step="0.1"
                                        defaultValue={profileData?.desired_weight || ''}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-12">
                            <Button type="submit" variant={'violetPrimary'} className="w-full">Guardar cambios</Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>

        </Tabs>
    )
}