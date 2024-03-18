<script lang="ts">
    import { enhance } from "$app/forms";


    // import {GetUser} from "$lib/server/database/user_actions"

    import { goto } from "$app/navigation";

    const registrationData = {
        UserName: '',
        UserEmail: '',
        UserPassword: '',
        ConfirmPassword: '',
        StoreSession: false
    }

   

export let form;
export let data;



</script>




    
<form class="Registration" method="post" use:enhance>
    
    {#if form?.error}
        <h1> {form?.message} {form?.body}</h1>
    {/if}


    <label for="UserName">Display Name</label>
    <input name="UserName" type="text"  bind:value={registrationData.UserName} placeholder="Username" />
    
    <label for="EmailInput">Email</label>
    <input name="EmailInput" type="email"  bind:value={registrationData.UserEmail} placeholder="Email" />
    
    <label for="PasswordInput">Password</label>
    <input name="PasswordInput" type="password" bind:value={registrationData.UserPassword} placeholder="Password" />
    
    <label for="ConfirmPassword">Confirm Password</label>
    <input name="ConfirmPassword" type="password" bind:value={registrationData.ConfirmPassword} placeholder="Retype Password" />

    
    <button type="submit">Complete</button>
    


</form>
    
    


<style>
    .Registration {
        display: flex;
        flex-flow: column;
    }
</style>


