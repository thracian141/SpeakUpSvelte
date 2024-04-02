<script lang="ts">
    import { page } from "$app/stores";
    import Load from '../../../../../Load.svelte';
    import { onMount } from "svelte";
    import {getCourseCardById} from "$lib/scripts/CardHandler";
    import type {CourseCard} from "$lib/scripts/CardHandler";

    let ready = false;

    let cardId = $page.params.card;
    let card:CourseCard | undefined;

    let currentBulkAddFile: FileList | undefined = undefined;

    let fileName: string | undefined = undefined;
    $: {
        if (currentBulkAddFile && currentBulkAddFile.item(0)) {
            fileName = currentBulkAddFile.item(0)?.name;
        }
    }

    onMount(async () => {
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

    </div>
    <div class="bottom-row">
        <p style="margin: 0;">{card?.front} - {card?.back}</p>
        <label for="file" class="file-label">{currentBulkAddFile && currentBulkAddFile.item(0) ?  fileName : "Bulk Add"}</label>
        <input id="file" type="file" class="file-input" accept=".txt" bind:files={currentBulkAddFile}>
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
            flex-grow: 1;
        }
        .bottom-row {
            width: 100%;
            height:6rem;
            display: flex;
            border-top: 1px solid var(--bg-highlight);
            flex-direction: row;
            align-items: center;
            padding:2rem;
            font-size: 1.5rem;
        }
            .file-input {
                margin-left: auto;
                display: none;
                width: 9rem;
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
                width: 9rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
                .file-label:hover {
                    background-color: var(--bg-color-2);
                }

    @media (pointer) {

    }
    * {
        box-sizing: border-box !important;
    }
</style>