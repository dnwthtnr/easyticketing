import { fail, redirect } from '@sveltejs/kit'


import { generateUserSession, getUserSession, getSessionedUser } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


/** @type {import('./$types').PageServerLoad} */
export async function load({cookies, parent}){
    //check for existent user cookie
    var userSession = cookies.get(SessionCookieKey)
    if (userSession == null){
        console.log('User does not have existent session cookie. Redirecting to: "/auth/login"')
        redirect(300, '/auth/login')
        return
    }

    console.log('session cookie thing', userSession, cookies.getAll())

    try {
        var user = JSON.parse( userSession)
    } catch(error) {
        console.log('User does not have valid session cookie. Redirecting to: "/auth/login"')
        redirect(300, '/auth/login')
    }

    console.log('client side session user id ' + userSession +user.sessionId)
    
    var sessionedUser = await getSessionedUser(user.sessionId)

    console.log(sessionedUser)

    const sessionUserString = JSON.stringify(sessionedUser)
     
    return {
        user: sessionUserString
    }
}