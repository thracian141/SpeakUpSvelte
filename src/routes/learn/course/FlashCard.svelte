<script lang='ts'>
	import { slide } from 'svelte/transition';
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import LevelBar from "./LevelBar.svelte";
    import ReportBug from './ReportBug.svelte'
    import { type CourseCard, type CardLink, getPOS } from "$lib/scripts/CardHandler";
    import {_} from "$lib/i18n";
    import type { Sentence } from '$lib/scripts/SentenceHandler';
    import {sendAnswer, type LevelCardInputModel} from '$lib/scripts/LearnHandler';

    //create a dispatcher
    const dispatch = createEventDispatcher();

    export let currentCardLink: CardLink;
    export let currentSentence: Sentence;

    let answerPseudoElement: HTMLElement;
    let answerPseudoWidth: number;

    let dropdownOpen = false;
    let dropdownButtonElement: HTMLButtonElement;
    let reportBugOpen = false;

    let sentenceBackParts: string[] = [];
    let currentPartOfSpeech:string|undefined;

    let answerElement: HTMLInputElement;
    let currentInput = "";
    async function checkAnswer() {
        let regex = new RegExp(currentCardLink.card.back, 'i');
        let answer = currentInput.replace(regex, currentCardLink.card.back);
        let inputModel: LevelCardInputModel = {linkId: currentCardLink.id,
            level: currentCardLink.level,
            difficulty: currentCardLink.card.difficulty,
            correct: true
        };
        if (answer.toLowerCase() == currentCardLink.card.back.toLowerCase()) {
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
                answerElement.placeholder = currentCardLink.card.back;
            }, 1500);
        }
        await sendAnswer(inputModel);
    }

    onMount(async() => {
        answerPseudoWidth = answerPseudoElement.clientWidth;
        let regex = new RegExp(currentCardLink.card.back, 'i');
        sentenceBackParts = currentSentence.back.split(regex);

        currentPartOfSpeech = await getPOS(currentCardLink.card.partOfSpeech);
    });

    function onWindowClick(e: MouseEvent) {
        if (dropdownButtonElement.contains(e.target as Node) == false)
            dropdownOpen = false;
    }
</script>


<svelte:window on:click={onWindowClick}/>
<div id="answer-pseudo" bind:this={answerPseudoElement}>
    {currentCardLink.card.back}
</div>
<form class="flashcard" class:important={currentCardLink.flaggedAsImportant}>
    <div class="flashcard-top">
        <LevelBar level={currentCardLink?.level}/>
        <button type="button" class="card-options-btn" on:click={()=>dropdownOpen = !dropdownOpen} bind:this={dropdownButtonElement}>
            <i class="bi bi-three-dots-vertical"></i>
            {#if dropdownOpen}
            <div class="dropdown" transition:slide>
                <button><i class="bi bi-flag"></i>{$_('learn.flag_as_important')}</button>
                <button on:click={()=>{currentInput=currentCardLink.card.back.charAt(0)}}><i class="bi bi-lightbulb"></i>{$_('learn.get_hint')}</button>
                <button on:click={()=>reportBugOpen=!reportBugOpen}><i class="bi bi-send-exclamation"></i>{$_('learn.report_error')}</button>
            </div>
            {/if}
        </button>
    </div>
    <div class="flashcard-middle">
        <div class="sentence-and-input">
            <span>{sentenceBackParts[0]}</span>
            <input bind:this={answerElement} id="answer-input" style="width: {answerPseudoWidth+10}px" bind:value={currentInput} autocomplete="off"/>
            <span>{sentenceBackParts[1]}</span>
        </div>
        <div class="part-of-speech">
            <i class="bi bi-diagram-2-fill" style="font-size:1.4rem; height:1.2rem;"></i>
            {currentPartOfSpeech}
        </div>
    </div>
    <div class="flashcard-bottom">
        <div class="front-wrap">
            <span class="front-word">{currentCardLink.card.front}</span>
            <span class="front-sentence">{currentSentence ? currentSentence.front : ""}</span>
        </div>
        <button type="submit" class="answer-btn" on:click={async()=>{await checkAnswer()}}>{$_('learn.check_answer')}</button>
    </div>
</form>
{#if reportBugOpen}
    <ReportBug card={currentCardLink.card} on:close={()=>reportBugOpen=false}/>
{/if}


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
                .sentence-and-input > span {
                    margin: 0;
                    height:4rem;
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
            .part-of-speech {
                background-color: var(--bg-color);
                padding: 0.1rem 1rem;
                border-radius: 0.4rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height:3rem;
                font-size: 1.4rem;
                color: var(--fg-color);
                box-sizing: content-box;
            }
                .part-of-speech > i {
                    color : var(--fg-color-2);
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
                .front-sentence {
                    font-size: 1.2rem;
                    color: var(--fg-color-2);
                    margin-left: 1rem;
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
    * {
        box-sizing: border-box;
    }
</style>