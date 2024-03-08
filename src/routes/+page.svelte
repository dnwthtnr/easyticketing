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


    var userId;

    $: user = $loginStatus

    console.log(user)


    async function validateUserSession(){
        console.warn(localStorage)
        const savedUserSession = await getSavedUserSession()
        console.log('saved session:', userId, savedUserSession)
        if (userId == null){
            goto('login')
        }
        
    }


    
    if (browser){
        validateUserSession()
    }





</script>




<h1>hi {userId}</h1>



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



