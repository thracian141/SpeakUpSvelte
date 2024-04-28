<script lang="ts">
    import {deleteDeck} from '$lib/scripts/DeckHandler';
    import { createEventDispatcher } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    const dispatch = createEventDispatcher();
    function deleted() {
        deleteDeck(id);
        dispatch('deleted', index);
    }

    export let deckName: string;
    export let index: number;
    export let id: number;
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="overlay" on:click={()=>dispatch('close')} transition:fade>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <form class="modal" on:click|stopPropagation transition:slide>
        <h1 style="margin:0; margin-bottom:2rem;">Are you sure you want to delete <span style="color:var(--red)">{deckName}</span>?</h1>
        <div class="buttons-row">
            <button class="delete-btn" on:click={deleted}><i class="bi bi-trash"></i></button>
            <button class="close-btn" on:click={()=>{dispatch('close')}}><i class="bi bi-x-lg"></i></button>
        </div>
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
        width: 25rem;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .buttons-row {
        display: flex;
        justify-content: space-around;
    }
    .close-btn {
        background-color: var(--fg-color);
        color: var(--el-bg-color);
        border: none;
        width: 5rem;
        height: 5rem;
        font-size: 2rem;
        border-radius: 0.5rem;
        padding-top: 0.25rem;
        transition: background-color 0.12s ease-in-out;
    }
        .close-btn:hover {
            background-color: var(--fg-color-2);
            cursor: pointer;
        }
    .delete-btn {
        background-color: var(--red);
        color: white;
        border: none;
        width: 5rem;
        height: 5rem;
        font-size: 2rem;
        border-radius: 0.5rem;
        padding-top: 0.25rem;
        transition: background-color 0.12s ease-in-out, color 0.12s ease-in-out;
    }
        .delete-btn:hover {
            background-color: var(--red-half);
            color: var(--fg-color-2);
            cursor: pointer;
        }
</style>