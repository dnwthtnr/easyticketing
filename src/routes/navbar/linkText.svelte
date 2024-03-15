<script>
    /**
     * @type {string}
     */
     export let displayText;
    /**
     * @type {string}
     */
     export let hrefText;

</script>


<a href={hrefText}>
    <h3 class="DisplayText">{displayText}</h3>
</a>


<style>
    a{
        text-decoration: none;
        display: flex;

        justify-content: left;

        


        margin: 0;
        padding: 0;
    }
    .DisplayText{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 400;
        color: #c7c9ce;
        
    }
    .DisplayText:hover{
        color: #e3eafa;

    }
</style>
