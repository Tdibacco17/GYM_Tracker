'use server'

import pool from "@/lib/db";
import { UserRoutinesData } from "@/types/ApiProfile";
import { ApiDataResponseInterface, ApiResponseInterface } from "@/types/ApiTypes";
import { NextAuthToken } from "@/types/ModelsTypes";
import { getSessionToken } from "@/utils/getSessionToken";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function createRoutine(routineName: string): Promise<ApiResponseInterface> {
    try {
        //middleware
        const session: NextAuthToken | null = await getSessionToken()
        if (!session) return { message: `No existe una sesión.`, status: 404 };

        const routineId = uuidv4();

        const createRoutineQuery = `
        INSERT INTO routines (id, name, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;

        const result = await pool.query(createRoutineQuery, [
            routineId,
            routineName,
            session.id,
        ]);

        if (result.rows.length === 0) {
            return { message: "No se pudo crear la rutina.", status: 500 };
        }

        revalidatePath('/dashboard')
        return { message: "Rutina creada con éxito!", status: 200 };
    } catch (error) {
        console.error(error); // line fix build
        return { message: `Ocurrio un error inesperado.`, status: 500 };
    }
}

export async function getRoutines(): Promise<ApiDataResponseInterface> {
    try {
        // Middleware
        const session: NextAuthToken | null = await getSessionToken();
        if (!session) return { message: `No existe una sesión.`, status: 404, data: null };

        const query = `
        SELECT id, name, created_at
        FROM routines
        WHERE user_id = $1
        ORDER BY created_at ASC
        `;

        const result = await pool.query(query, [session.id]);

        if (result.rowCount === 0) {
            return { message: 'No se encontraron rutinas para este usuario.', status: 404, data: null };
        }

        const routines: UserRoutinesData[] = result.rows;

        return { message: 'Rutinas obtenidas con éxito.', status: 200, data: routines };
    } catch (error) {
        console.error(error);
        return { message: `Ocurrió un error inesperado.`, status: 500, data: null };
    }
}

export async function getFirstRoutine(): Promise<ApiDataResponseInterface> {
    try {
        // Middleware: Verifica la sesión del usuario
        const session = await getSessionToken();
        if (!session) { return { message: `No existe una sesión.`, status: 404, data: null }; }

        // Consulta SQL para obtener la primera rutina
        const query = `
            SELECT id, name, created_at
            FROM routines
            WHERE user_id = $1
            ORDER BY created_at ASC
            LIMIT 1
        `;

        const result = await pool.query(query, [session.id]);

        if (result.rowCount === 0) {
            return { message: 'No se encontraron rutinas para este usuario.', status: 404, data: null };
        }
        const firstRoutine: UserRoutinesData = result.rows[0];

        return { message: 'Primera rutina obtenida con éxito.', status: 200, data: firstRoutine };
    } catch (error) {
        console.error('Error al obtener la primera rutina:', error);
        return { message: `Ocurrió un error inesperado.`, status: 500, data: null };
    }
}

export async function deleteRoutine(routineId: string): Promise<ApiResponseInterface> {
    try {
        // Middleware
        const session: NextAuthToken | null = await getSessionToken();
        if (!session) { return { message: `No existe una sesión.`, status: 404 }; }

        const verifyQuery = `
            SELECT id FROM routines WHERE id = $1 AND user_id = $2
        `;
        const verifyResult = await pool.query(verifyQuery, [routineId, session.id]);

        if (verifyResult.rowCount === 0) { return { message: "Rutina no encontrada o no pertenece al usuario.", status: 404 }; }

        const deleteQuery = `
            DELETE FROM routines WHERE id = $1
        `;

        const deleteResult = await pool.query(deleteQuery, [routineId]);

        if (deleteResult.rowCount === 0) { return { message: "No se pudo eliminar la rutina.", status: 500 }; }
        revalidatePath('/dashboard')
        return { message: "Rutina eliminada con éxito.", status: 200 };
    } catch (error) {
        console.error("Error al eliminar rutina:", error);
        return { message: `Ocurrió un error inesperado.`, status: 500 };
    }
}