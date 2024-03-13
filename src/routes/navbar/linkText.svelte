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
        margin: 0;
    }
    .NavigableText{
        display: flex;
        
        width: 100%;
        height: 100%;
        
        margin: 0;
        
        
        text-align: center;
        
    }
    .NavigableText:hover{
        background-color: #4a5679;
    }
    .DisplayText{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 400;
        color: #d3d7e2;
        
        width: 100%;
        margin: 0;
    }
    .DisplayText:hover{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: #7381aa;
    }
</style>
