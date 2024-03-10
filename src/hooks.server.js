import { SessionCookieKey } from '$lib/constants'
import { redirect } from '@sveltejs/kit';
import { getSessionedUser } from '$lib/server/database/user_actions';

export async function handle({event, resolve}){
    const sessionCookie = event.cookies.get(SessionCookieKey);

    event.locals.user = null // set null in case of failed session validations
    

    // #region Validate User Session

    if (sessionCookie == null || typeof sessionCookie == 'undefined'){
        const nonProtectedRoutes = ["/", "/auth/login"]
        const targetUrl = event.url.pathname
        console.log('Destination url', targetUrl)

        if (nonProtectedRoutes.indexOf(targetUrl) < -1){
            throw redirect(302, "/auth/login")
        }
    }
    
    try{
        var sessionCookieObject = await JSON.parse(sessionCookie)
    } catch(error) {
        console.error("Error parsing session cookie redirecting")
        throw redirect(302, "/auth/login")
    }

    try {
        var sessionedUser = await getSessionedUser(sessionCookieObject.sessionId)
    } catch(error) {
        console.error("Error querying user from session id. redirecting")
        throw redirect(302, "/auth/login")
    }
    if (sessionedUser == Error()){
        console.error("Error parsing session cookie redirecting. Error:", String(sessionedUser.message))
        throw redirect(302, "/auth/login")
    }
    // #endregion

    
    event.locals.user = sessionedUser


    const response = await resolve(event)
    return response
}