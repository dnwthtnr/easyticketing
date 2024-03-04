<script lang="ts">

    // import {GetUser} from "$lib/server/database/user_actions"

    import loginStatus from "../../loginStore";

    const credential_input = {
        UserEmail: '',
        UserPassword: '',
        StoreSession: false
    }
    let rememberLogin = true;
    




    var userId;
    loginStatus.subscribe((value) => async function () {userId = value; console.warn(value);})



    async function loginEvent(){
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

        loginStatus.set(resultData.UserId)

    }
    


</script>




<div class="LoginForm">

    <label for="EmailInput">Email</label>
    <input id="EmailInput" type="email"  bind:value={credential_input.UserEmail} placeholder="enter your name" />
    
    <label for="PasswordInput">Password</label>
    <input id="PasswordInput" type="password" bind:value={credential_input.UserPassword} placeholder="enter your name" />

    
    <label for="StoreSession">Remember Me?</label>
    <input id="StoreSession" type="checkbox"  bind:value={credential_input.StoreSession} />
    
    
    <h1>{userId}</h1>
    
    <button type="submit" on:click={loginEvent}>Login</button>
    
    </div>


