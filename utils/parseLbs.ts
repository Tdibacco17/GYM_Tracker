// Convierte un valor en kilogramos a libras y redondea hacia arriba al entero más cercano
export function parseLbs(kg: number): number {
    const lbs = kg * 2.20462; // Conversión exacta
    return Math.ceil(lbs); // Redondeo hacia arriba al entero más cercano
}