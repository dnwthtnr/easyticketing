<script lang='ts'>
    import { goto } from "$app/navigation";

    const registerRedirect = () => goto("/auth/register")

</script>

<button class="registerButton" on:click={registerRedirect}>Register</button>
