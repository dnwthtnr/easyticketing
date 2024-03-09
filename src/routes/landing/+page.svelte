<script lang="ts">
    
import type {PageServerLoad, RouteParams} from "./$types"

export let data: PageServerLoad

// const user = JSON.parse(data.user)
console.log(data.user, 'user')

</script>


<!-- {#await user.UserEmail}
{:then email} -->
<h1>hello {data.user}</h1>
<!-- {/await} -->