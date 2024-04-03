// import {json, error} from '@sveltejs/kit'
// import type { RequestHandler } from '@sveltejs/kit'
// import {prisma} from "$lib/server/database/prisma"

// import {GetUserFromCredential} from "$lib/server/database/user_actions"



// export const POST: RequestHandler = async event => {
//     const {cookies} = event
//     const {slug} = event.params

//     const requestData = await event.request.json()


//     let returnMessage = {
//         login_status: false,
//         login_message: '',
//         user: {}
//     }
    
    
//     let operationResult;


//     switch(slug){
//         case 'login':
//             operationResult = await GetUserFromCredential(requestData.UserEmail, requestData.UserPassword)
//             break
//         default:
//             error(404, 'Endpoint /auth/${slug} is invalid.')
//     }


//     if (operationResult == null){
//         returnMessage.login_status = false;
//         returnMessage.login_message = "User Email and/or Password are invalid."
//         return json(returnMessage)
//     }

//     returnMessage.login_status = true;
//     returnMessage.login_message = "Login Successful";
//     returnMessage.user = operationResult

//     // if (requestData.StoreSession == true){
//     //     console.log("Saving user session to cookie")
//     //     cookies.set(
//     //         "session", 
//     //         JSON.stringify(operationResult),
//     //         {
//     //             path: "/",
//     //             httpOnly: true,
//     //             sameSite: true
//     //         }
//     //         )            
//     // }

//     return json(returnMessage)
// }