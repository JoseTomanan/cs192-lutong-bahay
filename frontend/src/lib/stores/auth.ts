import { goto } from '$app/navigation'
import { writable } from 'svelte/store'

export const isAuthenticated = writable(false)

export const setAuth = (value: boolean) => {
    isAuthenticated.set(value)
    if (value) {
        document.cookie = "authenticated=true; path=/; max-age=86400" // 24 hours
    } else {
        document.cookie = "authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

export const logout = () => {
    setAuth(false) 
    goto('/login')
}

export const initAuth = () => {
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('authenticated='))
    isAuthenticated.set(!!authCookie)
}