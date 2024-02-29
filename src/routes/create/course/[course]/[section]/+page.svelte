<script lang="ts">
    import { isNarrowScreen } from '$lib/store';
    import type { DeckInputModel } from '$lib/scripts/models/inputModels';
    import {deckStore} from '../../../../decks//all/deckStore';
    import { slide } from 'svelte/transition';
    import { testsections } from '../testsections';
    import type { Section } from '../testsections';
    import {_} from '$lib/i18n';

    let isRotating = false;

    import { testcards } from '../../../deck/cards/testcards';
    import { onMount } from 'svelte';
    import CardRow from '../../../deck/cards/CardRow.svelte';
    import { page } from '$app/stores';
    
    interface Card { 
        id: number;
        front: string;
        back: string;
        level: number;
        difficulty: number;
    }

    let cards: Card[] = $testcards;

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
    async function addCurrentCard() {
        let lastIndex = cards.length;
        let card: Card = {
            id: (lastIndex+1),
            front: currentFront,
            back: currentBack,
            level: 0,
            difficulty: 0
        }
        await testcards.update((value) => {
            value.push(card);
            return value;
        });

        resetValues();
    }


    let sectionId = Number($page.params.section);
    let section: Section | undefined = $testsections.find((section) => section.id == sectionId);

    let descriptionOpened = false;

    onMount(async () => {
        let frontInput = document.getElementById('front');
        if (frontInput)     
            await frontInput?.focus();
    });

</script>


<div class="outwrap" style="{$isNarrowScreen ? "width:100%; height:100%; border-radius:0; margin-top:5rem;" : ""}">
    <div class="top-row" style="{$isNarrowScreen ? "width:100%; height:10%;" : ""}">
        <p style="{$isNarrowScreen ? "font-size:1.2rem" : ""}">{$_('create.course.add_cards_to')} 
            <span role="banner"
            on:mouseenter={()=>{descriptionOpened=true;}} on:mouseleave={()=>{descriptionOpened=false;}}>
                {section?.title}
                {#if descriptionOpened}
                    <div class="dropdownDescription" transition:slide>
                        <span>{section?.description}</span>
                    </div>
                {/if}
            </span>
        </p>
        <button><i class="bi bi-three-dots-vertical"></i></button>
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
        {#if $testcards.length == 0}
            <div class="info-row" transition:slide>
                <span style="width:100%; text-align:center;">{$_('create.course.no_cards_added_yet')}</span>
            </div>
        {:else}
            <div class="info-row" transition:slide>
                <span style="width:35%;">{$_('create.course.front')}</span>
                <span style="width:35%;">{$_('create.course.back')}</span>
                <span style="width:10%; margin-right:0;">{$_('create.course.level')}</span>
                <span style="width:10%; ">{$_('create.course.difficulty')}</span>
                <span style="width: 8%;"></span>
            </div>
        {/if}
        {#each $testcards as card (card.id)}
            <CardRow card={card} />
        {/each}
    </div>
</div>


<style>
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
        overflow-y: scroll;        
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