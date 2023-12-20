<script lang="ts">
    export let wordInfo: string;
    $: wordInfo = wordInfo;
</script>

<div class="innerwrap">
    <h1>Word Info</h1>
    <p>{wordInfo}</p>
</div>

<style>
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