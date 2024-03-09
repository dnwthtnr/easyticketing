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
    
    default: async({request, cookies}) => {

        console.log('default action')


        const formData = await request.formData()

        console.log('formdata', formData.get("EmailInput"), formData.get("PasswordInput"))

        const email = String(formData.get("EmailInput"))
        const password = String(formData.get("PasswordInput"))


        try{
            var userSession = await generateUserSession(email, password)
        } catch(error) {
            return fail(500)
        }
        if (userSession == Error()){
            console.error(userSession.message)
            return redirect(300, '/auth/login')
            // display error to signify incorrect email or password
        }

        
        const storableUserSession = JSON.stringify(userSession)
        console.log(userSession, 'usersession', storableUserSession)

        cookies.set(
            SessionCookieKey, 
            storableUserSession,
            {
                path: '/',
                sameSite: 'lax'
            }
            )


    }
}
