<script lang="ts">
    import { isNarrowScreen } from '$lib/store';
    import type { DeckInputModel } from '$lib/scripts/models/inputModels';
    import {deckStore} from '../../../decks/all/deckStore';
    import { slide } from 'svelte/transition';

    let isRotating = false;

    function rotateIcon() {
        isRotating = true;
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    }
    function resetValues() {

    }

    let deck: DeckInputModel;
    deckStore.subscribe((value: DeckInputModel | null) => {
        if (value !== null) 
            deck = value;
    });

    let descriptionOpened = false;

    interface Card { 
        front: string;
        back: string;
        level: number;
        difficulty: number;
    }

    let cards: Card[] = [];


</script>


<div class="outwrap">
    <div class="top-row">
        <img src="{deck.image}" alt="{deck.name}" />
        <p>Add cards to 
            <span role="banner"
            on:mouseenter={()=>{descriptionOpened=true;}} on:mouseleave={()=>{descriptionOpened=false;}}>
                {deck.name}
                {#if descriptionOpened}
                    <div class="dropdownDescription" transition:slide>
                        <span>{deck.description}</span>
                    </div>
                {/if}
            </span>
        </p>
        <button><i class="bi bi-three-dots-vertical"></i></button>
    </div>
    <div class="cards-list">
        <div class="card-input-row">
            <input type="text" placeholder="Front" />
            <input type="text" placeholder="Back" />
            <button>+</button>
            <button on:click={()=>{rotateIcon(); resetValues()}}>
                <div class="{isRotating ? 'rotate' : ''}">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </div>
            </button>
        </div>
    </div>
</div>


<style>
    .rotate {
        animation: rotate 0.5s cubic-bezier(0.68, -0.55, 0.27, 1);
    }

    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    .card-input-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding:1rem;
        justify-content: space-between;
    }
        .card-input-row > input {
            width: 40%;
            height: 3rem;
            padding: 1rem;
            border: 1px solid var(--bg-highlight);
            border-radius: 0.5rem;
            background-color: var(--bg-middle);
            color: var(--fg-color);
            font-size: 1.5rem;
            margin-right: 1rem;
        }
        .card-input-row > button {
            width: 3rem;
            height: 3rem;
            border: 1px solid var(--bg-highlight);
            border-radius: 0.5rem;
            background-color: var(--green);
            color: #fff;
            font-size: 1.5rem;
            margin-right: 1rem;
        }
    .cards-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80%;
    }
    .dropdownDescription {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        right: 50%;
        transform: translateX(50%);
        width:10rem;
        text-wrap:pretty;
        font-size: 1rem;
        background-color: var(--bg-middle);
        border-radius: 0.5rem;
        border: 1px solid var(--bg-highlight);
        padding: 1rem;
        color: var(--fg-color);
        font-weight: normal;
    }
    .top-row {
        display: flex;
        flex-direction: row;
        height:20%;
        width:100%;
        border-bottom: 1px solid var(--bg-highlight);
        padding: 1rem 2rem;
        align-items: center;
        justify-content: space-between;
    }
        .top-row > button {
            background:none;
            border: none;
            color: var(--fg-color);
            height:80%;
            aspect-ratio: 1/1;
            font-size: 2.25rem;
            border-radius: 999px;
            transition: all 0.12s ease-in-out;
        }
            .top-row > button:hover {
                background: var(--bg-highlight);
                cursor: pointer;
            }
        .top-row > img {
            height: 100%;
            aspect-ratio: 1/1;
            margin-right: 1rem;
            border-radius: 0.3rem;
        }
        .top-row > p {
            font-size: 2rem;
            margin: 0;
        }
            .top-row > p > span {
                color: var(--selected-text);
                text-underline-offset: 0.3rem;
                text-decoration: dotted underline var(--selected-text);
                text-decoration-thickness: 2px;
                font-weight: bold;
                cursor:context-menu;
                position: relative;
            }
    .outwrap {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 65rem;
        height: 36rem;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>