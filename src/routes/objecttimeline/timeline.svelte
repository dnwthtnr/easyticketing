<script>
    import {widgetparams} from "./params"
    import getTickets from "$lib/api/tickets.js"
</script>




<div class="timeline">

    <p>
        Timeline! Items:
        { (await getTickets()).flatMap}
    </p>
    
    {#each Object.values(widgetparams.TimelineSections) as section}
    
    <div>
        <p>
            {section}
        </p>
    </div>
        
        {/each}


</div>
