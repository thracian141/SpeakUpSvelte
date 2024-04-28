<script lang='ts'>
    import { goto } from "$app/navigation";
    import { learningDeckOverride } from "$lib/scripts/UserHandler";
    import { onMount } from "svelte";
    import Load from "../Load.svelte";

    let learningDeck: boolean[] = [false, false];

    onMount(async () => {
        learningDeck = await learningDeckOverride();

        if (learningDeck[0] == true) {
            goto('/learn/deck');
        } else if (learningDeck[1] == true) {
            goto('/learn/course');
        } else {
            goto('decks');
        }

    });
</script>

<Load />
