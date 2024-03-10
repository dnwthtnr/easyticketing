<script lang="ts">
    import type { PageData } from "../$types";


export let data: PageData


const navigationItems = {
    "Home": {
        path: "/"
    },

}


</script>







<nav class="navbar">
    <ul>
        <li>
            <a href="../home">home</a>
        </li>
        <li>
            <a href="../">Timeline</a>
        </li>
        <li>
            <a href="../login">Login</a>
        </li>
    </ul>
</nav>

<style>
    nav{
        display: flex;
    }
    ul{
        display: flex;
        list-style: none;
    }
    li{
        display: flex;
        margin-right: 20px;
        font-size: large;
    }
</style>