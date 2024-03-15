import {prisma} from "./prisma.js"
import { generateResponse } from "../generate.js"
import { fail } from "@sveltejs/kit"

import { User, Session } from "$lib/types.js"



export function generateParsableResponse(code: number, message: string, contentType: string): string{
    const response = {
        code: code,
        ok: true,
        message: {
            contentType: contentType,
            body: message
        }

    }

    if (code >= 400){
        response.ok = false
    }

    const responseString = JSON.stringify(response)

    return responseString
}



export async function RegisterUser(UserEmail: string, password: string, userName: string, permission_level: 0): Promise<void> {

    // const hashed_password = await bcrypt.hash(password, 12)

    // TODO: Integrate crypto or some other hasing lib -- bcrypt createds errors due to it's dependencies not being std lib
    const hashed_password = password

    var permission_level_dict = await prisma.permissionLevel.findFirst(
        {
            where: { PermissionLevel: permission_level }
        }
    )

    // Set permisison level to lowest if given value returns undef
    if (typeof permission_level_dict === "undefined"){

        console.log('Provided permission level: "${permission_level}" does not exist. Defaulting to permission level: "0"')

        var permission_level_dict = await prisma.permissionLevel.findFirst(
            {
                where: { PermissionLevel: 0 }
            }
        )
    }

    var _new_user = await prisma.user.create(
        {
            data: {
                UserEmail: UserEmail,
                UserPassword: hashed_password,
                CurrentPermissionLevel: {connect: {PermissionLevelId: permission_level_dict?.PermissionLevelId}},
                UserName: userName
            }
        }
        )

    console.log('Created entry for new user ${_new_user}')
    

    
}

export async function GetUser(UserEmail?: string, PermissionLevel?: number): Promise< User | Error >{
    const parameter_dict = {
        "UserEmail": UserEmail,
        "PermissionLevel": PermissionLevel,
    }

    const present_parameter_dict = parameter_dict

    for (let parameter_name in Object.keys(parameter_dict)){

        var parameter_key = parameter_name as keyof Object

        let parameter_value = parameter_dict[parameter_key]

        if (parameter_value == null){
            delete present_parameter_dict[parameter_key]
            continue
        }
    }

    if (Object.keys(present_parameter_dict).length == 0){
        const responseString = generateParsableResponse(400, 'Must provide at least one parameter', "application")
        return new Error(responseString)
    }


    try {
        var user = await prisma.user.findFirstOrThrow(
            {
                where: present_parameter_dict
            }
            )
    } catch(error){
        console.error(error)
        const responseString = generateParsableResponse(500, "Server error while attempting to find user", "text")
        return new Error(responseString)
    }


    return user
}

export async function GetUserFromCredential(UserEmail: string, UserPassword: string): Promise< User | Error >{
    // Check user login credentials

    var response;

    const user_dict = await GetUser(UserEmail=UserEmail)

    if (typeof user_dict == typeof Error()){
        return <Error>user_dict
    }



    if (typeof user_dict == "undefined"){ return new Error('No user found with given email and password') }

    // const password_valid = await bcrypt.compare(UserPassword, user_dict.UserPassword)

    // TODO: Integrate crypto or some other hasing lib -- bcrypt createds errors due to it's dependencies not being std lib
    const password_valid = UserPassword == user_dict.UserPassword


    if (password_valid == false){
        const responseString = generateParsableResponse(401, "Invalid login credentials.", "text")
        return new Error(responseString)
    }
    console.log('userdict', user_dict)

    const user = <User>user_dict
    return user
}

export async function getUserSession(UserId: number){


    const session = await prisma.session.findMany(
        {where: {
            sessionedUser: {UserId: UserId} }
        }
    )

     if (session == null){
        console.warn('No existent session found for user with ID', UserId)
        return null
     }

     return session

}
    
export async function getSessionedUser(SessionId: number): Promise< User | Error >{
    // Gets user for session id

    console.log('session id' + SessionId)

    if (typeof SessionId != 'number'){
        const responseString = generateParsableResponse(500, "Given session ID is not of type: number/Int", "text")
        return new Error(responseString)
    }

    try {
        var session = await prisma.session.findUniqueOrThrow({
            where: {
                sessionId: SessionId,
            },
            include: {
                sessionedUser: true
            }
        })


    } catch (error) {
        console.error(error)

        const responseString = generateParsableResponse(500, "Server error while attempting to find session", "text")
        return new Error(responseString)
    }
    // if ((sessions.length == 0)){
    //     return new Error("No session found with sessionid" + SessionId)
    // }

    // const session = sessions.at(0)

    var sessionedUser = session?.sessionedUser

    const user = <User>sessionedUser
    
    return user

}


export async function loginUser(UserEmail: string, UserPassword: string): Promise< Error | Session >{
    // Generates new user session - if one already exists

    console.log(UserEmail, UserPassword)

    var user = await GetUserFromCredential(UserEmail, UserPassword)
    if (typeof user == typeof Error()){
        return <Error>user
    }

    // const existingSessionArray = await getUserSession(user.UserId)

    // if (existingSessionArray === Error()){
    //     return new Error(existingSessionArray.message)
    // }

    // const existingSession = existingSessionArray?.at(0)


    // if (existingSession !== null){
    //     return existingSession
    // }

    console.log(user, typeof user)


    try{
        var newSession = await prisma.session.create(
        {
            data: {
                sessionedUser: {connect: {UserId: user?.UserId}}
            }
        }
    )
} catch(error) {

    console.error(error)

    const responseString = generateParsableResponse(500, "Server error while attempting to create session.", "text")
    return new Error(responseString)
    }

    if (Object.keys(newSession).length == 0){
        const responseString = generateParsableResponse(500, "Server error while attempting to create user session.", "text")
        return new Error(responseString)
    }



    console.log('serverses', newSession)

    return <Session>newSession

}