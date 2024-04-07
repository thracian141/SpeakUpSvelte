<script lang="ts">
	import { slide } from 'svelte/transition';
    import { deleteSentence, type Sentence } from "$lib/scripts/SentenceHandler";
    import {sentencesStore} from '$lib/scripts/SentenceHandler';

    export let sentence: Sentence;

    async function handleDelete() {
        await deleteSentence(sentence.id);
        sentencesStore.update((value) => {
            return value.filter((s) => s.id != sentence.id);
        });
    }
</script>


<div class="sentence-row" transition:slide>
    <div class="half">
        <p>{sentence.front}</p>
    </div>
    <div class="half">
        <p>{sentence.back}</p>
    </div>
    <button on:click={handleDelete}>
        <i class="bi bi-x"></i>
    </button>
</div>


<style>
    .sentence-row {
        display:flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        margin-bottom: 0.6rem;
        width:100%;
        min-height: 3.5rem;
        height:3.5rem;
        border-bottom: 1px solid var(--bg-highlight);
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: var(--bg-color);
        position: relative;
        transition: background-color 0.1s ease-in-out;
    }
        .sentence-row:hover {
            background-color: var(--bg-middle);
        }
            .sentence-row:hover > button {
                opacity: 1;
                pointer-events: all;
            }
        .half {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            padding:1rem;
            border-left: 1px solid var(--bg-highlight);
        }
            .half:first-child{
                border-left: none !important;
            }
        button {
            opacity: 0; 
            pointer-events: none;
            position: absolute;
            height:2.2rem;
            width:2.2rem;
            top:50%;
            right:0.5rem;
            transform: translateY(-50%);
            border:none;
            border-radius: 999px;
            z-index: 99;
            background-color: var(--red);
            color: white;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: opacity 0.12s ease-in-out;
        }
            button > i {
                height:80%;
                width:100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        button:hover {
            opacity: 0.7 !important;
        }
    
    * {
        box-sizing: border-box;
    }

</style>