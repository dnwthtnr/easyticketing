<script lang="ts">
    
import type {PageServerLoad, RouteParams} from "./$types"

export let data: PageServerLoad

// const user = JSON.parse(data.user)
console.log(data.user, 'user')

</script>


<div>
    <h1>Welcome Back</h1>
</div>


<style>
    :global(){
        display: flex;
    }
</style>