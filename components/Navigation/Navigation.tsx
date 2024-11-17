import { ApiDataResponseInterface } from "@/types/ApiTypes";
import { getFirstRoutine } from "@/app/actions/routineActions";
import { getServerSession } from "next-auth";
import { UserRoutinesData } from "@/types/ActionsTypes";
import { NavigationClient } from "./Navigation.client";

export default async function Navigation() {
    const session = await getServerSession();
    if (!session) return null

    const response: ApiDataResponseInterface = await getFirstRoutine()
    const data: UserRoutinesData | null = response.data;

    const linkText = (response.status === 200 && data)
        ? `/dashboard/routines/${data.id}` : `/dashboard/routines`

    return <NavigationClient linkText={linkText} />
}