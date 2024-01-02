<script lang="ts">
    import { onMount } from "svelte";
    import {Deck, decks}  from "./testDecks";
    
    let decksWithUrls: Deck[] = [];

    onMount(async () => {
        decks.forEach(async (deck) => {
            if (deck.image != null) {
                decksWithUrls.push({
                    ...deck,
                    image: await fetch(deck.image).then((res) => res.blob()),
                });
            }
        });
    });
</script>


<div class="outer-wrap">
    {#each decksWithUrls as deck}
        <div class="deck">
            {#if deck.image != null}
                <img src={URL.createObjectURL(deck.image)} alt="{deck.name} deck" />
            {/if}
            <h1>{deck.name}</h1>
        </div>
    {/each}
</div>


<style>
    .deck {
        position: relative;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        background-color: var(--bg-color);
        border-radius: 1rem;
        width:10rem;
        height:6rem;
    }
        .deck img {
            position: absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius: 1rem;
            image-rendering: crisp-edges;
        }
    .outer-wrap {
        display:flex;
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        width:80%;
        height:80%;
    }
</style>