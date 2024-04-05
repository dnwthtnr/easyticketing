import { fail, redirect } from '@sveltejs/kit'


import { loginUser } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


export const actions =  {
    
    default: async({request, cookies}) => {



        const formData = await request.formData()

        console.log('formdata', formData.get("EmailInput"), formData.get("PasswordInput"))

        const email = String(formData.get("EmailInput"))
        const password = String(formData.get("PasswordInput"))
        const storeSession = Boolean(formData.get("StoreSession"))


        try{
            console.log('Attempting user login.')
            var userSession = await loginUser(email, password)
            console.log("User login cookie result:", userSession)
        } catch(error) {
            return fail(500)
        }
        if ( userSession ==  Error()){
            console.log('eRRRR',userSession.message)
            var errorResponse = JSON.parse(userSession.message)

            errorResponse.message.error = true

            return fail(errorResponse.code, errorResponse.message)
            // display error to signify incorrect email or password
        }


        var cookieOptions = {
            path: '/',
            sameSite: 'lax'
        }
        if (storeSession == true){
            var cookieOptions = {
                path: '/',
                sameSite: 'lax',
                maxAge: 31536000
            }
        }

        
        const storableUserSession = JSON.stringify(userSession)
        console.log(userSession, 'usersession', storableUserSession)

        cookies.set(
            SessionCookieKey, 
            storableUserSession,
            cookieOptions
            )

        return {
            success: true
        }


    }
}
