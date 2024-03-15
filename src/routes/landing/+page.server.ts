import { fail, redirect } from '@sveltejs/kit'


import { generateUserSession, getUserSession, getSessionedUser } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


/** @type {import('./$types').PageServerLoad} */
export async function load({locals}){
     
    return {
        user: locals.user
    }
}