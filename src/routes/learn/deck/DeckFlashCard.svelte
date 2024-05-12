<script lang='ts'>
	import { slide } from 'svelte/transition';
    import { createEventDispatcher, onMount } from "svelte";
    import LevelBar from "./LevelBar.svelte";
    import type {DeckCard} from "$lib/scripts/CardHandler";
    import {_} from "$lib/i18n";
    import type {LevelCardInputModel} from '$lib/scripts/LearnHandler';
    import { sendDeckAnswer } from '$lib/scripts/LearnHandler';

    //create a dispatcher
    const dispatch = createEventDispatcher();

    export let currentDeckCard: DeckCard;

    let answerPseudoElement: HTMLElement;
    let answerPseudoWidth: number;

    let dropdownOpen = false;
    let dropdownButtonElement: HTMLButtonElement;

    let answerElement: HTMLInputElement;
    let currentInput = "";
    async function checkAnswer() {
        let regex = new RegExp(currentDeckCard.back, 'i');
        let answer = currentInput.replace(regex, currentDeckCard.back);
        let inputModel: LevelCardInputModel = {linkId: currentDeckCard.id,
            level: currentDeckCard.level,
            difficulty: currentDeckCard.difficulty,
            correct: true
        };
        if (answer.toLowerCase() == currentDeckCard.back.toLowerCase()) {
            answerElement.classList.add("correct");
            setTimeout(() => {
                dispatch("answered");
            }, 1000);
        } else {
            inputModel.correct = false;
            answerElement.classList.add("incorrect");
            setTimeout(() => {
                answerElement.classList.remove("incorrect");
                answerElement.value = "";
                answerElement.placeholder = currentDeckCard.back;
            }, 1500);
        }
        await sendDeckAnswer(inputModel);
    }

    onMount(async() => {
        answerPseudoWidth = answerPseudoElement.clientWidth;
    });

    function onWindowClick(e: MouseEvent) {
        if (dropdownButtonElement.contains(e.target as Node) == false)
            dropdownOpen = false;
    }
</script>


<svelte:window on:click={onWindowClick}/>
<div id="answer-pseudo" bind:this={answerPseudoElement}>
    {currentDeckCard.back}
</div>
<form class="flashcard" class:important={currentDeckCard.flaggedAsImportant}>
    <div class="flashcard-top">
        <LevelBar level={currentDeckCard?.level}/>
        <button type="button" class="card-options-btn" on:click={()=>dropdownOpen = !dropdownOpen} bind:this={dropdownButtonElement}>
            <i class="bi bi-three-dots-vertical"></i>
            {#if dropdownOpen}
            <div class="dropdown" transition:slide>
                <button><i class="bi bi-flag"></i>{$_('learn.flag_as_important')}</button>
                <button on:click={()=>{currentInput=currentDeckCard.back.charAt(0)}}><i class="bi bi-lightbulb"></i>{$_('learn.get_hint')}</button>
            </div>
            {/if}
        </button>
    </div>
    <div class="flashcard-middle">
        <div class="sentence-and-input">
            <input bind:this={answerElement} id="answer-input" style="width: {answerPseudoWidth+10}px" bind:value={currentInput} autocomplete="off"/>
        </div>
    </div>
    <div class="flashcard-bottom">
        <div class="front-wrap">
            <span class="front-word">{currentDeckCard.front}</span>
        </div>
        <button type="submit" class="answer-btn" on:click={async()=>{await checkAnswer()}}>{$_('learn.check_answer')}</button>
    </div>
</form>


<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
    #answer-pseudo {
        display:inline-block; 
        width:fit-content; 
        position:absolute; 
        visibility:hidden; 
        font-size: 3rem;
    }
    :global(.correct) {
        color: var(--green) !important;
        pointer-events: none;
        text-shadow: 0 0 0.1rem var(--green);
        background: none !important;
    }
    :global(.incorrect) {
        color: var(--red) !important;
        text-shadow: 0 0 0.1rem var(--red);
        pointer-events: none;
    }
    .important {
        filter: drop-shadow(0 0 0.5rem var(--yellow));
    }
    .flashcard {
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
        margin: 0;
        align-self: center;
        text-align: center;
        align-items: center;
        padding: 1rem 2rem;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2) !important;
        position: relative;
        height: 40rem;
        width: 65rem;
    }
        .flashcard-top {
            height: 15%;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
            .card-options-btn {
                height: 4rem;
                width: 4rem;
                border-radius: 999px;
                background-color: #00000000;
                border:none;
                color: var(--fg-color-2);
                font-size: 2.5rem;
                padding-top: 0.3rem;
                transition: all 0.1s ease-in-out;
                position: relative;
            }
                .card-options-btn:hover {
                    background-color: var(--bg-middle);
                    color: var(--fg-color);
                    cursor: pointer;
                }
            .dropdown {
                display: flex !important;
                flex-direction: column !important;
                position: absolute;
                background-color: var(--bg-middle);
                border-radius: 0.5rem;
                width: 18rem;
                overflow: hidden;
                left: 50%;
                top:100%;
                transform: translateX(-50%);
            }
                .dropdown > button {
                    height:5rem;
                    font-size: 1.4rem;
                    background:none;
                    color: var(--fg-color);
                    border:none;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: left;
                    padding-left: 2rem;
                    transition: all 0.1s ease-in-out;
                }
                    .dropdown > button:hover {
                        background-color: var(--bg-highlight);
                        color: var(--fg-color-2);
                        cursor: pointer;
                    }
                    .dropdown > button > i {
                        font-size: 2rem;
                        margin-right: 1rem;
                    }
        .flashcard-middle {
            flex-grow: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 2rem;
            padding-top: 5rem;
        }
            .sentence-and-input {
                color: var(--cyan);
                font-size: 3rem;
                min-height: 4rem;
                font-family: var(--font-important);
                display: block;
                text-align: left;
            }
                #answer-input {
                    background-color: var(--bg-color);
                    padding: 0;
                    font-size: 3rem;
                    border: none;
                    outline: none;
                    margin: 0;
                    border-radius: 0.5rem;
                    color: var(--cyan);
                    display: inline-block;
                    text-align: center;
                    height:4rem;
                }
                    #answer-input:focus, #answer-input:active {
                        box-shadow: none !important;
                        -webkit-text-fill-color: var(--cyan);
                    }
                        #answer-input:focus::placeholder, #answer-input:active::placeholder {
                            color: var(--bg-highlight) !important;
                            -webkit-text-fill-color: var(--bg-highlight) !important;
                        }
                    #answer-input::placeholder {
                        color: var(--bg-highlight) !important;
                    }                    
        .flashcard-bottom {
            height: 25%;
            width: 100%;
            border-top: 1px solid var(--bg-highlight);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
        }
            .front-wrap {
                display:flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                height: 100%;
                gap: 1rem;
            }
                .front-word {
                    font-size: 2.8rem;
                }
                .answer-btn {
                    width:10rem;
                    height:4.5rem;
                    border-radius: 0.5rem;
                    background-color: var(--bg-middle);
                    border: 1px solid var(--bg-highlight);
                    color: var(--fg-color-2);
                    font-size: 1.2rem;
                }
                    .answer-btn:hover {
                        cursor: pointer;
                        background-color: var(--bg-highlight);
                        border-color: var(--bg-highlight-2);
                        color: var(--fg-color);
                    }
    @media (pointer: coarse) {
        .flashcard {
            width: 100% !important;
        }
    }
    * {
        box-sizing: border-box;
    }
</style>