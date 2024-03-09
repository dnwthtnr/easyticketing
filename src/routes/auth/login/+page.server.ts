import { fail, redirect } from '@sveltejs/kit'


import { GetUserFromCredential, generateUserSession, getUserSession } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


export async function load({cookies}){
    //check for existent user cookie
    var userSession = cookies.get(SessionCookieKey)
    if (userSession != null){
        console.log('User already has existent session cookie. Redirecting to: "home"')
        redirect(300, '/landing')
    }
     
    const data = {
        SessionCookieKey: userSession
    }

    return data
}


export const actions =  {
    
    login: async({request, cookies}) => {
        const formData = await request.formData()

        const email = String(formData.get("email"))
        const password = String(formData.get("password"))

            // check user validity

        try{
            var userSession = await generateUserSession(email, password)
        } catch(error) {
            return fail(500)
        }
        if (userSession == Error()){
            console.error(userSession.message)
            // display error to signify incorrect email or password
        }

        await cookies.set(
            SessionCookieKey, 
            JSON.stringify(userSession),
            {
                path: '/',
                sameSite: 'lax'
            }
            )


    }
}
