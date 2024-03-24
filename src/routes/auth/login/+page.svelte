<script lang="ts">
    import { enhance } from "$app/forms";


    // import {GetUser} from "$lib/server/database/user_actions"

    import { goto } from "$app/navigation";

    const credential_input = {
        UserEmail: '',
        UserPassword: '',
        StoreSession: false
    }
   

function loginEvent(){
    goto('/landing')
}

export let form;
export let data;



</script>




<div >
    
    <form class="LoginForm" method="post" use:enhance>
        
        <label for="EmailInput">Email</label>
        <input name="EmailInput" type="email"  bind:value={credential_input.UserEmail} placeholder="Email" />
        
        <label for="PasswordInput">Password</label>
        <input name="PasswordInput" type="password" bind:value={credential_input.UserPassword} placeholder="Password" />

        {#if form?.error}
        <h1> so bas {form?.body}</h1>
        {/if}
    
        
        <label for="StoreSession">Remember Me?</label>
        <input id="StoreSession" type="checkbox"  on:change={async (event)  => {credential_input.StoreSession = await event.target.checked; console.log(credential_input)}} />
        
        <button type="submit" on:click={loginEvent}>Login</button>
        


    </form>
    
    
</div>


<style>
    .LoginForm {
        display: flex;
        flex-flow: column;
    }
</style>


