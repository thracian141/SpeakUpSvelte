<script lang="ts">
    import { slide } from "svelte/transition";

    export let wordInfo: string;
    $: wordInfo = wordInfo;
</script>

<div class="wrapper" in:slide>
    <div class="innerwrap">
        <h1>Word Info</h1>
        <p>{wordInfo}</p>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        min-width:20%;
        flex-grow:1;
        height: 35rem;
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        overflow: hidden;
        padding: 1rem;
    }
    .innerwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 1.5rem;
    }
</style>