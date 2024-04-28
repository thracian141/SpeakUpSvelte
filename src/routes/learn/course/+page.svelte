<script lang="ts">
    import FlashCard from "./FlashCard.svelte";
    import { onMount, tick } from "svelte";
    import { nextCourseCard } from "$lib/scripts/LearnHandler";
    import type { CourseCard, CardLink } from "$lib/scripts/CardHandler";
    import type { Sentence } from "$lib/scripts/SentenceHandler";
    import { fade, fly } from "svelte/transition";
    import {_} from 'svelte-i18n'
  import { circInOut, cubicInOut, elasticInOut, expoInOut, quadInOut, quintInOut, sineInOut } from "svelte/easing";

    interface Data {
        cardLink: CardLink;
        sentence: Sentence;
    }

    let currentData: Data|null = null;
    let currentCardLink: CardLink|null = null;
    let currentSentence: Sentence|null = null;
    let gettingNextCard = false;
    let cardsPassed = 0;
    onMount(async() => {
        await nextCard(0);
    });

    async function nextCard(skipId:number) {
        currentData = null;
        currentCardLink = null;
        currentSentence = null;
        gettingNextCard = true;
        cardsPassed++;
        currentData = await nextCourseCard(skipId) as Data | null;
        if (!currentData) return;
        currentCardLink = currentData?.cardLink;
        currentSentence = currentData?.sentence;
        gettingNextCard = false;
    }
</script>


<div class="learn-page">
    {#key cardsPassed}
    {#if !gettingNextCard}
        {#if currentCardLink?.flaggedAsImportant}
            <span style="position:absolute; top:5rem; color:var(--yellow); font-size:1.2rem;">{$_('learn.youve_marked_this_as_important')}</span>
        {/if}
        <div class="flashcard-wrap" in:fly={{ x: 1000, y: 0, duration: 500, easing:sineInOut }}>
            {#if currentCardLink && currentSentence}
                <FlashCard {currentCardLink} {currentSentence} on:answered={async()=>{await nextCard(0)}}/>
                <button id="next-card-btn" on:click={async()=>{
                    if (currentCardLink){
                        await nextCard(currentCardLink.id);
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