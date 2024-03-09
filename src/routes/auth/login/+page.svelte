<script lang="ts">

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


</script>




<div class="LoginForm">
    
    <form action="?/login">
        
        <label for="EmailInput">Email</label>
        <input id="EmailInput" type="email"  bind:value={credential_input.UserEmail} on:change={InputChanged} placeholder="Email" />
        
        <label for="PasswordInput">Password</label>
        <input id="PasswordInput" type="password" bind:value={credential_input.UserPassword} on:change={InputChanged} placeholder="Password" />
    
        
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


