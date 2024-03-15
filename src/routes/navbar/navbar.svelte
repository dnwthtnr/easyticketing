<script lang="ts">
    import { User } from "$lib/types";
    import type { PageData, PageServerData } from "../$types";

    import NavigableText from "./linkText.svelte"


export let data: PageServerData;

const navigationItems = {
    "Home": {
        path: "../"
    },
    "Spaces": {
        path: "../spaces"
    },
    "Help": {
        path: "../help"
    }

}

</script>







<nav class="navbar">
    <ul>
        {#each Object.entries(navigationItems) as [item, itemDict]}
            <li>
                <NavigableText hrefText={itemDict.path} displayText={item}/>
                <!-- <a href={itemDict.path}>{item}</a> -->
            </li>
        {/each}
    </ul>
</nav>

<style>
    .navbar{
        display: flex;
        background-color: #4A6FA5;
        /* background-color: #d3d7e2; */

    /* outline-width: 5%;
    outline-style: solid;
    outline-color: #898f97;
    outline-offset: 15px; */
    }
    ul{
        display: flex;

        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        justify-content: left;

        /* background-color: #73a54a; */
        
    }
    li{

        padding-inline: .5%;

        display: flex;
        height: 100%;
        
        /* padding: .5%; */

    }
</style>