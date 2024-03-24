<script lang="ts">
    import Navbar from "./navbar/navbar.svelte"
</script>



<Navbar/>
<div class="main-content">
    
    <div class="div-level2">
        <slot></slot>
    </div>

</div>

<style>
    :global(body){
        margin: 0%;
        padding: 0%;
    }
    .main-content {
        width: 100%;
        height: 100vh;


        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        /* background: #7d9bc9; */
    }
    .div-level2{
        /* margin-left: 5%;
        margin-right: 5%; */
        width: 90%;
        height: 100vh;
        

        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FEFFFE;
    }
</style>