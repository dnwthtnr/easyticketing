import bcrypt from "bcrypt"

import {prisma} from "./prisma.js"


export async function RegisterUser(email: string, password: string, permission_level: 0): Promise<void> {
    const hashed_password = await bcrypt.hash(password, 12)


    const permission_level_object = await prisma.permissionLevel.findFirst({
        where: {
            PermissionLevel: permission_level
        }
    })

    var permission_level_result;
    if (permission_level_object){
        permission_level_result = permission_level
    }
    else {
        permission_level_result = 0 // The default lowest permisision level
    }


    prisma.user.create({
        data: {
            UserEmail: email,
            UserPassword: hashed_password,
            CurrentPermissionLevel: {
                connect: {PermissionLevel: permission_level_result}
            }
        }
    })
}