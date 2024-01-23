<script lang="ts">
    import { isNarrowScreen } from '$lib/store';
    import { slide } from 'svelte/transition';
    import Create from "../../decks/all/Create.svelte";
</script>

<div class="outwrap" style="{$isNarrowScreen ? "width:100%; border-radius:0; height:100%; margin-top:5rem;" : "height:35rem;"}" transition:slide>
    <Create />
</div>


<style>
    .outwrap {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 60rem;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
        padding:2rem;
    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>