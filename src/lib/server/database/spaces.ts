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


export async function getSpaces(

    SpaceName?: string, 
    SpaceId?: string,
    SpaceOrganizers?: string[],
    SpaceMembers?: string[],
    PublicPermLevel?: number

    ): Promise< User | Error >{
    const parameter_dict = {
        "SpaceName": SpaceName,
        "SpaceId": SpaceId,
        "SpaceOrganizers": SpaceOrganizers,
        "SpaceMembers": SpaceMembers,
        "PublicPermLevel": PublicPermLevel
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
        const responseString = generateParsableResponse(500, 'Must provide at least one parameter', "application")
        return new Error(responseString)
    }

    console.log(await prisma.space.findFirst())


    try {


        if (Object.keys(present_parameter_dict).indexOf("SpaceId") > -1){

            var user = await prisma.space.findFirstOrThrow(
                {
                    where: present_parameter_dict
                }
                )
            }
        else {

            var user = await prisma.space.findMany(
                {
                    where: present_parameter_dict
                }
                )

        }
    } catch(error){
        console.error('errors',error)
        const responseString = generateParsableResponse(500, "Server error while attempting to find user", "text")
        return new Error(responseString)
    }


    return user
}
