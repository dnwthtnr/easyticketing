// import type { Actions, PageServerLoad } from "./$types";
// import {prisma} from "$lib/server/database/prisma.js"

// import { json } from "stream/consumers";

// import loginStatus from "../loginStore";

// import {setPersistentCookie, getPersistentCookie} from "./cookie.js"


// export async function load({cookies}){

//     let userSessionCookie = cookies.get('session') || null

//     console.log('User session data', userSessionCookie)

//     if (userSessionCookie == null){ return {userSessionCookie}; };

//     let storedUserDict = JSON.parse(userSessionCookie)
//     if (typeof storedUserDict != 'object'){
//         let session = null
//         return {session}
//     }

//     const _res = await fetch(
//         './auth/login', 
//         {
//             method: 'POST',
//             body: JSON.stringify({UserEmail: storedUserDict.UserEmail, UserPassword: storedUserDict.UserPassword}),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         )

//     const resultData = await _res.json()
    
//     if (resultData.ok == false){
//         // user no longer exists
//         userSessionCookie = null
//         return {userSessionCookie}
//     }

//     // Update data stored in cookie to reflect any changes 
//     let userDict = resultData.user;
//     cookies.set(
//         'session', 
//         JSON.stringify(userDict), 
//         {
//             path: "/",
//             httpOnly: true,
//             sameSite: true
//         }
//         )


//     userSessionCookie = userDict
//     loginStatus.set(userDict)

//     console.log('session cookie',userDict)

//     return {
//         session: userDict
//     }
// };

