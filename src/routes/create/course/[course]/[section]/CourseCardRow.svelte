<script lang="ts">
    import { slide } from "svelte/transition";
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { deleteCard, type CourseCard, type EditCourseCardModel, partsOfSpeech, editCardFromCourse } from "$lib/scripts/CardHandler";
    import { page } from "$app/stores";

    export let card: CourseCard;
    let element: HTMLDivElement;

    let frontForRow = card.front;
    let backForRow = card.back;
    let partOfSpeechForRow = card.partOfSpeech;
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
    let dropdownForRowOpen = false;

    let arrowRotation = (((difficultyForRow*10)/100)*180)-90;

    async function handleEdit() {
        if (frontForRow === card.front && backForRow === card.back && partOfSpeechForRow === card.partOfSpeech && difficultyForRow === card.difficulty) {
            isEditing = false;
            return;
        } else {
            console.log("Editing card")
            const edit: EditCourseCardModel = {
                id: card.id,
                front: frontForRow,
                back: backForRow,
                partOfSpeech: partOfSpeechForRow,
                difficulty: difficultyForRow
            };
            card = await editCardFromCourse(edit);
            console.log(card);
            arrowRotation = (((difficultyForRow*10)/100)*180)-90;
        }
        isEditing=false;
    }
</script>


<div class="card-row" transition:slide bind:this={element}>
    {#if isEditing}
        <input type="text" class="card-row-text-input" bind:value={frontForRow} />
        <input type="text" class="card-row-text-input" bind:value={backForRow} />
        <button class="card-row-btn" on:click={()=>{dropdownForRowOpen = !dropdownForRowOpen}}>
            <span>{partOfSpeechForRow}</span>
            <i class="bi bi-caret-down-fill"></i>
            {#if dropdownForRowOpen}
            <div class="row-dropdown-body" transition:slide>
                {#each partsOfSpeech as pos}
                    <button on:click={async () => {partOfSpeechForRow = pos; await setTimeout(()=>{dropdownForRowOpen = false}, 5)}}>{pos}</button>
                {/each}
            </div>
            {/if}
        </button>
    {:else}
        <a href="{card.id}/" class="card-row-text" style="width:25%; cursor:pointer; text-decoration:solid line !important;" id="{card.front.toLocaleLowerCase().replace(/ /g, '-')}-front">{card.front}</a>
        <div class="card-row-text" style="width:25%;" id="{card.front.toLocaleLowerCase().replace(/ /g, '-')}-back">{card.back}</div>
        <div class="card-row-text" style="width: 20%;" id="{card.partOfSpeech.toLocaleLowerCase().replace(/ /g, '-')}-pos">{card.partOfSpeech}</div>
    {/if}
    <div class="card-row-number" style="margin-right: 0;">
        <div class="difficulty-wrap" class:difficulty-wrap-edit={isEditing}>
            {#if isEditing}
                <input class="edit-dif-input" type="number" min="0" max="10" step="1" bind:value={difficultyForRow}/>
            {:else}
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
            {/if}
        </div>
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
    .edit-dif-input {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        left:50%;
        bottom:15%;
        transform: translateX(-50%);
        background-color: var(--bg-color);
        color: var(--fg-color);
        border: 1px solid var(--bg-highlight);
        border-radius: 0.5rem;
        z-index: 999;
        text-align: center;
        padding:0;
    }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type=number] {
            appearance: none;
            -moz-appearance: textfield;
        }
    .card-row-btn {
        width: 24%;
        font-size: 1.2rem;
        border-radius: 0.5rem;
        border:none;
        outline:none;
        background-color: var(--bg-color);
        color: var(--fg-color);
        border:1px solid var(--bg-highlight) !important;
        height: 2.6rem;
        cursor:pointer;
        transition: all 0.1s ease-in-out;
        position: relative;
    }
        .card-row-btn:hover {
            box-shadow: 0px 0px 3px var(--cyan);
        }
        .row-dropdown-body {
            display: flex;
            flex-direction: column;
            z-index: 99;
            width:100%;
            position: absolute;
            top: 100%;
            left: 0;
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
    .difficulty-wrap-edit {
        pointer-events: all;
        filter: drop-shadow(0px -1px 3px var(--cyan));
        transition: filter 0.1s ease-in-out;
    }
        .difficulty-wrap-edit:hover {
            cursor: pointer;
            filter: drop-shadow(0px -1px 3px var(--selected-text));
        }
        .difficulty-wrap-edit > .half-circle > .inner-circle > .circle > .arrow {
            border-bottom: none;
            box-sizing: content-box;
            filter: drop-shadow(0px 0px 2px var(--cyan));
            transition: filter 0.1s ease-in-out;
        }
            .difficulty-wrap-edit:hover > .half-circle > .inner-circle > .circle > .arrow {
                filter: drop-shadow(0px 0px 3px var(--selected-text));
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
        .card-row:hover {
            z-index: 999;
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
            height: 2.5rem;
            padding: 1rem;
            font-size: 1.3rem !important;
            margin-right: 1rem;
            line-height: 0.5rem;
        }
        :global(.card-row-text-input) {
            box-sizing: border-box;
            width: 23% !important;
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
</style>