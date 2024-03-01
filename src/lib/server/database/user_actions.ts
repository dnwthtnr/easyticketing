import bcrypt from "bcrypt"

import {prisma} from "./prisma.js"



export async function RegisterUser(UserEmail: string, password: string, permission_level: 0): Promise<void> {

    const hashed_password = await bcrypt.hash(password, 12)

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
    return
}

export async function ValidateUserLogin(UserEmail: string, UserPassword: string){
    // Check user login credentials

    // _user_dict = GetUser(UserEmail=UserEmail)

    return
}
