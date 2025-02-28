import bcrypt from 'bcrypt'

export const hash = async (password : string) : Promise<string> => {
    const salt = 10
    return await bcrypt.hash(password,salt)
}
export const compare = async (data : string, encrypted : string) => {
    return await bcrypt.compare(data, encrypted)
}