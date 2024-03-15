<script lang="ts">
    import { enhance } from "$app/forms";


    // import {GetUser} from "$lib/server/database/user_actions"

    import { goto } from "$app/navigation";

    const registrationData = {
        UserName: '',
        UserEmail: '',
        UserPassword: '',
        StoreSession: false
    }
   

export let form;
export let data;



</script>




<div >
    
    <form class="Registration" method="post" use:enhance>
        
        <label for="UserName">Display Name</label>
        <input name="UserName" type="text"  bind:value={registrationData.UserName} placeholder="Email" />
        
        <label for="EmailInput">Email</label>
        <input name="EmailInput" type="email"  bind:value={registrationData.UserEmail} placeholder="Email" />
        
        <label for="PasswordInput">Password</label>
        <input name="PasswordInput" type="password" bind:value={registrationData.UserPassword} placeholder="Password" />
        
        <label for="PasswordInput">Confirm Password</label>
        <input name="PasswordInput" type="password" bind:value={registrationData.UserPassword} placeholder="Password" />

        
        <button type="submit">Complete</button>
        


    </form>
    
    
</div>


<style>
    .Registration {
        display: flex;
        flex-flow: column;
    }
</style>


