import type { ObjectType } from "typescript"
import {prisma} from "./prisma.js"

import { Ticket, Team } from "$lib/types.js"


function itemInArray(item: any, array: Array<any>): boolean{
    if (array.indexOf(item) > -1){
        return true
    }
    return false
}



export async function RegisterTicket(
    AuthorId: number, 
    TeamId: number,
    TicketTypeId: number, 
    TicketTitle: string, 
    TicketBody: string, 
    AssignedUserId?: number, 
    TicketStatusId?: number
     
    ){

        // Function for creating a new ticket

        const validated_ticket_title = TicketTitle
        const validated_ticket_body = TicketBody



        try {
            console.log('Attempting to create new ticket with author user id: "${author_user_id}" and title "${ticket_title}"')
            var _new_ticket = await prisma.ticket.create(
                {
                    data: {
                        AuthorUser: {connect: {UserId: AuthorId}},
                        Team: {connect: {TeamId: TeamId}},
                        CurrentAssignedUser: {connect: {UserId: AssignedUserId}},
                        TicketStatus: {connect: {TicketStatusId: TicketStatusId}},
                        TicketType: {connect: {TicketTypeId: TicketTypeId}},
                        TicketTitle: validated_ticket_title,
                        TicketBody: validated_ticket_body
                    }
                }
            )
            
        } catch (error) {
            console.error('Encountered error while attemptign  to create ticket with author user id: "${author_user_id}" and ticket title: "${ticket_title}"\nError Readout: ${error}')
        }



    }


export async function getPermissionLevel(
    PermissionLevelId?: number, 
    PermissionLevel?: number, 
    PermissionLevelName?: string, 
    include?: Array<string>
    ): Promise< object | Error > {
    if (include == null){
        include = []
    }

    var searchParameter = {
        "PermissionLevelId": PermissionLevelId, 
        "PermissionLevel": PermissionLevel, 
        "PermissionLevelName": PermissionLevelName
    }


    try {
        var permissionLevel = await prisma.permissionLevel.findUniqueOrThrow(
            {
                where: searchParameter,
                include: {
                    VisibleTeams: itemInArray("VisibleTeams", include),
                    PermissionedUsers: itemInArray("PermissionedUsers", include)
                }
            }
        )
    } catch (error) {
        return new Error(String(error))
    }
    if (permissionLevel == null){
        return new Error('No permission level matching given name and/or id')
    }

    return permissionLevel
    
}

export async function registerTeam(TeamName: string, TeamDescription: string, PublicPermLevel: number, TeamOrganizerId: number) {
    var permissionLevel = await getPermissionLevel(undefined, PublicPermLevel)
    if (permissionLevel == Error()){
        console.log('Given permission level encounter an exception. setting to value 0:', permissionLevel.message)
        permissionLevel = await getPermissionLevel(undefined, 0)
    }

    try {
        
        await prisma.team.create(
            {
                data: {
                    TeamName: TeamName,
                    TeamDescription: TeamDescription,
                    TeamOrganizers: {connect: {UserId: TeamOrganizerId}},
                    PublicPermLevel: {connect: {PermissionLevelId: permissionLevel.PermissionLevelId}}

                }
            }
        )

    } catch (error) {
        return new Error(String(error))
    }
    
}


export async function getTeam(TeamName?: string, TeamId?: number, include?: Array<string>): Promise< object | Error > {

    
    if (include == null){
        include = []
    }

    var searchParameter = {"TeamName": TeamName, "TeamId": TeamId}

    try {
        var team = await prisma.team.findUniqueOrThrow(
            {
                where: searchParameter,
                include: {
                    TeamMembers: itemInArray("TeamMembers", include),
                    TeamTickets: itemInArray("TeamTickets", include)

                }
            }
        )
    } catch (error) {
        return new Error(String(error))
    }
    if (team == null){
        return new Error('No team matching given name and/or id')
    }

    return team

    

}

export async function getTeamTickets(TeamName?: string, TeamId?: number): Promise< Array<object> | Error > {
    //include user for tickets
    var searchParameter = {"TeamName": TeamName, "TeamId": TeamId}
    try {
        var tickets = await prisma.ticket.findMany(
            {
                where: {
                    Team: searchParameter
                },
                include: {
                    AuthorUser: true,
                    CurrentAssignedUser: true,
                    TicketStatus: true,
                    TicketType: true
                }
            }
        )
    } catch (error) {
        return new Error(String(error))
    }
    if (tickets == null){
        return new Error('No tickets belonging to team with given name and/or id')
    }

    return tickets

}

export async function getUserTickets(UserId?: number, UserName?: string, UserRelation=("Author" || "Assigned")): Promise< Array<object> | Error > {
    //include user for tickets

    var searchParameter = {"UserId": UserId, "UserName": UserName}

    const getQueryParameters = (UserRelation: string, searchParameter: object) => { 
        if(UserRelation == "Author"){
            return {AuthorUser: searchParameter}
        } 
        else {
            return {CurrentAssignedUser: searchParameter}
        }
    }

    const queryParameters = getQueryParameters(UserRelation, searchParameter)



    try {
        var tickets = await prisma.ticket.findMany(
            {
                where: queryParameters,
                include: {
                    AuthorUser: true,
                    CurrentAssignedUser: true,
                    TicketStatus: true,
                    TicketType: true
                }
            }
        )
    } catch (error) {
        return new Error(String(error))
    }
    if (tickets == null){
        return new Error('No tickets belonging to team with given name and/or id')
    }

    return tickets

}