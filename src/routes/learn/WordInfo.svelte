<script lang="ts">
    import { isNarrowScreen } from "$lib/store";
    export let wordInfo: string;
    $: wordInfo = wordInfo;
</script>

<div class="innerwrap" style="{$isNarrowScreen ? "padding: 0 1.5rem;" : "height:auto; padding: 1.5rem;"}">
    <h1>Word Info</h1>
    <p>{wordInfo}</p>
</div>

<style>
    .innerwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>