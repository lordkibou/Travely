import { RegisterFormData,SignInFormData } from "./types/mainTypes";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/*
 * formData:{email:string, password:string, confirmPassword:string, firstName:string, lastName:string}->
 *
 * register() ----> POST --> api/users/register 
 *
 * -> Throws Error
 */
export const register = async (formData:RegisterFormData) => { 

        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            credentials:"include",//Cookie
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            const {message}:{message:string} = await response.json()
            throw new Error(message)
        }

}
export const signIn = async (formData: SignInFormData) => { 
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials:"include",//Cookie
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    if (!response.ok) {
        const {message}:{message:string} = await response.json()
        throw new Error(message)
    }
}

export const validateToken = async () => { 
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: 'GET',
        credentials:"include",//Cookie
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error("Token invalid")
    }

    return response.json()
}

export const signOut = async () => { 
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials:"include",//Cookie
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error("Error during Sign Out")
    }
}

export const addMyHotel = async (formData: FormData) => { 
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials:"include",//Cookie
        body: formData
    })
    if (!response.ok) {
        const {message}:{message:string} = await response.json()
        throw new Error(message)
    }
    return response.json()
}