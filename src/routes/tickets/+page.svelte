<script lang="ts">
    import { dndzone } from "svelte-dnd-action";
    import {flip} from "svelte/animate"


    import Ticket from "./ticket.svelte";


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
        TicketBody: "this is a ticket 1"
    },

    {
        id: 2,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "Todo",
        TicketType: "Issue",
        TicketTitle: "Ticket2",
        TicketBody: "thisvalid  is a ticket 2"
    },
    {
        id: 3,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "Todo",
        TicketType: "Issue",
        TicketTitle: "Ticket3",
        TicketBody: "this is a ticket 3"
    },

    {
        id: 4,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "Todo",
        TicketType: "Issue",
        TicketTitle: "Ticket4",
        TicketBody: "thisvalid  is a ticket 4"
    }
]

let doingtickets: ticket[] = [
    {
        id: 11,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket11",
        TicketBody: "this is a ticket 11"
    },

    {
        id: 12,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket12",
        TicketBody: "thisvalid  is a ticket 12"
    },
    {
        id: 13,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket13",
        TicketBody: "this is a ticket 13"
    },

    {
        id: 14,
        AuthorUser: "User",
        CurrentAssignedUser: "me",
        TicketStatus: "inProgress",
        TicketType: "Issue",
        TicketTitle: "Ticket14",
        TicketBody: "thisvalid  is a ticket 14"
    }
]

let tickets = [
    todotickets,
    doingtickets,
    []
]

let todos: ticket[] = []
let doings: ticket[] = []

let statusListRegistrar = {
    "Todo": todotickets,
    "inProgress": doingtickets
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

sortTickets(tickets, statusListRegistrar)

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

    const targetStatusList = statusListRegistrar[targetZone.id]


    // get ticket with id: do this through a request or wasm 
    var selectedTicket;
    for(let i=0; i<tickets.length; i++){
        const ticket = tickets[i]

        if (ticket.id != selectedID){continue};

        selectedTicket = ticket
        break
    }

    const currentTicketStatus = selectedTicket.TicketStatus
    const currentStatusList = statusListRegistrar[currentTicketStatus]
    currentStatusList.splice(currentStatusList.indexOf(selectedTicket), 1)

    targetStatusList.push(selectedTicket)

    console.log(todos, "\n", doings)

    console.log('target deets', "|||", event.detail.info, '|||', targetZone)



}



function getTicketFromId(id, ticketGroup?): ticket | void{
    var ticketSearchList;
    if (ticketGroup != undefined){
        ticketSearchList = ticketGroup
    }
    else {
        ticketSearchList = tickets
    }



    for (let i=0; i<ticketSearchList.length; i++){
        let item = ticketSearchList[i]
        if (item.constructor === Array){
            var ticketResult = getTicketFromId(id, item)
            if (ticketResult === undefined){
                continue
            } 
            else {
                return ticketResult
            }
        }


        // add validation for ticket type


        if (item.constructor !== Object){continue}
        
        if (item.id == id){
            return item
        }
    
    }

}


var KEY_ticketData = "ticketdata"

function ticketable(node: HTMLElement, ticketData: Array<number | string>){

    console.log(arguments)

    console.log("ticketable called with params ticketData:", ticketData)


    node.addEventListener("dragstart", (event) => {
        console.log("Dragstart! Storing ticketData:", ticketData)

        event.dataTransfer.setData(KEY_ticketData, JSON.stringify(ticketData))
        event.dataTransfer.effectAllowed = "copyMove"

        console.log(event.dataTransfer)
    })


    node.draggable = true
    node.style.cursor = 'grab'
    node.animate = 'flip'
}

