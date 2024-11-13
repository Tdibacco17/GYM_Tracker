'use server'

import pool from "@/lib/db";
import { AccountData, UserProfileData } from "@/types/ApiProfile";
import { ApiDataResponseInterface, ApiResponseInterface } from "@/types/ApiTypes";
import { NextAuthToken } from "@/types/ModelsTypes";
import { getSessionToken } from "@/utils/getSessionToken";
import { revalidatePath } from "next/cache";

export async function updateProfileData(
    accountData: AccountData
): Promise<ApiResponseInterface> {
    try {
        //middleware
        const session: NextAuthToken | null = await getSessionToken()
        if (!session) return { message: `No existe una sesión.`, status: 404 };

        const { currentWeight, desiredWeight, height, age, gender, dailyActivity, weightGoal, weightChangeGoal } = accountData;

        const query = `
        UPDATE user_profiles 
        SET current_weight = $1, desired_weight = $2, height = $3, age = $4, gender = $5, daily_activity = $6, weight_goal = $7, weight_change_goal = $8
        WHERE user_id = $9
        `;

        const result = await pool.query(query, [
            currentWeight,
            desiredWeight,
            height,
            age,
            gender,
            dailyActivity,
            weightGoal,
            weightChangeGoal,
            session.id
        ]);

        if (result.rowCount === 0) return { message: 'Usuario no encontrado o no se realizó ninguna actualización. ', status: 404, }

        revalidatePath('/dashboard')
        return { message: 'Datos actualizados con exito!', status: 200, }encontrado o no se realizó ninguna actualiza
    } catch (error) {
        console.error(error); // line fix build
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}

export async function getProfileData(): Promise<ApiDataResponseInterface> {
    try {
        //middleware
        const session: NextAuthToken | null = await getSessionToken()
        if (!session) return { message: `No existe una sesión.`, status: 404, data: null };

        const query = `
            SELECT height, desired_weight, current_weight, age, gender, 
                   daily_activity, weight_goal, weight_change_goal
            FROM user_profiles
            WHERE user_id = $1
        `;

        const result = await pool.query(query, [session.id]);

        if (result.rowCount === 0) return { message: 'Usuario no encontrado.', status: 404, }

        const userData: UserProfileData = result.rows[0];

        return { message: 'Datos actualizados con exito!', status: 200, data: userData }
    } catch (error) {
        console.error(error); // line fix build
        return { message: `Ocurrio un error inesperado.`, status: 500, data: null };
    }
}