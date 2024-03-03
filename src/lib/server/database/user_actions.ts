import {prisma} from "./prisma.js"
import user from "../../../loginStore.js"
import { generateResponse } from "../generate.js"



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

export async function GetUser(UserEmail?: string, PermissionLevel?: number){
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

    var users = []

    if (Object.keys(present_parameter_dict).length == 0){
        users = await prisma.user.findMany()
        return users
    }


    users = await prisma.user.findMany(
        {
            where: present_parameter_dict
        }
    )

    return users
}

export async function ValidateUserLogin(UserEmail: string, UserPassword: string){
    // Check user login credentials

    var response;

    const _result_user_list = GetUser(UserEmail=UserEmail)

    if ((await _result_user_list).length == 0){
        console.error("No user")
        response = generateResponse(false, "Client Error", "User email and/or password are invalid!", null)
        return response
    }

    const user_dict = (await _result_user_list).at(0)



    if (typeof user_dict == "undefined"){ return null }

    // const password_valid = await bcrypt.compare(UserPassword, user_dict.UserPassword)

    // TODO: Integrate crypto or some other hasing lib -- bcrypt createds errors due to it's dependencies not being std lib
    const password_valid = UserPassword == user_dict.UserPassword


    if (password_valid == false){
        return null
    }


    return user_dict
}
