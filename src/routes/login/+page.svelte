<script lang="ts">

    // import {GetUser} from "$lib/server/database/user_actions"

    import {_LoginButtonClicked} from "./+page"

    var email_input = ''
    var password_input = ''

</script>


<div class="Login Prompt">

<input bind:value={email_input} placeholder="enter your name" />
<input bind:value={password_input} placeholder="enter your name" />

<button on:click={_LoginButtonClicked}>Login</button>

</div>



