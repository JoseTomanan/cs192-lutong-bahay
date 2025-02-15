import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const protectedRoutes = ['/dashboard', '/search', '/dbtest'];
    const publicRoutes = ['/login'];
    
    if (protectedRoutes.includes(event.url.pathname)) {
        const authenticated = event.cookies.get('authenticated');
        if (!authenticated) {
            throw redirect(303, '/login');
        }
    }

    if (publicRoutes.includes(event.url.pathname)) {
        const authenticated = event.cookies.get('authenticated');
        if (authenticated) {
            throw redirect(303, '/dashboard');
        }
    }

    return resolve(event);
}; 