import type { ObjectType } from "typescript"
import {prisma} from "./prisma.js"



export async function GetNullUserId(){
    return 0
}



export async function RegisterTicket(
    AuthorId: number, 
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


export async function GetTickets(
    AuthorId?: number, 
    TicketTypeId?: number, 
    TicketTitle?: string, 
    TicketBody?: string, 
    AssignedUserId?: number, 
    TicketStatusId?: number 
    ){

        // Parameters are in same format as database 'prisma/schema.prisma' so a copy of the currently filled 
        // out parameters to search for can be used in prisma query
        const parameter_dict = {
            "AuthorId": AuthorId,
            "TicketTypeId": TicketTypeId,
            "TicketTitle": TicketTitle,
            "TicketBody": TicketBody,
            "AssignedUserId": AssignedUserId,
            "TicketStatusId": TicketStatusId
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

        var tickets = []

        if (Object.keys(present_parameter_dict).length == 0){
            tickets = await prisma.ticket.findMany()
            return tickets
        }


        tickets = await prisma.ticket.findMany(
            {
                where: present_parameter_dict
            }
        )

    return tickets
}