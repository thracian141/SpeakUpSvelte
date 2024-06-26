<script lang="ts">
    import { isNarrowScreen } from '$lib/store';
    import type { Deck } from '$lib/scripts/DeckHandler';
    import { slide } from 'svelte/transition';
    import {_} from '$lib/i18n';

    let isRotating = false;

    import { onMount } from 'svelte';
    import { getDeckById } from '$lib/scripts/DeckHandler';
    import { page } from '$app/stores';
    import { listCardsByDeck, type Card, type DeckCardInput as CardInput, addCardToDeck as addCard, type DeckCard, addCardToDeck } from '$lib/scripts/CardHandler';
    import DeckCardRow from './DeckCardRow.svelte';
  import { url } from '$lib/url';

    let cardsListElement: HTMLDivElement;

    let currentFront = '';
    let currentBack = '';

    function rotateIcon() {
        isRotating = true;
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    }
    function resetValues() {
        currentBack = '';
        currentFront = '';
    }

    let deckModel:Deck;
    let cards: DeckCard[] = [];
    let addingCard = false;

    let descriptionOpened = false;

    let deckid = $page.params.deckid;
    onMount(async () => {
        deckModel = await getDeckById(Number(deckid));
        cards = await listCardsByDeck(Number(deckid));

        let frontInput = await document.getElementById('front');
        if (frontInput)     
            await frontInput?.focus();
    });

    async function addCurrentCard() {
        let card: CardInput = {
            front: currentFront,
            back: currentBack,
            difficulty: 0,
            deckId: Number(deckid)
        }
        addingCard = true;
        const newCard:DeckCard = await addCardToDeck(card);
        cards = await cards.concat(newCard);
        addingCard = false;

        resetValues();
    }
</script>

{#if deckModel}
<div class="outwrap" style="{$isNarrowScreen ? "width:100%; height:100%; border-radius:0; margin-top:5rem;" : ""}">
    <div class="top-row" style="{$isNarrowScreen ? "width:100%; height:10%;" : ""}">
        <p style="{$isNarrowScreen ? "font-size:1.2rem" : ""}">{$_('create.course.add_cards_to')}
            <span role="banner"
            on:mouseenter={()=>{descriptionOpened=true;}} on:mouseleave={()=>{descriptionOpened=false;}}>
                {deckModel.deckName}
                {#if descriptionOpened}
                    <div class="dropdownDescription" transition:slide>
                        <span>{deckModel.deckDescription}</span>
                    </div>
                {/if}
            </span>
        </p>
        <a class="go-back" href="/decks/all"><i class="bi bi-arrow-90deg-left"></i></a>
    </div>
    <div class="cards-list" id='list' bind:this={cardsListElement}>
        <div class="card-input-row">
            <input type="text" placeholder="{$_('create.course.front')}" id="front" bind:value={currentFront}/>
            <input type="text" placeholder="{$_('create.course.back')}"  bind:value={currentBack}/>
            <button on:click={async()=>{await addCurrentCard();}} class:btn-disabled={currentFront=='' || currentBack==''}>+</button>
            <button on:click={()=>{rotateIcon(); resetValues()}}>
                <div class="{isRotating ? 'rotate' : ''}">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </div>
            </button>
        </div>
        {#if cards.length == 0}
            <div class="info-row" transition:slide>
                <span style="width:100%; text-align:center;">{$_('create.course.no_cards_added_yet')}</span>
            </div>
        {:else}
            <div class="info-row">
                <span style="width:35%;">{$_('create.course.front')}</span>
                <span style="width:35%;">{$_('create.course.back')}</span>
                <span style="width:10%; margin-right:0;">{$_('create.course.level')}</span>
                {#if !$isNarrowScreen}
                <span style="width:10%; ">{$_('create.course.difficulty')}</span>
                {:else}
                <span style="width:10%; ">{$_('create.course.difficulty').slice(0,4)}.</span>
                {/if}
                <span style="width: 8%;"></span>
            </div>
        {/if}
        {#if !addingCard && cards.length > 0} 
            {#each cards as card, index (card.id)}
                <DeckCardRow card={card} />
            {/each}
        {/if}
    </div>
</div>
{/if}


<style>
    .go-back {
        font-size: 2rem;
    }
    .info-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 95.5%;
        padding:0.5rem;
        margin:1rem;
        margin-top:0.5rem;
        margin-right: 3rem;
        justify-content: space-between;
        border-radius: 0.5rem;
        margin-bottom:0;
        order: 1;
    }
        .info-row > span {
            height: 1.5rem;
            margin-bottom: -0.25rem;
            padding: 1rem;
            font-size: 1.3rem;
            margin-right: 1rem;
            line-height: 0.5rem;
            color: var(--fg-color);
        }
    
    .btn-disabled {
        opacity: 0.5;
        pointer-events: none;
    }
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
        order: 2;
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
            transition: opacity 0.1s ease-in-out;
        }
            .card-input-row > button:hover {
                cursor: pointer;
                opacity: 0.9;
            }
            .card-input-row > button:active {
                box-shadow: 0px 0px 4px var(--fg-color);
            }
    .cards-list {
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-end;
        width: 100%;
        height: 80%;
        overflow-y: auto;       
        overflow-x: hidden;
    }
        .cards-list::-webkit-scrollbar-track {
            background: var(--el-bg-color);
            overflow:visible !important;
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
        z-index: 50;
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
    @media (pointer: coarse) {
        .outwrap {
            width: 100vw !important;
        }
        .go-back {
            font-size: 1.2rem;
        }
        .cards-list {
            width: 100vw !important;
            padding: 0 !important;
        }
        .card-input-row {
            width: 100%;
            justify-content: space-between;
        }
            .card-input-row > input {
                margin-right:0;
                font-size: 1rem;
                width: 35%;
            }
            .card-input-row > button {
                margin-right: 0;
            }
            .card-input-row > button:last-child {
                margin-right: 0;
            }
        .info-row {
            padding: 0;
            margin-left: 1rem;
            justify-content: flex-start;
        }
            .info-row > span {
                font-size: 1rem;
                margin-right: 0;
                text-align: left;
            }
                .info-row > span:nth-child(1) {
                    width:27.5% !important;
                }
                .info-row > span:nth-child(2) {
                    width:24% !important;
                }
                .info-row > span:nth-child(3) {
                    width:15% !important;
                }
    }
</style>