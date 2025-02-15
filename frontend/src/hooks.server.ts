import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const protectedRoutes = ['/home', '/recipes', '/users', '/profile'];
    const publicRoutes = ['/login'];
    const authenticated = event.cookies.get('authenticated')
    
    console.log(`authenticated: ${authenticated}`)

    if (authenticated) {
        if (!protectedRoutes.includes(event.url.pathname)) {
            throw redirect(303, '/home');
        }
    } else {
        if (!publicRoutes.includes(event.url.pathname)) {
            throw redirect(303, '/login');
        }
    }



    return resolve(event);
};  