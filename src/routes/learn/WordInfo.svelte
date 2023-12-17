<script lang="ts">
    import { slide } from "svelte/transition";

    export let wordInfo: string;
    $: wordInfo = wordInfo;
</script>

<div class="wrapper" in:slide>
    <h1>Word Info</h1>
    <p>{wordInfo}</p>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 24rem;
        height: 34rem;
        background-color: var(--el-bg-color);
        padding: 1.5rem;
        border-radius: 1rem;
    }
</style>