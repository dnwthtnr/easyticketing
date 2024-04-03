<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import {flip} from "svelte/animate"


const flipDuration = 175

interface ticket {
    id: number,
    AuthorUser: string,
    CurrentAssignedUser: string,
    TicketStatus: string,
    TicketType: string,
    TicketTitle: string,
    TicketBody: string
}

let tickets: ticket[] = [
    {
        id: 1,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "Todo",
        TicketType: "Issue",
        TicketTitle: "Ticket1",
        TicketBody: "this is a ticket"
    },

    {
        id: 2,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket2",
        TicketBody: "thisvalid  is a ticket"
    },
    {
        id: 3,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket3",
        TicketBody: "this is a ticket"
    },

    {
        id: 4,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket4",
        TicketBody: "thisvalid  is a ticket"
    }
]



let todos: ticket[] = []
let doings: ticket[] = []

const statusListAssociations = {
    "Todo": todos,
    "inProgress": doings
}

function sortTickets(tickets: ticket[], statusListRegistry: {}){
    console.log('starting sort', tickets.length)
    for(let i=0; i<tickets.length; i++){
        console.log('iter')
        var ticket = tickets[i]

        const ticketStatus = ticket.TicketStatus

        if (Object.keys(statusListRegistry).indexOf(ticketStatus as keyof Object) < 0){
            console.log("Ticket status:", ticketStatus, "has no associated list.")
            continue
        }

        const statusList = statusListRegistry[ticketStatus]
        console.log('listtype', typeof statusList)
        if (typeof statusList != 'object'){
            console.log("Ticket status:", ticketStatus, "has no associated list.")
            continue
        }
        statusList.push(ticket)
        
    }
}

sortTickets(tickets, statusListAssociations)

console.log('lists now sroted', todos, doings)


function handleDndConsider(event: CustomEvent<DndEvent<ticket>>){
    console.log("consier")
    console.log(event.detail.items)
    console.log('target',event.target)
    // ticketsTodo = event.detail.items
    return
}

function handleDndFinalize(event: CustomEvent<DndEvent<ticket>>){
    console.log("finalzed")

    console.log('target',event.target)

    // ticke tsTodo = event.detail.items
    
    return
}

function handleDndEvent(event: CustomEvent<DndEvent<ticket>>){


    
    const selectedID = event.detail.info.id
    const targetZone = event.target

    const targetStatusList = statusListAssociations[targetZone.id]


    // get ticket with id: do this through a request or wasm 
    var selectedTicket;
    for(let i=0; i<tickets.length; i++){
        const ticket = tickets[i]

        if (ticket.id != selectedID){continue};

        selectedTicket = ticket
        break
    }

    const currentTicketStatus = selectedTicket.TicketStatus
    const currentStatusList = statusListAssociations[currentTicketStatus]
    currentStatusList.splice(currentStatusList.indexOf(selectedTicket), 1)

    targetStatusList.push(selectedTicket)

    console.log(todos, "\n", doings)

    console.log('target deets', "|||", event.detail.info, '|||', targetZone)



}


</script>



<div class="container h-full mx-auto flex justify-center items-center">
    
    <section
    class="TODO" 
    id="Todo"
    use:dndzone="{{items:todos, flipDurationMs: flipDuration}}"
    on:finalize="{handleDndEvent}"
    on:consider="{handleDndEvent}"
    >
        {#each todos as ticket (ticket.id)}
            <div class="card card-hover" animate:flip="{{duration: flipDuration}}" >
                <header class="card-header">
                    <h4>{ticket.TicketTitle}</h4>
                </header>
            </div>
        {/each}
    </section>

    <section
    class="DOING" 
    id="inProgress"
    use:dndzone="{{items:doings, flipDurationMs: flipDuration}}"
    on:finalize="{handleDndEvent}"
    on:consider="{handleDndEvent}"
    >
        {#each doings as ticket (ticket.id)}
            <div class="card card-hover" animate:flip="{{duration: flipDuration}}" >
                <header class="card-header">
                    <h4>{ticket.TicketTitle}</h4>
                </header>
            </div>
        {/each}
    </section>



</div>
