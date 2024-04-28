<script lang='ts'>
	import { fade, slide } from 'svelte/transition';
	import type { Deck } from '$lib/scripts/DeckHandler';
    import { createEventDispatcher } from 'svelte';
    import { editDeck } from '$lib/scripts/DeckHandler';

    const dispatch = createEventDispatcher();
    
    export let index: number;
    export let deck: Deck;

    let deckName = deck.deckName;
    let deckDescription = deck.deckDescription;
</script>


<span style="display: none;">{index}</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="overlay" on:click={()=>dispatch('close')} transition:fade>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <form class="modal" on:click|stopPropagation transition:slide>
        <h1 style="margin:0; margin-bottom:2rem;">Edit <span>{deck.deckName}</span></h1>
        <button class="close-btn" on:click={()=>{dispatch('close')}}><i class="bi bi-x-lg"></i></button>
        <div class="group">
            <label for="deckName">Deck Name</label>
            <input style="height:3rem;" type="text" id="deckName" bind:value={deckName} />
        </div>
        <div class="">
            <label for="deckDescription">Deck Description</label>
            <textarea id="deckDescription" bind:value={deckDescription}></textarea>
        </div>
        <button type="submit" on:click={async()=>{deck = await editDeck(deck.id, deckName, deckDescription); dispatch('edit', deck)}}>
            <i class="bi bi-check-lg"></i>
        </button>
    </form>
</div>


<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    .modal {
        background-color: var(--el-bg-color);
        padding: 2rem;
        border-radius: 1rem;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
        .group {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
        }
            label {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            input, textarea {
                font-size: 1.2rem;
                padding: 0.5rem;
                border: 1px solid var(--bg-highlight);
                background-color: var(--bg-color);
                color: var(--fg-color);
                border-radius: 0.5rem;
                width: 100%;
                min-width: 100%;
                min-height: 3rem;
            }
    button[type="submit"] {
        background-color: var(--green);
        color:white;
        padding: 0.5rem;
        padding-top: 0.75rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        font-size: 1.5rem;
        transition: opacity 0.12s ease-in-out;
        margin-top: 1rem;
    }
        button:hover {
            opacity: 0.85;
        }
    .close-btn {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--fg-color);
    }
    * {
        box-sizing: border-box;
    }
</style>