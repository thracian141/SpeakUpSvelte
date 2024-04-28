<script lang='ts'>
    import { _ } from 'svelte-i18n';
    import {getLastDeck} from '$lib/scripts/DeckHandler';
    import type {Deck} from '$lib/scripts/DeckHandler';
    import { onMount } from 'svelte';

    let deck: Deck | null = null;
    onMount(async () => {
        deck = await getLastDeck();
    });
</script>

{#if deck}
<div style="text-align: left; background-color:var(--el-bg-color); border-radius:1rem; padding:2rem; border:1px solid var(--bg-highlight)">
    <h1>{$_('no_content.no_more_cards')}</h1>
    <h2 style="line-height: 3rem; font-weight:normal;">{$_('no_content.wait_until_more_cards')},
        <br> {$_('no_content.add_more_cards_to')} "<a href="/create/deck/{deck?.id}">{deck?.deckName}</a>", 
        <br>{$_('no_content.or_pick_a')} <a href="/decks/all">{$_('no_content.different_deck')}</a>.
    </h2>
</div>
{/if}
