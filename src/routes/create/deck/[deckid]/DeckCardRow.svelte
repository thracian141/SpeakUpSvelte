<script lang="ts">
    import { slide } from "svelte/transition";
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { deleteCard, editCardFromDeck, type DeckCard, type EditDeckCardModel } from "$lib/scripts/CardHandler";
    import { isNarrowScreen } from "$lib/store";

    export let card: DeckCard;
    let element: HTMLDivElement;

    let frontForRow = card.front;
    let backForRow = card.back;
    let difficultyForRow = card.difficulty;

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
                        deleteCard(card.id);
                        if (browser) {
                            element.remove();
                        }
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

    let arrowRotation = (((difficultyForRow*10)/100)*180)-90;
    let difficultyElement: HTMLDivElement;

    async function handleEdit() {
        if (frontForRow === card.front && backForRow === card.back && difficultyForRow === card.difficulty) {
            isEditing = false;
            return;
        } else {
            console.log("Editing card");
            const edit: EditDeckCardModel = {
                id: card.id,
                front: frontForRow,
                back: backForRow,
                difficulty: difficultyForRow,
                flaggedAsImportant: card.flaggedAsImportant
            }
            card = await editCardFromDeck(edit);
            console.log(card);
            arrowRotation = (((difficultyForRow*10)/100)*180)-90;
        }
    }
</script>


