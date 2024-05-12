<script lang="ts">
    import type {Deck} from '$lib/scripts/DeckHandler';
    import { slide } from 'svelte/transition';
    import {getDeckOwner} from '$lib/scripts/DeckHandler';
    import { onMount } from 'svelte';
    import Edit from '../decks/all/Edit.svelte';

    export let deck: Deck;
    let owner = '';
    let isEditing = false;

    onMount(async()=>{
        owner = await getDeckOwner(deck.ownerId);
    });
</script>


<div class="deck-row" transition:slide>
    <div class="info">
        <h3><span>{deck.deckName}</span></h3>
        <p>{owner}</p>
    </div>
    <div class="buttons">
        <a href="/create/deck/{deck.id}" title="Cards"><i class="bi bi-card-list"></i></a>
        <button title="Edit deck" on:click={()=>{isEditing=true;}}><i class="bi bi-pencil"></i></button>
        <button title="Delete deck"><i class="bi bi-trash"></i></button>
    </div>
</div>
{#if isEditing}
    <Edit deck={deck}  index={deck.id} on:close={()=>{isEditing=false;}} on:edit={(e)=>{deck=e.detail}}/>
{/if}

<style>
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        gap:0.5rem;
        border-radius: 0.5rem;
    }
        .buttons > button, .buttons > a {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--bg-color);
            color: var(--fg-color);
            height: 3.5rem;
            border: 1px solid var(--bg-highlight-2);
            border-radius: 0.5rem;
            width: 4rem;
            font-size: 1.5rem;
        }
        .buttons > button:hover, .buttons > a:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    .deck-row {
        background-color: var(--bg-middle);
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid var(--bg-color-2);
        align-items: center;
        border-radius: 0.5rem;
        width: 100%;
        height:6rem;
    }

    * {
        box-sizing: border-box;
    }
</style>