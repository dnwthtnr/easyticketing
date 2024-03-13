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
    <div class="NavigableText">
        <h3 class="DisplayText">{displayText}</h3>
    </div>
</a>


<style>
    a{
        text-decoration: none;
        display: flex;

        width: 100%;
        height: 100%;

        margin: 0;
        padding: 0;
    }
    .NavigableText{
        display: flex;
        
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        
        
        
        text-align: center;
        
    }
    .NavigableText:hover{
        /* background-color: #4a5679; */

    }
    .DisplayText{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 400;
        color: #c0c5cf;
        
        width: 100%;
        height: 100%;
    }
    .DisplayText:hover{
        color: #cfdbf8;

    }
</style>
