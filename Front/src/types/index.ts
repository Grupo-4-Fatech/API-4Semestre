export interface User{
    email: string,
    gender: string,
    id: number,
    name: string,
    password: string,
    role: number
}

export interface UserContext{
    usuario : User
    setUsuario: Function

}