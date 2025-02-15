import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const protectedRoutes = ['/home', '/recipes', '/users', '/profile'];
    const publicRoutes = ['/login'];
    const devRoutes = ['/dbtest']   // add routes here that we can test for convenience; 
                                    // when in production, this should be empty

    const authenticated = event.cookies.get('authenticated')
    const path = event.url.pathname

    if (devRoutes.includes(path)) {
        // do nothing (for now)
    }  else if (authenticated) {
        if (!protectedRoutes.includes(path)) {
            throw redirect(303, '/home');
        }
    } else {
        if (!publicRoutes.includes(path)) {
            throw redirect(303, '/login');
        }
    }

    return resolve(event);
};  