<script lang="ts">

    // import {GetUser} from "$lib/server/database/user_actions"

    import { goto } from "$app/navigation";

    const credential_input = {
        UserEmail: '',
        UserPassword: '',
        StoreSession: false
    }

    async function loginEvent(){

        console.log('Attempting login with parameters: ', credential_input)


        const _res = await fetch(
            '/auth/login', 
            {
                method: 'POST',
                body: JSON.stringify(credential_input),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

        const resultData = await _res.json()

        console.log(resultData.user)
            

        if (_res.ok == false){
            throw new Error(resultData.login_message)
        }

        loginStatus.set(resultData.user)

        console.log(loginStatus, resultData.user, localStorage)

        goto("/")

    }
    


</script>




<div class="LoginForm">
    
    <form method="POST" action="?/login">
        
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


