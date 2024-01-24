import { RegisterFormData } from "./pages/Register";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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