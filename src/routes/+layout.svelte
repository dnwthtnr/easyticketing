<script lang="ts">
    import Navbar from "./navbar/navbar.svelte"
</script>


<Navbar/>

<div class="main-content">
    <slot></slot>
</div>

<style>
    .main-content {
        width: 100%;
        height: 100vh;


        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #232946;
    }
</style>