import {prisma} from "$lib/prisma.js"


export default async function getTickets(){
    const tickets = await prisma.ticket.findMany()
    return tickets;
    

}



