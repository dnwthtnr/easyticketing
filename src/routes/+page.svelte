<!-- <script>
    import Timeline from "./objecttimeline/timeline.svelte"
    import Navbar from "./navbar/navbar.svelte";
</script> -->




<script lang="ts">


    import {widgetparams} from "./objecttimeline/params.js"
    // import {GetTickets} from "$lib/server/database/ticket_actions.js"

    import type {PageData} from "./$types.js"
    import { goto } from "$app/navigation";

    export let data

    if (typeof window !== "undefined"){
        if (data.session == undefined){goto("login");}
    }


</script>




<h1>{data.session}</h1>



<!-- <div class="timeline">

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


</div> -->



