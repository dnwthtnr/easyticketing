<script lang="ts">
    
import type {PageServerLoad, RouteParams} from "./$types"

export let data

// const user = JSON.parse(data.user)

</script>


<div>
    <h1>Welcome Back {data.user}</h1>
</div>


<style>
    :global(){
        display: flex;
    }
</style>