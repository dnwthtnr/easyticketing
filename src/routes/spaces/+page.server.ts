import { getSpaces } from '$lib/server/database/spaces.js'
import { fail, redirect } from '@sveltejs/kit'

export async function load({ locals }){

    if (Object.keys(locals.user).length == 0){
        return {}
    }

    const permission_level = locals.user.PermissionLevel || 0;

    try {
        
        var spaces = await getSpaces(permission_level)


    } catch (error) {
        console.log(error)
        throw fail(500, "Error encountered when getting space list")
    }

    if (spaces == Error()){
        var errorResponse = JSON.parse(spaces.message)
        console.log(spaces.message)

        errorResponse.message.error = true

        throw fail(errorResponse.code, errorResponse.message)
    }

    console.log("sapces", spaces)

    return {
        success: true,
        spaces: spaces
    }
}