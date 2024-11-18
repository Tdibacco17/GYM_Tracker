'use server'

import pool from "@/lib/db";
import { ApiDataResponseInterface, ApiResponseInterface, ExcerciseData, NewExerciseData } from "@/types/ActionsTypes";
import { NextAuthToken } from "@/types/SessionTypes";
import { getSessionToken } from "@/utils/getSessionToken";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function addExerciseToRoutine(exerciseData: NewExerciseData): Promise<ApiResponseInterface> {
    try {
        // Middleware
        const session: NextAuthToken | null = await getSessionToken();
        if (!session) { return { message: `No existe una sesión.`, status: 404 }; }

        const { routineId, name, repetitions, weight } = exerciseData;

        const verifyRoutineQuery = `
            SELECT id FROM routines WHERE id = $1 AND user_id = $2
        `;
        const verifyRoutineResult = await pool.query(verifyRoutineQuery, [routineId, session.id]);

        if (verifyRoutineResult.rowCount === 0) {
            return { message: "Rutina no encontrada o no pertenece al usuario.", status: 404 };
        }

        const insertExerciseQuery = `
            INSERT INTO exercises (id, name, repetitions, weight, routine_id)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const exerciseId = uuidv4();
        const insertExerciseResult = await pool.query(insertExerciseQuery, [
            exerciseId,
            name,
            repetitions,
            weight,
            routineId,
        ]);

        if (insertExerciseResult.rowCount === 0) {
            return { message: "No se pudo agregar el ejercicio a la rutina.", status: 500 };
        }

        revalidatePath(`/dashboard/routines/${routineId}`);
        return { message: "Ejercicio agregado a la rutina con éxito.", status: 200 };
    } catch (error) {
        console.error("Error al agregar ejercicio:", error);
        return { message: `Ocurrió un error inesperado.`, status: 500 };
    }
}

export async function getExercisesByRoutine(routineId: string): Promise<ApiDataResponseInterface> {
    try {
        // Middleware: Validar sesión
        const session: NextAuthToken | null = await getSessionToken();
        if (!session) {
            return { message: `No existe una sesión.`, status: 404, data: null };
        }

        const verifyRoutineQuery = `
            SELECT id FROM routines
            WHERE id = $1 AND user_id = $2
        `;
        const verifyRoutineResult = await pool.query(verifyRoutineQuery, [routineId, session.id]);

        if (verifyRoutineResult.rowCount === 0) {
            return { message: "Rutina no encontrada o no pertenece al usuario.", status: 404, data: null };
        }

        const getExercisesQuery = `
            SELECT id, name, repetitions, weight
            FROM exercises
            WHERE routine_id = $1
            ORDER BY name ASC
        `;
        const exercisesResult = await pool.query(getExercisesQuery, [routineId]);

        if (exercisesResult.rowCount === 0) {
            return { message: 'No se encontraron ejercicios para esta rutina.', status: 400, data: null };
        }

        const exercises: ExcerciseData[] = exercisesResult.rows;

        return { message: 'Ejercicios obtenidos con éxito.', status: 200, data: exercises };
    } catch (error) {
        console.error("Error al obtener ejercicios:", error);
        return { message: `Ocurrió un error inesperado.`, status: 500, data: null };
    }
}

export async function deleteExercise(exerciseId: string, routineId: string): Promise<ApiResponseInterface> {
    try {
        // Middleware
        const session: NextAuthToken | null = await getSessionToken();
        if (!session) { return { message: `No existe una sesión.`, status: 404 }; }

        const verifyQuery = `
        SELECT e.id
        FROM exercises e
        INNER JOIN routines r ON e.routine_id = r.id
        WHERE e.id = $1 AND r.user_id = $2
        `;
        const verifyResult = await pool.query(verifyQuery, [exerciseId, session.id]);

        if (verifyResult.rowCount === 0) {
            return { status: 403, message: "No tienes permiso para eliminar este ejercicio." };
        }

        const deleteQuery = `
        DELETE FROM exercises WHERE id = $1
        `;
        const result = await pool.query(deleteQuery, [exerciseId]);

        if (result.rowCount === 0) {
            return { status: 404, message: "Ejercicio no encontrado o ya eliminado." };
        }

        revalidatePath(`/dashboard/routines/${routineId}`);
        return { status: 200, message: "Ejercicio eliminado correctamente." };
    } catch (error) {
        console.error("Error eliminando ejercicio:", error);
        return { status: 500, message: "Error interno del servidor." };
    }
}