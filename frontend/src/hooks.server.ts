import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const unregisteredRoutes = ['/login', '/register']
    const userRoutes = ['/recipes', '/saved', '/login', '/submit_recipe'];
    const adminRoutes = userRoutes.concat(['/admin'])
    
    const authenticated = event.cookies.get('authenticated')
    const admin = event.cookies.get('admin')
    const path = event.url.pathname

    const isUserRoute = userRoutes.some(route => path.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => path.startsWith(route));

    console.log(admin, authenticated)

    if (admin && authenticated) {
        // if (!adminRoutes.includes(path)) {
        if (!isAdminRoute) {
            throw redirect(303, '/admin')
        }
    }

    else if (admin && !authenticated) {
        throw redirect(303, '/login')
    } 

    else if (!admin && authenticated) {
        // if (!userRoutes.includes(path)) {
        if (!isUserRoute) {
            throw redirect(303, '/recipes')
        }
    }

    else {
        if (!unregisteredRoutes.includes(path)) {
            throw redirect(303, '/login'); 
        } 
    } 

    return resolve(event);
};
