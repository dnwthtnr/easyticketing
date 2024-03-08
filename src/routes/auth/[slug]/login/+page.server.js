import { fail } from '@sveltejs/kit'


import { GetUserFromCredential } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'


export async function load({cookies}){
    //check for existent user cookie
}


export const actions =  {
    
    login: async({request, cookies}) => {
        const formData = await request.formData()

        const email = String(formData.get("email"))
        const password = String(formData.get("password"))


        try {
            // check user validity
            const isValidCredential = await GetUserFromCredential(email, password)

            cookies.set(SessionCookieKey, )


        } catch(error) {
            console.error(error)
            return fail(500)
        }

    }
}
