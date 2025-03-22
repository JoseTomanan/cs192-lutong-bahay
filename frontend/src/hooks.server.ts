import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const unregisteredRoutes = ['/login', '/register']
    const userRoutes = ['/home', '/recipes', '/users', '/profile', '/login', '/submit_recipe'];
    const adminRoutes = userRoutes.concat(['/admin'])
    
    const authenticated = event.cookies.get('authenticated')
    const admin = event.cookies.get('admin')
    const path = event.url.pathname

    console.log(admin, authenticated)

    if (admin && authenticated) {
        if (!adminRoutes.includes(path)) {
            throw redirect(303, '/admin')
        }
    }

    else if (admin && !authenticated) {
        throw redirect(303, '/login')
    } 

    else if (!admin && authenticated) {
        if (!userRoutes.includes(path)) {
            throw redirect(303, '/home')
        }
    }

    else {
        if (!unregisteredRoutes.includes(path)) {
            throw redirect(303, '/login'); 
        } 
    } 

    return resolve(event);
};