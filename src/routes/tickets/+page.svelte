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

let todotickets: ticket[] = [
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

let doingtickets: ticket[] = [
    {
        id: 11,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "Todo",
        TicketType: "Issue",
        TicketTitle: "Ticket11",
        TicketBody: "this is a ticket"
    },

    {
        id: 12,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket12",
        TicketBody: "thisvalid  is a ticket"
    },
    {
        id: 13,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket13",
        TicketBody: "this is a ticket"
    },

    {
        id: 14,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket14",
        TicketBody: "thisvalid  is a ticket"
    }
]

let tickets = [
    todotickets,
    doingtickets,
    []
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



function ticketable(node, ticketData){
    
    console.log('draggablecall', node, ticketData)

    node.header = 'header'


    node.draggable = true
    node.style.cursor = 'grab'
    node.animate = 'flip'
}



</script>



<div class="tickettimeline">

    {#each tickets as ticketStatus}

    
    <ul>

        <li class='column' style="">
            
            
            {#if ticketStatus.length > 0}
            
            {#each ticketStatus as ticket}
            <ul class='tickets'>
                <li class="ticket" use:ticketable={tickets}>
                    <h1>
                        {ticket.TicketTitle}
                    </h1>
                </li>
            </ul>
            
            {/each}
            {:else}
            
            <h1>No Tickets.....</h1>
            
            {/if}        
        </li>
    </ul>
        
    {/each}
    
    <!-- <section
    class="TODO" 
    id="Todo"
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
    >
        {#each doings as ticket (ticket.id)}
            <div class="card card-hover" animate:flip="{{duration: flipDuration}}" >
                <header class="card-header">
                    <h4>{ticket.TicketTitle}</h4>
                </header>
            </div>
        {/each}
    </section> -->



</div>


<style>
    ul{
        list-style: none;
    }

    .column{
        outline-style: solid;
    }


</style>
