<script lang="ts">
	import SentenceRow from './SentenceRow.svelte';
    import { page } from "$app/stores";
    import Load from '../../../../../Load.svelte';
    import { onMount } from "svelte";
    import {getCourseCardById} from "$lib/scripts/CardHandler";
    import type {CourseCard} from "$lib/scripts/CardHandler";
    import { addSentenceToCard, deleteAllSentences, listSentences, type Sentence } from "$lib/scripts/SentenceHandler";
    import { writable } from 'svelte/store';
    import {sentencesStore} from '$lib/scripts/SentenceHandler';

    let ready = false;
    let modifyingSentenceList = false;

    let cardId = $page.params.card;
    let card:CourseCard | undefined;

    let currentFrontSentence: string = "";
    let currentBackSentence: string = "";
    let currentBulkAddFile: FileList | undefined = undefined;

    let fileName: string | undefined = undefined;
    $: {
        if (currentBulkAddFile && currentBulkAddFile.item(0)) {
            fileName = currentBulkAddFile.item(0)?.name;
        }
    }

    let isRotating = false;
    function rotateIcon() {
        isRotating = true;
        currentFrontSentence = "";
        currentBackSentence = "";
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    } 


    let sentences: Sentence[] = [];

    async function handleAdd() {
        if (currentFrontSentence == "" || currentBackSentence == "") 
            return;
        modifyingSentenceList = true;
        let newSentence = await addSentenceToCard(currentFrontSentence, currentBackSentence, Number(cardId));
        sentencesStore.update((value) => {
            value.push(newSentence);
            return value;
        });
        modifyingSentenceList = false;
        currentFrontSentence = "";
        currentBackSentence = "";
    }

    onMount(async () => {
        ready = false;

        sentences = await listSentences(Number(cardId));
        await sentencesStore.set(sentences);

        card = await getCourseCardById(Number(cardId));

        ready = true;
    });
</script>

{#if ready}
<div class="outwrap">
    <div class="top-row">
        <h1>
            Add sentences to 
            <span>{card?.front}</span>
        </h1>
        <a href="/create/course/{$page.params.course}/{$page.params.section}">
            <i class="bi bi-arrow-return-left"></i>
        </a>
    </div>
    <div class="wrap-body">
        <div class="input-row">
            <button id="reset-btn" on:click={()=> {rotateIcon(); }}>
                <div class:rotate={isRotating} style="width:100%; height:100%; display:flex; justify-content:center; align-items:center;">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </div>
            </button>
            <input type="text" placeholder="Sentence" bind:value={currentFrontSentence} />
            <input type="text" placeholder="Translation" bind:value={currentBackSentence} />
            <button id="add-btn" style="font-size: 2rem;" on:click={async()=>{handleAdd()}} 
            class:disabled-btn={currentBackSentence=='' || currentFrontSentence==''}>
                <i class="bi bi-plus"></i>
            </button>
        </div>
        {#each $sentencesStore as sentence (sentence.id)}
            <SentenceRow {sentence} />
        {/each}
    </div>
    <div class="bottom-row">
        <p style="margin: 0;">{card?.front} - {card?.back}</p>
        <span style="font-size: 1rem; margin-left:auto; color:var(--cyan)">Include the Front and Back of the card in the sentence.</span>
        <button class="file-label" on:click={async()=>{await deleteAllSentences(Number(cardId)); await window.location.reload()}}>Clear All</button>
    </div>
</div>
{:else}
    <Load />
{/if}


<style>
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
        .top-row {
            width: 100%;
            height:6rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            border-bottom: 1px solid var(--bg-highlight);
        }
            .top-row h1 {
                font-size: 2.5rem;
                font-weight: 500;
                color: var(--fg-color);
            }
                .top-row h1 span {
                    color: var(--selected-text);
                    font-weight: 700;
                }
            .top-row a {
                font-size: 2rem;
                color: var(--fg-color);
                transition:color 0.1s ease-in-out;
            }
                .top-row a:hover {
                    color: var(--selected-text);
                }
        .wrap-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding: 0 3rem;
            overflow-y: auto;
        }
        .wrap-body::-webkit-scrollbar-track {
            background-color: var(--el-bg-color); /* Use the CSS variable for the scrollbar background color */
        }
            .input-row {
                width: 100%;
                height: 4.5rem;
                min-height: 4.5rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px dotted var(--bg-highlight);
                margin-bottom: 0.6rem;
            }
                .input-row > input {
                    height: 3rem;
                    width: 44%;
                    border-radius: 0.5rem;
                    border:none;
                    background-color: var(--bg-color);
                    border: 1px solid var(--bg-highlight);
                    color: var(--fg-color);
                }
                .input-row > button {
                    height: 3rem;
                    width: 3rem;
                    border-radius: 0.5rem;
                    border:none;
                    background-color: var(--green);
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: opacity 0.1s ease-in-out;
                }
                    .input-row > button:hover {
                        opacity: 0.9;
                    }
                    .input-row > button.disabled-btn {
                        opacity: 0.6 !important;
                        cursor: not-allowed;
                        pointer-events: none;
                    }
        .bottom-row {
            width: 100%;
            height:6rem;
            display: flex;
            border-top: 1px solid var(--bg-highlight);
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding:2rem;
            font-size: 1.5rem;
        }
            .file-label {
                margin-left:auto;
                display: inline-block;
                padding: 10px 20px;
                background-color: var(--bg-color);
                color: var(--fg-color);
                border: 1px solid var(--bg-highlight);
                border-radius: 0.5rem;
                cursor: pointer;
                transition: background-color 0.12s ease-in-out;
                height: 3.5rem;
                font-size: 1.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
                .file-label:hover {
                    background-color: var(--bg-color-2);
                }

    @media (pointer) {

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

    * {
        box-sizing: border-box !important;
    }
</style>