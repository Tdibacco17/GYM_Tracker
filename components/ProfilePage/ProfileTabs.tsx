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
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { AccountData, DailyActivityType, GenerType, UserProfileData, WeightGoalType } from "@/types/ActionsTypes"
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
import parseWeight from "@/utils/parseWeight"
import CreateRoutine from "./CreateRoutine"
import { SpinIcon } from "../ui/icons"

export default function ProfileTabs({ profileData }: { profileData: UserProfileData | null }) {
    const [loading, setLoading] = useState<boolean>(false);

    const caloriasDiarias = calculateBenedictCalories(profileData);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const accountData: AccountData = {
            currentWeight: parseFloat(formData.get('current_weight') as string) || null,
            desiredWeight: parseFloat(formData.get('desired_weight') as string) || null,
            height: parseFloat(formData.get('height') as string) || null,
            age: parseInt(formData.get('age') as string) || null,
            gender: formData.get('gender') as GenerType || null,
            dailyActivity: formData.get('daily_activity') as DailyActivityType || null,
            weightGoal: formData.get('weight_goal') as WeightGoalType || null,
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
        setLoading(false)
        toast.success(response.message);
    }

    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="config">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="pt-8">
                <div className="w-full flex flex-col gap-6">
                    <div className="grid grid-cols-2 w-full gap-8">
                        <div className="w-full flex flex-col justify-between gap-8">
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 min-h-[72px]">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Peso actual
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {profileData?.current_weight
                                            ? `${parseWeight(profileData.current_weight)} kg`
                                            : 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 min-h-[72px]">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Peso deseado
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {profileData?.desired_weight
                                            ? `${parseWeight(profileData.desired_weight)} kg`
                                            : 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-between gap-8">
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 min-h-[72px]">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Objetivo semanal
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {profileData?.weight_goal && profileData?.weight_change_goal !== null
                                            ? `${profileData.weight_goal === 'lose'
                                                ? `Bajar ${profileData.weight_change_goal * 1000} kg`
                                                : `Subir ${profileData.weight_change_goal * 1000} kg`
                                            }`
                                            : 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 min-h-[72px]">
                                <div className="flex h-2 w-2 translate-y-1 rounded-full bg-[#9162c0]" />
                                <div className="space-y-1">
                                    <p className="font-semibold leading-none tracking-tight">
                                        Calorías diarias
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {caloriasDiarias ? `${caloriasDiarias} kcal` : 'Ir en configuración'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <CreateRoutine />
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
                                <div className="flex flex-col gap-2 justify-between">
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
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label>Actividad diria</Label>
                                    <Select defaultValue={profileData?.daily_activity || ''} name="daily_activity">
                                        <SelectTrigger className="w-full h-10">
                                            <SelectValue placeholder="Actividad diaria" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectGroup >
                                                <SelectItem value="sedentary">
                                                    Sedentario
                                                    <span className="text-muted-foreground text-xs pl-2">
                                                        (0-1 días/semana)
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="lightly_active">
                                                    Ligera
                                                    <span className="text-muted-foreground text-xs pl-2">
                                                        (1-3 días/semana)
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="moderately_active">
                                                    Moderada
                                                    <span className="text-muted-foreground text-xs pl-2">
                                                        (3-5 días/semana)
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="very_active">
                                                    Intensa
                                                    <span className="text-muted-foreground text-xs pl-2">
                                                        (6-7 días/semana)
                                                    </span>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2 justify-between">
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
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="weight_change_goal">{'Peso a cambiar por semana (kg)'}</Label>
                                    <Input
                                        id="weight_change_goal"
                                        name="weight_change_goal"
                                        placeholder="0.5"
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        defaultValue={profileData?.weight_change_goal || ''}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("El peso debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="account-height">{'Altura (cm)'}</Label>
                                    <Input
                                        id="account-height"
                                        name="height"
                                        placeholder="175"
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        defaultValue={profileData?.height || ''}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("La altura debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="account-age">Edad</Label>
                                    <Input
                                        id="account-age"
                                        name="age"
                                        placeholder="30"
                                        type="number"
                                        min="1"
                                        defaultValue={profileData?.age || ''}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("La edad debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-8">
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="account-current-weight">Peso actual</Label>
                                    <Input
                                        id="account-current-weight"
                                        name="current_weight"
                                        placeholder="90.5"
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        defaultValue={profileData?.current_weight || ''}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("El peso debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 justify-between">
                                    <Label htmlFor="account-desired-weight">Peso deseado</Label>
                                    <Input
                                        id="account-desired-weight"
                                        name="desired_weight"
                                        placeholder="87.5"
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        defaultValue={profileData?.desired_weight || ''}
                                        onInvalid={(e) =>
                                            e.currentTarget.setCustomValidity("El peso deseado debe ser mayor a 0.")
                                        }
                                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-12 flex justify-end">
                            <Button disabled={loading} type="submit" variant={'violetPrimary'} className="w-full font-semibold">
                                {loading ? <SpinIcon /> : 'Guardar cambios'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>
        </Tabs>
    )
}