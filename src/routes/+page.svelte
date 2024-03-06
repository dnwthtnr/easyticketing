<!-- <script>
    import Timeline from "./objecttimeline/timeline.svelte"
    import Navbar from "./navbar/navbar.svelte";
</script> -->




<script>


    import {widgetparams} from "./objecttimeline/params.js"
    // import {GetTickets} from "$lib/server/database/ticket_actions.js"
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import {hasSavedUserSession} from "./cookie.js"

    if (browser){
        const hasSavedSession = hasSavedUserSession()
        console.log(hasSavedSession)
        if (hasSavedSession == null){
            goto('login')
        }
    }




</script>




<h1>hi</h1>



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



