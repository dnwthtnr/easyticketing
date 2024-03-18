import { fail, redirect } from '@sveltejs/kit'


import { RegisterUser, loginUser } from '$lib/server/database/user_actions.js'
import { SessionCookieKey } from '$lib/constants.js'
import { goto } from '$app/navigation'
import { type Record } from '@prisma/client/runtime/library'


export const actions =  {
    
    default: async({request, cookies}) => {



        const formData = await request.formData()

        console.log('formdata', formData.get("EmailInput"), formData.get("PasswordInput"))

        const email = String(formData.get("EmailInput"))
        const password = String(formData.get("PasswordInput"))
        const username = String(formData.get("UserName"))

        const passwordConfirmed = password == String(formData.get("ConfirmPassword"))
        if (passwordConfirmed == false){
            errorResponse.message.error = true
            return fail(400, "Retyped password does not match original.") 
        }


        try{
            var registrationResult = await RegisterUser(email, password, username, 0)
        } catch(error) {
            return fail(500)
        }
        if (typeof registrationResult == typeof Error()){
            var errorResponse = JSON.parse(registrationResult.message)
            console.log('eRRRR', registrationResult.message)

            errorResponse.message.error = true

            return fail(errorResponse.code, errorResponse.message)
            // display error to signify incorrect email or password
        }


        goto('../login')

        return {
            success: true
        }


    }
}
