<script lang="ts">
    import { User } from "$lib/types";
    import type { PageData, PageServerData } from "../$types";

    import NavigableText from "./linkText.svelte"


export let data: PageServerData;

const navigationItems = {
    "Home": {
        path: "../"
    },
<<<<<<< HEAD
    "Timeline": {
        path: "../tickets"
    },
    "Spaces": {
        path: ""
=======
    "Spaces": {
        path: "../spaces"
>>>>>>> 470890bd2c13d62e40c3ae579bdb839939dbc6e2
    },
    "Help": {
        path: "../help"
    }

}

</script>







<nav class="navbar">
    <div class="links">
        <ul>
            {#each Object.entries(navigationItems) as [item, itemDict]}
                <li>
                    <NavigableText hrefText={itemDict.path} displayText={item}/>
                    <!-- <a href={itemDict.path}>{item}</a> -->
                </li>
            {/each}
        </ul>
    </div>
    
    <div class="userspace">
        <h1>USER</h1>
    </div>

</nav>

<style>
    .links {
        display: flex;
        width: 100%;
        height: 100%;
    }
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