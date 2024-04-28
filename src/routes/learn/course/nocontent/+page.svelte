<script lang="ts">
  import { goto } from "$app/navigation";
    import {checkIfAnyCards} from "$lib/scripts/LearnHandler";
    import { onMount } from "svelte";

    onMount(async()=>{
        if (await checkIfAnyCards()){
            goto('/learn/course');
        }
    });
</script>