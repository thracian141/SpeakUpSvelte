<script lang="ts">
    import DeckFlashCard from "./DeckFlashCard.svelte";
    import { onMount, tick } from "svelte";
    import { nextDeckCard } from "$lib/scripts/LearnHandler";
    import type {DeckCard} from "$lib/scripts/CardHandler";
    import { fade, fly } from "svelte/transition";
    import {_} from 'svelte-i18n'
    import { sineInOut } from "svelte/easing";

    let gettingNextCard = false;
    let currentData:any = null;
    let currentDeckCard: DeckCard | null = null;
    let cardsPassed = 0;
    onMount(async() => {
        console.log('mounted')
        await nextCard(0);
        console.log('finished mount')
    });

    async function nextCard(skipId:number) {
        console.log('getting next card')
        currentData = null;
        console.log('current data set to null')
        gettingNextCard = true;
        console.log('getting next card set to true')
        cardsPassed++;
        console.log('cards passed incremented')
        currentData = await nextDeckCard(skipId);
        console.log('current data set to next deck card')
        console.log(currentData)
        if (!currentData) return;
        console.log('current data exists')
        currentDeckCard = currentData;
        console.log('current deck card set')
        gettingNextCard = false;
        console.log('getting next card set to false')
    }
</script>


<div class="learn-page">
    {#key cardsPassed}
    {#if !gettingNextCard}
        {#if currentDeckCard?.flaggedAsImportant}
            <span style="position:absolute; top:5rem; color:var(--yellow); font-size:1.2rem;">{$_('learn.youve_marked_this_as_important')}</span>
        {/if}
        <div class="flashcard-wrap" in:fly={{ x: 1000, y: 0, duration: 500, easing:sineInOut }}>
            {#if currentDeckCard}
                <DeckFlashCard {currentDeckCard} on:answered={async()=>{await nextCard(0)}}/>
                <button id="next-card-btn" on:click={async()=>{
                    if (currentDeckCard){
                        await nextCard(currentDeckCard.id);
                    }
                    }}>
                    <i class="bi bi-chevron-compact-right"></i>
                </button>
            {/if}
        </div>
    {/if}
    {/key}
</div>


<style>
    .learn-page {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width:100%;
        position: relative;
    }
    .flashcard-wrap {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #next-card-btn {
        font-size: 8rem;
        width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: none;
        color: var(--fg-color-2);
        transition: all 0.1s ease-in-out;
    }
        #next-card-btn:hover {
            color: var(--fg-color);
            cursor: pointer;
        }
            #next-card-btn:hover > i {
                filter: drop-shadow(0 0 0.1rem var(--fg-color-2));
            }
</style>