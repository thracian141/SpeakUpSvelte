<script lang="ts">
    import { isNarrowScreen } from '$lib/store';
    import { fade, slide } from 'svelte/transition';
    import { _, locale } from '$lib/i18n';
    let isRotating = false;

    import type { Section } from './testsections'
    import { testsections } from './testsections';
    import { onMount } from 'svelte';
    import SectionRow from './SectionRow.svelte';
    import { page } from '$app/stores';
    import type {Deck} from '../../../decks/testDecks';
    import { decks } from '../../../decks/testDecks';

    let currentTitle = '';
    let currentDescription = '';
    const pageParameter = $page.params.course;
    let deck:Deck|undefined = decks.find((deck) => deck.id == pageParameter);


    function rotateIcon() {
        isRotating = true;
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    }
    function resetValues() {
        currentTitle = '';
        currentDescription = '';
    }
    let container:HTMLDivElement;
    async function addCurrentSection() {
        let lastIndex = $testsections.length;
        let section: Section = {
            id: lastIndex,
            title: currentTitle,
            description: currentDescription,
            level: 0,
            order: lastIndex+1
            
        }
        await testsections.update((value) => {
            value.push(section);
            return value;
        });

        resetValues();

        container.scrollTop = container.scrollHeight;
    }

    let section: Section;
    testsections.subscribe((value: Section[]) => {
        if (value !== null) 
            section = value[0];
    });

    let descriptionOpened = false;

    onMount(async () => {
        let frontInput = document.getElementById('front');
        if (frontInput)     
            await frontInput?.focus();
    });

</script>


<div class="outwrap" style="{$isNarrowScreen ? "width:100%; height:100%; border-radius:0; margin-top:5rem;" : ""}">
    <div class="top-row" style="{$isNarrowScreen ? "width:100%; height:10%;" : ""}">
        <img src="{deck?.image ?? ''}" alt="{$_(deck?.getName() ?? '')}" />
        <p style="{$isNarrowScreen ? "font-size:1.2rem" : ""}">{$_('create.course.add_sections_to')}
            <span role="banner"
            on:mouseenter={()=>{descriptionOpened=true;}} on:mouseleave={()=>{descriptionOpened=false;}}>
                {$_(deck?.getName() ?? '')}
                {#if descriptionOpened}
                    <div class="dropdownDescription" transition:slide>
                        <span>{deck?.description}</span>
                    </div>
                {/if}
            </span>
        </p>
        <button><i class="bi bi-three-dots-vertical"></i></button>
    </div>
    <div class="cards-list" id='list' bind:this={container}>
        <div class="card-input-row">
            <input type="text" placeholder="{$_('create.course.title')}" id="front" bind:value={currentTitle}/>
            <input type="text" placeholder="{$_('create.deck.description')}"  bind:value={currentDescription}/>
            <button on:click={async()=>{await addCurrentSection();}} class:btn-disabled={currentTitle=='' || currentDescription==''}>+</button>
            <button on:click={()=>{rotateIcon(); resetValues()}}>
                <div class="{isRotating ? 'rotate' : ''}">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </div>
            </button>
        </div>
        {#if $testsections.length == 0}
            <div class="info-row" transition:slide>
                <span style="width:100%; text-align:center;">{$_('create.course.no_sections_added_yet')}</span>
            </div>
        {:else}
            <div class="info-row" transition:slide>
                <span style="width:20%;">{$_('create.course.section')}</span>
                <span style="width:40%;">{$_('create.deck.description')}</span>
                <span style="width:10%; margin-right:0;">{$_('create.course.cards_uppercase')}</span>
                <span style="width:20%"></span>
            </div>
        {/if}
        {#each $testsections as section (section.id)}
            {#key section.order}
                <SectionRow section={section} />
            {/key}
        {/each}
    </div>
</div>


<style>
    .info-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding:0.5rem;
        margin:1rem;
        margin-top:0.5rem;
        margin-right: 3rem;
        justify-content: space-between;
        border-radius: 0.5rem;
        margin-bottom:0;
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
            display: flex;
            align-items: center;
            justify-content: center;
        }
            .card-input-row > button > div {
                display: flex;
                height:100%;
            }
                .card-input-row > button > div > i {
                    align-self: center;
                    margin-top: 20%;
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
        flex-direction: column;
        width: 100%;
        min-height: 80%;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right: 2rem;
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
            height: 66%;
            aspect-ratio: 3/2;
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