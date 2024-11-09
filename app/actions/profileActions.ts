'use server'

import pool from "@/lib/db";
import { ApiResponseInterface } from "@/types/ApiTypes";
import { NextAuthToken } from "@/types/ModelsTypes";
import { getSessionToken } from "@/utils/getSessionToken";

export async function updateProfileData(
    name: string | null,
    weight: number | null,
    height: number | null
): Promise<ApiResponseInterface> {
    try {
        //middleware
        const session: NextAuthToken | null = await getSessionToken()
        if (!session) throw new Error("No session found");

        const query = `
        UPDATE users 
        SET name = $1, weight = $2, height = $3
        WHERE id = $4
        `;

        await pool.query(query, [name, weight, height]);

        return { message: 'string', status: 200, }
    } catch (error) {
        console.error(error); // line fix build
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}