<script lang="ts">
    console.log("args", arguments)


    let ticket = arguments[1].ticketObject

    let ticketDefined = ticket == undefined


</script>



<div class="ticket">

    
    {#if ticketDefined}

    <h1>ERROR</h1>
    {:else}
    <h1>{ticket.TicketTitle}</h1>
    <h2>{ticket.TicketStatus}</h2>
    <p>{ticket.TicketBody}</p>
        
    {/if}


</div>