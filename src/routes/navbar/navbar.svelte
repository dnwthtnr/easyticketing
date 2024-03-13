<script lang="ts">
    import { User } from "$lib/types";
    import type { PageData, PageServerData } from "../$types";

    import NavigableText from "./linkText.svelte"


export let data: PageServerData;

const navigationItems = {
    "Home": {
        path: "../"
    },
    "Timeline": {
        path: "../ticket"
    },
    "Teams": {
        path: ""
    },
    "Documentation": {
        path: "../documentation"
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
    }
    ul{
        display: flex;

        width: 100%;
        height: 100%;
        margin: 0;

        justify-content: center;

        background-color: #73a54a;
        
        word-spacing: 5%;
    }
    li{
        display: flex;
        font-size: large;
        width: 100%;
        height: 100%;

        margin: 0;
    }
</style>