<script lang='ts'>
    import { goto } from "$app/navigation";



    const loginRedirect = () => goto("/auth/login")


</script>


<button type="submit" class="loginButton" on:click={loginRedirect}>Login</button>
