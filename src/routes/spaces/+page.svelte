<script lang="ts">

export let data;

let spaces = data.spaces

</script>

<div class="spaceMaster">
    <h2>Enter a world of your choosing...</h2>
</div>



<div>

    {#each spaces as {SpaceName}, i}
    <div class="TeamDisplay">
        <p>{SpaceName}</p>
    </div>
    {/each}


</div>