function droppableArea(node, registrarKey){
    // add listener for drag events on html element
    console.log("key",registrarKey)
    var targetList = statusListRegistrar[registrarKey]
    console.log("asd",targetList)

    function updateRegisteredList(registrarKey, updatedList){statusListRegistrar[registrarKey] = updatedList}
    
    node.addEventListener("dragexit", (event) => {event.preventDefault(); console.log("dragexit")})
    node.addEventListener("dragover", (event) => {event.preventDefault(); console.log("dragover")})
    node.addEventListener("dragenter", (event) => {event.preventDefault(); console.log("entered")})

    node.addEventListener("drop", async (event) => {
        event.preventDefault(); 
        console.log(event, event.dataTransfer)
        var ticketDataStringified = await event.dataTransfer.getData(KEY_ticketData)

        console.log("Read and going to parse stringified ticket data:", ticketDataStringified)
        
        const ticketData = JSON.parse(ticketDataStringified)
        const ticketId = ticketData[0]
        const ticketStatus = ticketData[1]


        if (ticketId.constructor !== Number){
            console.warn("Ticket ID post parse is not number:", ticketId)
        }

        if (ticketStatus.constructor !== String){
            console.warn("ticketStatus post parse is not string:", ticketStatus)
        }

        if (ticketStatus !in Object.keys(statusListRegistrar)){
            console.warn("ticketStatus does not exist in provided ticket statuses:", ticketStatus)
        }        
        
        
        
        var ticket = getTicketFromId(ticketId)



        if (ticket.constructor === null){
            console.warn("Returned ticket from id:", ticketId, "is null")
        }

        console.debug("Ticket returned from id", ticket)


        try {
            var initialStatusList= statusListRegistrar[ticketStatus]
        } catch (error) {
            console.warn("Encoutnered error while attempting to get status list for status:", ticketStatus, "(Full readout logged to debug)")
            console.debug(error)
        }


        // console.log(ticketCurrentGroup, targetGroup)
        
        if (initialStatusList === targetList){console.log("Target status list and current status list are the same"); return}

        console.log("sdsdf",initialStatusList.length)

        try {

            let ticketIndex = initialStatusList.indexOf(ticket)
            console.log(ticketIndex)

            const deleted = initialStatusList.splice(ticketIndex, 1)
            console.log("DELETED ID:", deleted[0].id, "FROM LIST:", ticketStatus)

            console.log("INIT STATUS LIST: ", initialStatusList)


        } catch (error) {
            console.warn("Encoutnered error while attempting to remove ticket of id:", ticketId, "from lsit for status:", ticketStatus, "(Full readout logged to debug)")
            console.debug(error)
        }
        // console.log("currentgrp", ticketCurrentGroup, "ticketgrp", targetGroup)



        

        console.debug(targetList.length)


        try {
            targetList.push(ticket)
        } catch (error)  {
            console.warn("Encoutnered error while attempting to add ticket of id:", ticketId, "to lsit for status:{TARGETLIST}", "(Full readout logged to debug)")
            console.debug(error)
        }


        statusListRegistrar.inProgress[1] = statusListRegistrar.inProgress[1]



        // update ticket object 
        ticket.TicketStatus = registrarKey
        ticket = ticket



        updateRegisteredList(ticketStatus, initialStatusList)
        updateRegisteredList(registrarKey, targetList)
        console.log("INIT STATUS LIST: ", statusListRegistrar.inProgress)

        statusListRegistrar = statusListRegistrar
        console.debug(targetList.length)

        console.info("Redeclaring 'tickets' varaible to trigger update.")

        console.log(tickets)
    })


    
    // from event get node 
    
    console.log(node)
}



</script>



<div id="Timeline">

    {#each Object.entries(statusListRegistrar) as [statusRegistrarKey, ticketGroup]}
    
    <div id="StatusList">

        
        <div id="list">
            <h1>{statusRegistrarKey}</h1>
            
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div use:droppableArea={statusRegistrarKey}>
                {#if ticketGroup.length > 0}

                {#each ticketGroup as ticket (ticket.id)} <!-- // key each or else element only taken from list end -->
                <ul class='tickets'>


                    <li use:ticketable={[ticket.id, ticket.TicketStatus]}>
                        
                        <Ticket ticketObject={ticket}></Ticket>
                    
                    </li>



                </ul>

                {/each}
                {:else}

                <h1>No Tickets.....</h1>

                {/if}
            </div>        
        </div>
    </div>
        
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
    #StatusList{
        display: inline-block;
    }
    #list{
        list-style: none;
        margin-left: 10%;
        background-color: antiquewhite;
    }


</style>
