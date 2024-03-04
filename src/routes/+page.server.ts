import type { Actions, PageServerLoad } from "./$types";
import {prisma} from "$lib/server/database/prisma.js"

import { json } from "stream/consumers";

import loginStatus from "../loginStore";








export const load = async ({cookies}) => {


    var session;
    session = cookies.get('session')

    if (session == null){ return {session}; };

    let storedUserDict = JSON.parse(session)
    if (typeof storedUserDict == 'object'){
        let session = null
        return {session}
    }


    const _res = await fetch(
        '/auth/login', 
        {
            method: 'POST',
            body: JSON.stringify({UserEmail: storedUserDict.UserEmail, UserPassword: storedUserDict.UserPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

    const resultData = await _res.json()
    
    if (resultData.ok == false){
        // user no longer exists
        session = null
        return {session}
    }

    // Update data stored in cookie to reflect any changes 
    let userDict = resultData.user;
    cookies.set(
        'session', 
        JSON.stringify(userDict), 
        {
            path: "/",
            httpOnly: true,
            sameSite: true
        }
        )

    session = userDict

    loginStatus.set(session.UserId)

    return {
        session
    }
};

