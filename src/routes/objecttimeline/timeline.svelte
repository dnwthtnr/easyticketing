<script lang="ts">
    import {widgetparams} from "./params"
    import getTickets from "$lib/api/tickets.js"

    import type {PageData} from "../$types"
    export let data: PageData
    $: ({users} = data)

</script>




<div class="timeline">

    <p>
        {#each users as user}
        <p>
            user.email
        </p>
        {/each}
    </p>
    
    {#each Object.values(widgetparams.TimelineSections) as section}
    
    <div>
        <p>
            {section}
        </p>
    </div>
        
        {/each}


</div>
