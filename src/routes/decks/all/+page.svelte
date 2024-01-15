<script lang="ts">
	import { isNarrowScreen } from '$lib/store';
    import List from './List.svelte';
    import Create from './Create.svelte';

    let currentTab = 'list';
</script>


<div class="outwrap" style="{$isNarrowScreen ? "width:100%; border-radius:0; height:100%; margin-top:5rem;" : ""}">
    <div class="tabs">
        <button on:click={()=>currentTab='list'}>List</button>
        <button on:click={()=>currentTab='create'}>Create deck</button>
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
        bottom:100%;
        left:0;
    }
        .tabs > button {
            width:10rem;
            height:2rem;
            clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);
            border-radius: 1rem 1rem 0 0;
            background-color: var(--el-bg-color);
            border:none;
            color: var(--fg-color);
            font-size: 1.1rem;
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