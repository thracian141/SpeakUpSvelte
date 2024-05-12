<script lang='ts'>
    import { onMount } from "svelte";
    import { _ } from "$lib/i18n";
  import { isNarrowScreen } from "$lib/store";

    export let level: number;

    let fullBars:number, halfBars:number, emptyBars:number;
    let barColor = "var(--cyan)";
    onMount(() => {
        if (level == 0) {
            barColor = "var(--orange)"
            fullBars = 1;
            halfBars = 0;
            emptyBars = 4;
        } else if (level == 50) {
            barColor = "var(--green)"
            fullBars = 5;
            halfBars = 0;
            emptyBars = 0;
        } else {
            fullBars = Math.floor(level / 10);
            halfBars = (level % 10) >= 5 ? 1 : 0;
            emptyBars = 5 - fullBars - halfBars;
        }
    });
</script>


<div class="level-wrapper">
    {#each Array(fullBars) as _, i}
        <div class="bar" style="background-color:{barColor};">

        </div>
    {/each}
    {#if halfBars > 0}
        <div class="bar" style="background-color: {barColor}; opacity:0.5;">
                
        </div>
    {/if}
    {#each Array(emptyBars) as _, i}
        <div class="bar">
                
        </div>
    {/each}
    {#if level == 0 && !$isNarrowScreen}
        <span style="color:{barColor}">{$_('learn.this_word_is_new')}</span>
    {:else if level == 50 && !$isNarrowScreen}
        <span style="color:{barColor}">{$_("learn.you_know_this_lets_keep_going")}</span>
    {/if}
</div>


<style>
    .level-wrapper {
        display:flex;
        flex-direction: row;
        gap:0.3rem;
        margin-left: 2rem;
        align-items: center;
    }
        .bar {
            width:2rem;
            height:0.4rem;
            border-radius: 0.1rem;
            background-color: var(--bg-highlight);
        }
        span {
            font-size: 1.2rem;
            margin-left: 1rem;
            margin-top: -0.2rem;
        }
    * {
        box-sizing: border-box;
    }
</style>