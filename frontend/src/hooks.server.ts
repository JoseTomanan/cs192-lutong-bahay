import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const protectedRoutes = ['/home', '/recipes', '/users', 'profile'];
    const publicRoutes = ['/login'];
    
    if (protectedRoutes.includes(event.url.pathname)) {
        const authenticated = event.cookies.get('authenticated');
        if (!authenticated) {
           
        }
    }

    if (publicRoutes.includes(event.url.pathname)) {
        const authenticated = event.cookies.get('authenticated');
        if (authenticated) {
           
        }
    }

    return resolve(event);
}; 