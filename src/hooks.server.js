import { SessionCookieKey } from '$lib/constants'
import { redirect } from '@sveltejs/kit';
import { getSessionedUser } from '$lib/server/database/user_actions';

let dev = true
const root = "/easyticketing"


export async function handle({event, resolve}){

    if(dev == true){
        const response = resolve(event)
        return response
    }

    const sessionCookie = event.cookies.get(SessionCookieKey);


    console.log("Session Cookie", sessionCookie)

    event.locals.user = {} // set null in case of failed session validations
    const loginPath = root + '/auth/login'
    const nonProtectedRoutes = [root, loginPath, root+"/auth/register"]

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
        console.log("Session Cookie Object:", sessionCookieObject)
    } catch(error) {
        console.error("Error parsing session cookie redirecting")
        throw redirect(302, loginPath)
    }
    if (Object.keys(sessionCookieObject).length == 0){
        console.error("Present session cookie has a size of 0. Deleting present cookie")
        event.cookies.delete(SessionCookieKey, {path: root})

        throw redirect(302, loginPath)
    }

    // get user from session cookie
    try {
        console.log("Looking for existing session cookie")
        var sessionedUser = await getSessionedUser(sessionCookieObject.sessionId)
        console.log("Existing session cookie found... Readout:", sessionedUser)
    } catch(error) {
        console.error("Error querying user from session id. redirecting")
        throw redirect(302, loginPath)
    }
    if (sessionedUser == Error()){
        console.error("Error parsing session cookie redirecting. Error:", sessionedUser.message)
        throw redirect(302, loginPath)
    }
// #endregion


    // redirect if user is trying to log in or go to non-member home page
    if (nonProtectedRoutes.indexOf(event.url.pathname) > -1){
        console.log("Redirecting to landing page")
        throw redirect(302, root+"/landing")
    }

    
    event.locals.user = sessionedUser


    const response = await resolve(event)
    return response
}