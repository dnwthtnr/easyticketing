<script lang="ts">

    // import {GetUser} from "$lib/server/database/user_actions"

    import loginStatus from "../../loginStore";
    import {tick} from "svelte";
    import { goto } from "$app/navigation";
    import {setPersistentCookie} from "../cookie"

    const credential_input = {
        UserEmail: '',
        UserPassword: '',
        StoreSession: false
    }


    var userId;
    loginStatus.subscribe((value) => async function () {userId = value; console.warn(value);})

    async function InputChanged(e){
        await tick()
        console.log(e)
        console.log(await e.target.value)

        const inputType = await e.target.type;
        if (inputType == 'checkbox'){
            credential_input.StoreSession = e.target.checked
        }
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

    <label for="EmailInput">Email</label>
    <input id="EmailInput" type="email"  bind:value={credential_input.UserEmail} on:change={InputChanged} placeholder="Email" />
    
    <label for="PasswordInput">Password</label>
    <input id="PasswordInput" type="password" bind:value={credential_input.UserPassword} on:change={InputChanged} placeholder="Password" />

    
    <label for="StoreSession">Remember Me?</label>
    <input id="StoreSession" type="checkbox"  on:change={async (event)  => {credential_input.StoreSession = await event.target.checked; console.log(credential_input)}} />
    
    <button type="submit" on:click={loginEvent}>Login</button>
    
    <h1>{userId}</h1>
    
    
    </div>

<style>
    .LoginForm {
        display: flex;
        flex-flow: column;
    }
</style>


