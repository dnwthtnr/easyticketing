<!-- <script>
    import Timeline from "./objecttimeline/timeline.svelte"
    import Navbar from "./navbar/navbar.svelte";
</script> -->




<script >
    import { browser } from "$app/environment";
    import loginStatus from "../loginStore.js";


    // import {GetTickets} from "$lib/server/database/ticket_actions.js"
    import { goto } from "$app/navigation";


    import {getSavedUserSession, getPersistentCookie} from "./cookie.js"

    import {} from "./elements/authhrefbuttons.svelte"
    import Reg from "./elements/authhrefbuttons.svelte"
    import Login from "./elements/authhrefbuttons.svelte"
    import { redirect } from "@sveltejs/kit";


    function loginRedirect(){
        console.log('asdasd')
        throw redirect(303, "/auth/login")
    }



</script>




<h1>Welcome to easy ticketing home page! Sign in or request to sign up</h1>

<div>
    <Login/>
</div>



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



