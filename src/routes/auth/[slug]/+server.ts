import {json, error} from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import {prisma} from "$lib/server/database/prisma"

import {ValidateUserLogin} from "$lib/server/database/user_actions"



export const POST: RequestHandler = async event => {
    const {cookies} = event
    const {slug} = event.params

    const requestData = await event.request.json()


    let returnMessage = {
        login_status: false,
        login_message: '',
        user: {}
    }
    
    
    let operationResult;
    let sql;


    switch(slug){
        case 'login':
            operationResult = await ValidateUserLogin(requestData.UserEmail, requestData.UserPassword)
            break
        default:
            error(404, 'Endpoint /auth/${slug} is invalid.')
    }


    if (operationResult == null){
        returnMessage.login_status = false;
        returnMessage.login_message = "User Email and/or Password are invalid."
        return json(returnMessage)
    }

    returnMessage.login_status = true;
    returnMessage.login_message = "Login Successful";
    returnMessage.user = operationResult

    return json(returnMessage)
}