<div class="card-row" transition:slide bind:this={element}>
    {#if isEditing}
        <input type="text" class="card-row-text-input" bind:value={frontForRow} />
        <input type="text" class="card-row-text-input" bind:value={backForRow} />
    {:else}
        <div class="card-row-text" id="{card.front.toLocaleLowerCase().replace(/ /g, '-')}-front">{card.front}</div>
        <div class="card-row-text" id="{card.front.toLocaleLowerCase().replace(/ /g, '-')}-back">{card.back}</div>
    {/if}
    <div class="card-row-number">
        <div class="level-wrap">
            {#each Array(Math.floor(card.level / 10)) as _}
                <div class="level-bar full"></div>
            {/each}
            {#if card.level % 10 >= 5}
                <div class="level-bar half"></div>
            {/if}
            {#each Array(5 - Math.ceil(card.level / 10)) as _}
                <div class="level-bar null"></div>
            {/each}
        </div>
    </div>
    <div class="card-row-number" style="margin-right: 0;">
        {#if !$isNarrowScreen}
            {#if !isEditing}
                <div class="difficulty-wrap">
                    <div class="half-circle">
                        <div class="inner-circle">
                            <div class="circle">
                                <div class="arrow" style="transform: translate(-50%, -50%) rotate({arrowRotation}deg); transform-origin:bottom"></div>
                            </div>
                        </div>
                        <div class="green-section"></div>
                        <div class="yellow-section"></div>
                        <div class="red-section"></div>
                    </div>
                </div>
            {:else}
                <input class="diff-input" type="number" min="0" max="10" step="1" bind:value={difficultyForRow}/>
            {/if}
        {:else}
            {#if isEditing}
                <input class="diff-input" type="number" min="0" max="10" step="1" bind:value={card.difficulty} />
            {:else}
                <span>{card.difficulty}</span>
            {/if}
        {/if}
    </div>
    <div class="card-row-button">
        <button on:click={async()=>{
            if (isEditing) {
                await handleEdit();
            } else {
                isEditing=true;
            }
        }} class:edit-button-active={isEditing}><i class="bi bi-pen"></i></button>
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
    .diff-input {
        background-color: var(--bg-color);
        color: var(--fg-color);
        border-radius: 0.25rem;
        border: 1px solid var(--bg-highlight);
        height:100%;
        width: 3.5rem;
        text-align: center;
        margin-right: auto;
    }
        .diff-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        .diff-input::-webkit-outer-spin-button {
            -webkit-appearance: none;
        }
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
    .difficulty-wrap {
        width:65%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
    }
        .half-circle {
            width: 100%;
            height: 60%;
            border-radius: 999px 999px 6rem 6rem;
            background-color: var(--bg-color);
            border: 2px solid var(--bg-highlight-2);
            border-bottom: none;
            overflow: hidden;
            position: relative;
        }
            .green-section {
                background-color: var(--green);
                width:40%;
                height:100%;
                rotate: -80deg;
                bottom:-30%;
                left:0;
                position: absolute;
                z-index: 1;
                clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
            }
            .yellow-section {
                background-color: var(--yellow);
                width:80%;
                height:100%;
                left:50%;
                bottom:20%;
                position: absolute;
                transform: translate(-50%, 0%);
                z-index: 1;
                clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
            }
            .red-section {
                background-color: var(--red);
                width:40%;
                height:100%;
                rotate: 80deg;
                bottom:-30%;
                right:0;
                position: absolute;
                z-index: 1;
                clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
            }
            .inner-circle {
                position: absolute;
                background-color: var(--bg-color);
                width:66%;
                height: 66%;
                border-radius: 999px 999px 0 0;
                z-index: 99;
                bottom:0%;
                left:50%;
                transform: translate(-50%, 0%);
                display: flex;
                align-items: flex-end;
                justify-content: center;
            }
                .inner-circle .circle {
                    height:50%;
                    aspect-ratio: 1;
                    border-radius: 999px;
                    background-color: var(--fg-color);
                    margin-bottom: 0.1rem;
                    position: relative;
                    overflow:visible;
                    filter:drop-shadow(0px 0px 4px var(--el-bg-color));
                }
                    .circle .arrow {
                        position: absolute;
                        height:1.35rem;
                        width:0.25rem;
                        top:-44%;
                        left:50%;
                        border-radius: 100% 100% 0 0;
                        background-color: var(--fg-color);
                    }
    .level-bar {
        width:2rem;
        height:1rem;
        border-radius: 999px;
        margin-bottom: 2px;
    }
        .level-bar.full {
            background-color: var(--cyan);
        }
        .level-bar.half {
            background-color: var(--cyan-half);
        }
        .level-bar.null {
            background-color: var(--bg-highlight);
        }
    .level-wrap {
        display: flex;
        flex-direction: column-reverse;
        height:100%;
        width:50%;
    }
    .card-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 95.5%;
        padding:1.75rem 0.5rem;
        margin:1rem;
        margin-top:0.5rem;
        margin-right: 3rem;
        justify-content: space-between;
        border: 1px solid var(--bg-highlight);
        color: var(--fg-color-2);
        border-radius: 0.5rem;
        min-height: 0;
        height:0;
    }
        .card-row-number {
            margin-right: 1rem;
            height:2.5rem;
            width:10%;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            line-height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-row-text {
            width: 35% !important;
            height: 2.5rem;
            padding: 1rem;
            font-size: 1.3rem !important;
            margin-right: 1rem;
            line-height: 0.5rem;
        }
        :global(.card-row-text-input) {
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
        .card-row-button {
            width:10%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            transition: all 0.12s ease-in-out;
        }
            .card-row-button > button {
                background-color:#00000000;
                border: none;
                color: var(--fg-color);
                width:70%;
                aspect-ratio: 1/1;
                font-size: 1.4rem;
                border-radius: 999px;
                transition: all 0.12s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: center;
            }
                .card-row-button > button:hover {
                    background: var(--bg-highlight);
                    cursor: pointer;
                }
                .card-row-button > button:global(.del-active) {
                    aspect-ratio: 1;
                    border-radius: 5px;
                    width: 70%;
                    aspect-ratio: 1;
                    background-color: var(--red) !important;
                    color: whitesmoke !important;
                }
                    .card-row-button > button:global(.del-active:hover) {
                        opacity: 0.9 !important;
                    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
    @media (pointer: coarse) {
        .card-row {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }
            .card-row-text {
                font-size: 1rem !important;
                margin-right: 0;
                width: 28% !important;
            }
            .card-row-number {
                width: fit-content;
            }
            .level-bar {
                width: 1.2rem;
            }
                .diff-input {
                    background-color: var(--bg-color);
                    color: var(--fg-color);
                    border-radius: 0.25rem;
                    border: 1px solid var(--bg-highlight);
                    height:100%;
                    width: 2rem;
                }
                .card-row-text-input {
                    font-size: 1rem !important;
                    margin-right: 0;
                    width: 30% !important;
                }
            .card-row-button {
                width:3.5rem;
            }
    }
</style>