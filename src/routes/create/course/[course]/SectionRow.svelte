<script lang="ts">
    import { fade, fly, slide } from "svelte/transition";
    import { testsections } from "./testsections";
    import { onDestroy, onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { page } from "$app/stores";

    interface Section { 
        id: number;
        title: string;
        description: string;
        order: number;
    }
    export let section: Section;

    let frontForRow = section.title;
    let backForRow = section.description;

    let isDeleting = false;
    let deleteTimer:number = 5;
    let intervalStarted = false;

    $: {
        if (isDeleting && !intervalStarted) {
            intervalStarted = true;
            const intervalId = setInterval(() => {
                deleteTimer--;
                if (deleteTimer <= 0) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        testsections.update((value) => {
                            return value.filter((s) => s.id !== section.id);
                        });
                        isDeleting = false;
                        intervalStarted = false;
                    }, 10);
                }
            }, 1000);
        }

        if (!isDeleting) {
            deleteTimer = 5; // Reset the timer
            intervalStarted = false;
        }
    }

    let isEditing = false;

    function orderDown() {
        testsections.update((value) => {
            const sectionBelow = value.find((s) => s.order === section.order + 1);
            const sectionToUpdate = value.find((s) => s.id === section.id);
            if (sectionBelow && sectionToUpdate) {
                const tempOrder = sectionBelow.order;
                sectionBelow.order = sectionToUpdate.order;
                sectionToUpdate.order = tempOrder;
            }
            return value.sort((a, b) => a.order - b.order);
        });
    }
    function orderUp() {
        testsections.update((value) => {
            const sectionAbove = value.find((s) => s.order === section.order - 1);
            const sectionToUpdate = value.find((s) => s.id === section.id);
            if (sectionAbove && sectionToUpdate) {
                const tempOrder = sectionAbove.order;
                sectionAbove.order = sectionToUpdate.order;
                sectionToUpdate.order = tempOrder;
            }
            return value.sort((a, b) => a.order - b.order);
        });
    }
</script>


<div class="section-row" in:fade>
    {#if isEditing}
        <input type="text" class="section-row-text-input" bind:value={frontForRow} />
        <textarea class="section-row-text-input" bind:value={backForRow} />
    {:else}
        <a href="{$page.params.course}/{section.id.toString()}" class="section-row-text" id="{section.title.toLocaleLowerCase().replace(/ /g, '-')}-front">{section.title}</a>
        <div class="section-row-text-desc" id="{section.description.toLocaleLowerCase().replace(/ /g, '-')}-back">{section.description}</div>
    {/if}
    <div class="section-row-number">
        {Math.floor(Math.random() * 101)}
    </div>
    <div class="section-row-button">
        <div class="change-order">
            <button on:click={orderUp}><i class="bi bi-arrow-up-short"></i></button>
            <button on:click={orderDown}><i class="bi bi-arrow-down-short"></i></button>
        </div>
        <button on:click={async()=>{isEditing=!isEditing}} class:edit-button-active={isEditing}><i class="bi bi-pen"></i></button>
        <button on:click={async()=>{isDeleting=!isDeleting}} class:delete-button-active={isDeleting}>
            {#if isDeleting}
                <span>{deleteTimer}</span>
            {:else}
                <i class="bi bi-trash"></i>
            {/if}
        </button>
    </div>
</div>


<style>
    .delete-button-active {
        background-color: var(--red) !important;
        color: whitesmoke !important;
        border-radius: 5px !important;
        transition: all 0.12s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .edit-button-active {
        background-color: var(--bg-highlight) !important;
        color: var(--fg-color) !important;
        border-radius: 5px !important;
        transition: all 0.12s ease-in-out;
    }
    .section-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding:0 0.5rem;
        margin:1rem;
        margin-top:0.5rem;
        margin-right: 3rem;
        justify-content: space-between;
        border: 1px solid var(--bg-highlight);
        background-color: var(--el-bg-color);
        color: var(--fg-color-2);
        border-radius: 0.5rem;
        min-height:8rem !important;
        height:8rem;
        align-items: center;
    }
        .section-row-number {
            margin-right: 1rem;
            height:100%;
            width:10%;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            line-height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .section-row-text {
            width: 20% !important;
            height:100%;
            padding: 1rem;
            font-size: 1.3rem !important;
            margin-right: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            font-weight: bold;
            text-decoration: underline solid;
            text-underline-offset: 0.3rem;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
        }
            .section-row-text:hover {
                color: var(--fg-color);
                text-decoration: underline dotted;
                text-decoration-thickness: 2px;
                text-underline-offset: 0.3rem;
            }
        .section-row-text-desc {
            width:40% !important;
            height:100%;
            padding:1rem;
            font-size: 1.1rem;
            margin-right: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        :global(.section-row-text-input) {
            box-sizing: border-box;
            width: 35% !important;
            height: 2.5rem;
            padding: 1rem;
            font-size: 1.3rem !important;
            margin-right: 1rem;
            line-height: 0.5rem;
            border-radius: 0.5rem;
            background-color: var(--bg-color);
            color: var(--fg-color);
            border: 1px solid var(--bg-highlight);
        }
        .section-row-button {
            width:20%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            transition: all 0.12s ease-in-out;
            height:100%;
        }
            .section-row-button > .change-order {
                color:var(--fg-color);
                font-size: 2rem;
                height:50% !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
                .section-row-button > .change-order > button {
                    background-color: #00000000;
                    height:fit-content;
                    width:2.5rem;
                    border:none;
                    border-radius: 999px;
                    color: var(--fg-color);
                    font-size: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                    .change-order > button:hover {
                        background-color: var(--bg-highlight);
                        cursor: pointer;
                    }
            .section-row-button > button {
                background-color:#00000000;
                border: none;
                color: var(--fg-color);
                height:40% !important;
                aspect-ratio: 1/1 !important;
                font-size: 1.4rem;
                border-radius: 999px;
                transition: all 0.12s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;
            }
                .section-row-button > button:hover {
                    background: var(--bg-highlight);
                    cursor: pointer;
                }
                .section-row-button > button:global(.del-active) {
                    border-radius: 5px;
                    background-color: var(--red) !important;
                    color: whitesmoke !important;
                }
                    .section-row-button > button:global(.del-active:hover) {
                        opacity: 0.9 !important;
                    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>