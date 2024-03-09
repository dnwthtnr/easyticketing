import {prisma} from "./prisma.js"
import { generateResponse } from "../generate.js"
import { fail } from "@sveltejs/kit"



export async function RegisterUser(UserEmail: string, password: string, permission_level: 0): Promise<void> {

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
                CurrentPermissionLevel: {connect: {PermissionLevelId: permission_level_dict?.PermissionLevelId}}
            }
        }
        )

    console.log('Created entry for new user ${_new_user}')
    

    
}

export async function GetUser(UserEmail?: string, PermissionLevel?: number): Promise<{} | Error>{
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
        return new Error('Must provide at least one parameter')
    }


    try {
        var users = await prisma.user.findMany({where: present_parameter_dict})
    } catch(error){
        return new Error(String(error))
    }
    if (users.length == 0){
        return new Error('No user found with given credentials')
    }
    const user = users.at(0)

    return user
}

export async function GetUserFromCredential(UserEmail: string, UserPassword: string){
    // Check user login credentials

    var response;

    const user_dict = await GetUser(UserEmail=UserEmail)

    if (user_dict == Error()){
        return new Error("User Credentials are Invalid.")
    }



    if (typeof user_dict == "undefined"){ return new Error('No user found with given email and password') }

    // const password_valid = await bcrypt.compare(UserPassword, user_dict.UserPassword)

    // TODO: Integrate crypto or some other hasing lib -- bcrypt createds errors due to it's dependencies not being std lib
    const password_valid = UserPassword == user_dict.UserPassword


    if (password_valid == false){
        return new Error("User Credentials are Invalid.")
    }
    console.log('userdict', user_dict)


    return user_dict
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


export async function generateUserSession(UserEmail: string, UserPassword: string): Promise< Error|{} >{
    // Generates new user session - if one already exists

    console.log(UserEmail, UserPassword)

    try {
        var user = await GetUserFromCredential(UserEmail, UserPassword)
    } catch(error) {
        const message = "Error occured when getting user from given credentials" + error
        return new Error(message)
    } 

    console.log('User', user)

    if (user === Error()){
        return new Error(user.message)
    }

    // const existingSessionArray = await getUserSession(user.UserId)

    // if (existingSessionArray === Error()){
    //     return new Error(existingSessionArray.message)
    // }

    // const existingSession = existingSessionArray?.at(0)


    // if (existingSession !== null){
    //     return existingSession
    // }


    try{
        var newSession = await prisma.session.create(
        {
            data: {
                sessionedUser: {connect: {UserId: await user.UserId}}
            }
        }
    )
} catch(error) {
        return new Error(String(error))
    }

    if (Object.keys(newSession).length == 0){
        return new Error("Error creating session")
    }



    console.log('serverses', newSession)

    return newSession

}

    
export async function getSessionedUser(SessionId: number): Promise<{}|Error>{
    // Gets user for session id

    console.log('session id' + SessionId)

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
        return new Error(String(error))
    }
    // if ((sessions.length == 0)){
    //     return new Error("No session found with sessionid" + SessionId)
    // }

    // const session = sessions.at(0)

    try{
        var sessionedUser = session?.sessionedUser
    } catch(error) {
        return new Error(String(error))
    }

    console.log('sessioned user thing', sessionedUser)

    return await sessionedUser

}
