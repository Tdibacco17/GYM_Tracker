import bcrypt from "bcryptjs"

export const encrypt = async (textPlain: string) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

export const compare = async (passwordPlain?: string, hashPassword?: string) => {
    if (!passwordPlain || !hashPassword) return false;
    return await bcrypt.compare(passwordPlain, hashPassword);
};