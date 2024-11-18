export default function parseWeight(weight: string | number): string {
    // Convertir a número si es string
    const numericWeight = typeof weight === 'string' ? parseFloat(weight) : weight;

    // Validar si es un número válido
    if (isNaN(numericWeight)) {
        console.log("El valor proporcionado no es un número válido.");
        return '0'
    }

    // Redondear a 1 decimal máximo y convertir a string para el resultado final
    return numericWeight.toFixed(1).replace(/\.0$/, '');
}