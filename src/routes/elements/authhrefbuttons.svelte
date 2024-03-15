<script lang='ts'>
    import { goto } from "$app/navigation";


    import { redirect } from "@sveltejs/kit";


    const registerRedirect = () => goto("/auth/register")
    const loginRedirect = () => goto("/auth/login")


</script>

<div class="Register"><button class="registerButton" on:click={registerRedirect}>Register</button></div>

<div class="Login"><button type="submit" class="loginButton" on:click={loginRedirect}>Login</button></div>
