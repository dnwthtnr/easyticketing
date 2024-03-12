import { fail, redirect } from '@sveltejs/kit'


import { loginUser } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


export const actions =  {
    
    default: async({request, cookies}) => {

        const response = {
            success: false,
            message: ""
        }


        const formData = await request.formData()

        console.log('formdata', formData.get("EmailInput"), formData.get("PasswordInput"))

        const email = String(formData.get("EmailInput"))
        const password = String(formData.get("PasswordInput"))


        try{
            var userSession = await loginUser(email, password)
        } catch(error) {
            return fail(500)
        }
        if (userSession == Error()){
            var errorResponse = JSON.parse(userSession.message)
            console.log(userSession.message)
            return fail(errorResponse.code, errorResponse.message.body)
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

        return {
            success: true
        }


    }
}
