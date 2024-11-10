'use server'

import pool from "@/lib/db";
import { ApiDataResponseInterface, ApiResponseInterface } from "@/types/ApiTypes";
import { NextAuthToken } from "@/types/ModelsTypes";
import { getSessionToken } from "@/utils/getSessionToken";
import { revalidatePath } from "next/cache";

export async function updateProfileData(
    name: string | null,
    weight: string | null,
    height: string | null
): Promise<ApiResponseInterface> {
    try {
        //middleware
        const session: NextAuthToken | null = await getSessionToken()
        if (!session) return { message: `No existe una sesión.`, status: 404 };

        const query = `
        UPDATE users 
        SET name = $1, weight = $2, height = $3
        WHERE id = $4
        `;

        const result = await pool.query(query, [name, weight, height, session.id]);

        if (result.rowCount === 0) return { message: 'Usuario no encontrado o no se realizó ninguna actualización. ', status: 404, }

        revalidatePath('/dashboard')
        return { message: 'Datos actualizados con exito!', status: 200, }
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
        SELECT email, name, weight, height
        FROM users
        WHERE id = $1
        `;
        const result = await pool.query(query, [session.id]);

        if (result.rowCount === 0) return { message: 'Usuario no encontrado o no se realizó ninguna actualización.', status: 404, }

        const userData = result.rows[0];

        return { message: 'Datos actualizados con exito!', status: 200, data: userData }
    } catch (error) {
        console.error(error); // line fix build
        return { message: `Ocurrio un error inesperado.`, status: 500, data: null };
    }
}