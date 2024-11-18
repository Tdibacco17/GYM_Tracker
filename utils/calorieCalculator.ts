import { UserProfileData } from "@/types/ActionsTypes";

export const calculateBenedictCalories = (profileData: UserProfileData | null): string | null => {
    if (!profileData) return null;

    const { current_weight, height, age, gender, daily_activity, weight_goal, weight_change_goal } = profileData;

    // Verificar si todos los datos clave existen
    if (!current_weight || !height || !age || !gender || !daily_activity) {
        return null;
    }

    // Calcular Tasa Metabólica Basal (TMB) en función del género
    let tmb: number;
    if (gender === 'male') {
        tmb = 88.362 + (13.397 * current_weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        tmb = 447.593 + (9.247 * current_weight) + (3.098 * height) - (4.330 * age);
    } else {
        return null;
    }

    // Definir el factor de actividad
    let factorActividad: number;
    switch (daily_activity) {
        case 'sedentary':
            factorActividad = 1.2;
            break;
        case 'lightly_active':
            factorActividad = 1.375;
            break;
        case 'moderately_active':
            factorActividad = 1.55;
            break;
        case 'very_active':
            factorActividad = 1.725;
            break;
        default:
            return null;
    }

    // Calorías diarias para mantenimiento
    const caloriasMantenimiento = tmb * factorActividad;

    // Ajuste de calorías según el objetivo de peso
    let ajusteCalorico = 0;
    if (weight_goal === 'lose' && weight_change_goal) {
        ajusteCalorico = -(weight_change_goal * 7700) / 7; // Déficit calórico diario
    } else if (weight_goal === 'gain' && weight_change_goal) {
        ajusteCalorico = (weight_change_goal * 7700) / 7; // Superávit calórico diario
    }

    const caloriasFinales = caloriasMantenimiento + ajusteCalorico;

    // Retornar el valor formateado con 2 decimales como string
    return caloriasFinales.toFixed(2);
};
