<script>
    import {widgetparams} from "./params"
</script>




<div class="timeline">

    <p>
        Timeline!
    </p>
    
    {#each Object.values(widgetparams.TimelineSections) as section}
    
    <div>
        <p>
            {section}
        </p>
    </div>
        
        {/each}


</div>
