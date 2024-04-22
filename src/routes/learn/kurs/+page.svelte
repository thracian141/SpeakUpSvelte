<script lang="ts">
    import FlashCard from "./FlashCard.svelte";
    import { onMount } from "svelte";
    import { nextCourseCard } from "$lib/scripts/LearnHandler";
    import type { CourseCard, CardLink } from "$lib/scripts/CardHandler";
    import type { Sentence } from "$lib/scripts/SentenceHandler";
    import { fade, fly } from "svelte/transition";


    let currentData: any;
    let currentCardLink: CardLink;
    let currentSentence: Sentence;
    onMount(async() => {
        await nextCard();
    });

    async function nextCard() {
        currentData = await nextCourseCard();
        currentCardLink = currentData.cardLink;
        currentSentence = currentData.sentence;
    }
</script>

<div class="learn-page">
    {#if currentCardLink}
    {#if currentCardLink.flaggedAsImportant}
        <span style="position:absolute; top:5rem; color:var(--yellow); font-size:1.2rem;">You've marked this as important!</span>
    {/if}
    <div class="flashcard-wrap" in:fly={{ x: 2000, y: 0, duration: 500 }} out:fly={{ x: -2000, y: 0, duration: 500 }}>
        <FlashCard {currentCardLink} {currentSentence}/>
        <button id="next-card-btn">
            <i class="bi bi-chevron-compact-right"></i>
        </button>
    </div>
    {/if}
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