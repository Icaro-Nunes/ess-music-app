import bcrypt = require('bcrypt');

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export function comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
}