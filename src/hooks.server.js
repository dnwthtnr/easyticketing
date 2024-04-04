import { SessionCookieKey } from '$lib/constants'
import { redirect } from '@sveltejs/kit';
import { getSessionedUser } from '$lib/server/database/user_actions';

export async function handle({event, resolve}){
    const sessionCookie = event.cookies.get(SessionCookieKey);


    console.log("Session Cookie", sessionCookie)

    event.locals.user = {} // set null in case of failed session validations
    const loginPath = '/auth/login'
    const nonProtectedRoutes = ["/", loginPath, "/auth/register"]

    console.log('Sesssion cookie:', sessionCookie)


// #region Validate User Session


    // Check if no cookie present and redirect if needed
    if (sessionCookie == null){
        console.log("No cookie present...Path:", event.url.pathname)

        if (nonProtectedRoutes.indexOf(event.url.pathname) <= -1){
            throw redirect(302, loginPath)
        }

        const response = await resolve(event)
        return response
    }
    

    // Get object from json format string
    try{
        var sessionCookieObject = await JSON.parse(sessionCookie)
<<<<<<< HEAD
        console.log("Session Cookie Object:", sessionCookieObject)
=======
        console.log("Parsed session cookie. Result:", sessionCookieObject)
>>>>>>> 470890bd2c13d62e40c3ae579bdb839939dbc6e2
    } catch(error) {
        console.error("Error parsing session cookie redirecting")
        throw redirect(302, "/auth/login")
    }
    if (Object.keys(sessionCookieObject).length == 0){
        console.error("Present session cookie has a size of 0. Deleting present cookie")
        event.cookies.delete(SessionCookieKey, {path: '/'})

        throw redirect(302, "/auth/login")
    }

    // get user from session cookie
    try {
        console.log("Looking for existing session cookie")
        var sessionedUser = await getSessionedUser(sessionCookieObject.sessionId)
<<<<<<< HEAD
        console.log("Existing session cookie found... Readout:", sessionedUser)
=======
        console.log("Getting user from session:", sessionedUser)
>>>>>>> 470890bd2c13d62e40c3ae579bdb839939dbc6e2
    } catch(error) {
        console.error("Error querying user from session id. redirecting")
        throw redirect(302, "/auth/login")
    }
    if (sessionedUser == Error()){
        console.error("Error parsing session cookie redirecting. Error:", sessionedUser.message)
        throw redirect(302, "/auth/login")
    }
// #endregion


    // redirect if user is trying to log in or go to non-member home page
    if (nonProtectedRoutes.indexOf(event.url.pathname) > -1){
<<<<<<< HEAD
        console.log("Redirecting to landing page")
=======
>>>>>>> 470890bd2c13d62e40c3ae579bdb839939dbc6e2
        throw redirect(302, "/landing")
    }

    
    event.locals.user = sessionedUser


    const response = await resolve(event)
    return response
}