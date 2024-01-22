<script lang="ts">
	import { isNarrowScreen } from '$lib/store';
    import List from './List.svelte';
    import Create from './Create.svelte';

    let currentTab = 'list';
</script>


<div class="outwrap" style="{$isNarrowScreen ? "width:100%; border-radius:0; height:100%; margin-top:7rem;" : "height:35rem;"}">
    <div class="tabs">
        <button on:click={()=>currentTab='list'} class:disabled={currentTab!='list'}>List</button>
        <button on:click={()=>currentTab='create'} class:disabled={currentTab!='create'}>Create deck</button>
    </div>
    {#if currentTab === 'list'}
        <List />
    {:else if currentTab === 'create'}
        <Create />
    {/if}
</div>


<style>
    .tabs {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom:99.9%;
        left:0;
    }
        .tabs > button {
            cursor: pointer;
            width:10rem;
            height:2rem;
            clip-path: polygon(3% 0, 97% 0, 100% 100%, 0 100%);
            border-radius: 1rem 1rem 0 0;
            background-color: var(--el-bg-color);
            border:none;
            color: var(--fg-color);
            font-size: 1.1rem;
            text-decoration: underline;
            transition: all 0.12s ease-in-out;
        }
        .tabs > button:hover {
            z-index: 5;
            text-decoration: none;
        }
        .tabs > .disabled {
            text-decoration: none;
            background-color: var(--bg-middle);
            color: var(--fg-color-half);
        }
        .tabs > .disabled:hover {
            text-decoration: none;
            background-color: var(--el-bg-color);
            color: var(--fg-color);
        }
    .outwrap {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 72rem;
        border-radius: 0 1rem 1rem 1rem;
        background-color: var(--el-bg-color);
        padding:2rem;
    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>