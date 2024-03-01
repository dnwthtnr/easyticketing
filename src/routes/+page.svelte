<!-- <script>
    import Timeline from "./objecttimeline/timeline.svelte"
    import Navbar from "./navbar/navbar.svelte";
</script> -->




<script lang="ts">
    import {widgetparams} from "./objecttimeline/params.js"
    import {GetTickets} from "$lib/server/database/ticket_actions.js"

    import type {PageData} from "./$types"
    export let data: PageData
    $: ({users} = data)

    GetTickets()

</script>




<div class="timeline">

    <p>
        {#each users as user}
        <p>
            {user.UserEmail}
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



