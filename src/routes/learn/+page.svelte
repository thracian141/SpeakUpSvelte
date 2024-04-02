<script lang='ts'>
    import { goto } from "$app/navigation";
    import { updateCourseLearnStore, updateDeckLearnStore } from "$lib/scripts/LearnHandler";
    import { learningDeckOverride } from "$lib/scripts/UserHandler";
    import { onMount } from "svelte";
    import Load from "../Load.svelte";

    let learningDeck: boolean[] = [false, false];

    onMount(async () => {
        learningDeck = await learningDeckOverride();

        if (learningDeck[0] == true) {
            await updateDeckLearnStore();
            goto('/learn/deck');
        } else if (learningDeck[1] == true) {
            await updateCourseLearnStore();
            goto('/learn/course');
        } else {
            goto('decks');
        }

    });
</script>

<Load />
