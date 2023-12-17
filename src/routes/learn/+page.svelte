<script lang="ts">
    import WordInfo from "./WordInfo.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    let ready = false; // Initialize with not ready.
    let direction = -1; // Direction in which the card will fly.

    import { testData } from "./test";

    let currentIndex = 0;

    let orange = '#faaa5a';
    let cyan = 'var(--cyan)';
    let green = '#119854';

    let fullBarColor = 'var(--cyan)';

    $: levelArray = getLevelArray(testData[currentIndex].wordLevel);

    $: {
        if (levelArray[0] === 0 || levelArray[0] == 0.5) {
            fullBarColor = orange;
        } else if (levelArray[4] === 1) {
            fullBarColor = green;
        } else {
            fullBarColor = cyan;
        }
    }

    function getLevelArray(level: number): number[] {
        const floorLevel = Math.floor(level);
        const filledBars = Array(floorLevel).fill(1);
        const halfBar = level % 1 !== 0 ? [0.5] : [];
        const emptyBars = Array(5 - floorLevel - halfBar.length).fill(0);
        return [...filledBars, ...halfBar, ...emptyBars];
    }

    function changeTestData(increment: number) {
        ready = false;
        direction = increment;
        currentIndex = (currentIndex + increment + testData.length) % testData.length;

        setTimeout(() => {
            ready = true;
        }, 300);
    }

    let answerTempWidth : number;
    $: sentenceMeaningParts = testData[currentIndex].sentenceMeaning.split(testData[currentIndex].wordMeaning);
    let dropdownOpen = false;
    onMount(async () => {
        let answerTemp = document.getElementById('answerTemp');
        answerTempWidth = answerTemp ? answerTemp.clientWidth : 0;

        ready = true;
    });

    let infoOpen = false;
</script>

<div style="font-size: 3rem; display:inline-block; width:fit-content; position:absolute; visibility:hidden;" id="answerTemp" 
    bind:clientWidth={answerTempWidth}>{testData[currentIndex].wordMeaning}</div>
<div style="display: flex; flex-direction:row; height:100%; align-items:center; margin-left:auto; margin-right:{dropdownOpen ? "0" : "auto"}; overflow:hidden;">
    <a class="card-scroller" class:disabled={currentIndex <= 0} href="/" on:click={(event) => {event.preventDefault(); changeTestData(-1); dropdownOpen = false;}}>
        <img src="src/lib/icons/chevron-compact-left.svg" alt="previous card" />
    </a>
    {#if ready}
        <div in:fly={{x: direction > 0 ? 1200 : -1200, duration: 500}} 
           out:fly={{x: direction > 0 ? -1200 : 1200, duration: 500}}>
        <div class="wrapper">
            <div class="wrapper-section top">
                <div class="level-wrapper">
                    <div class="bar" style="background-color: 
                        {levelArray[0] === 1 ? fullBarColor : levelArray[0] === 0.5 ? 'var(--cyan-half)' :
                        levelArray[0] === 0 ? 'rgb(250, 170, 90)' : 'var(--bg-color)'};"></div>
                    <div class="bar" style="background-color: 
                        {levelArray[1] === 1 ? fullBarColor : levelArray[1] === 0.5 ? 'var(--cyan-half)' : 'var(--bg-color)'};"></div>
                    <div class="bar" style="background-color: 
                        {levelArray[2] === 1 ? fullBarColor : levelArray[2] === 0.5 ? 'var(--cyan-half)' : 'var(--bg-color)'};"></div>
                    <div class="bar" style="background-color: 
                        {levelArray[3] === 1 ? fullBarColor : levelArray[3] === 0.5 ? 'var(--cyan-half)' : 'var(--bg-color)'};"></div>
                    <div class="bar" style="background-color: 
                        {levelArray[4] === 1 ? fullBarColor : levelArray[4] === 0.5 ? 'var(--cyan-half)' : 'var(--bg-color)'};"></div>
                    {#if testData[currentIndex].wordLevel == 0}
                        <p style="color: #faaa5a">This word is new!</p>
                    {:else if testData[currentIndex].wordLevel == 5}
                        <p style="color: #119854">You know this! Let's keep going.</p>
                    {/if} 
                </div>
                <div style="margin-right: 1rem; display:block; position:relative;">
                    <a class="options-wrapper" href="/" 
                       on:click={(event) => {event.preventDefault(); dropdownOpen = !dropdownOpen;}}>
                        <img src="src/lib/icons/three-dots-vertical.svg" id="options" alt="options"/>
                    </a>
                    <div style="display: none;" class="dropdownClosed" class:dropdown={dropdownOpen}>
                        <span>
                            <img src="src/lib/icons/flag.svg" alt="flag as important" />
                            Flag as important
                        </span>
                        <span>
                            <img src="src/lib/icons/lightbulb.svg" alt="get hint" />
                            Get hint
                        </span>
                        <span>
                            <img src="src/lib/icons/send-exclamation.svg" alt="report error" />
                            Report error
                        </span>
                    </div>
                </div>
            </div>
            <div class="wrapper-section center">
                <div class="sentence">
                    <span>{sentenceMeaningParts[0]}</span>
                    <input id="answer" style="width:{answerTempWidth+10}px" autocomplete="off"/>
                    <span>{sentenceMeaningParts[1]}</span>
                </div>
                <div class="part-of-speech">
                    <span>{testData[currentIndex].partOfSpeech}</span>
                    <img src="src/lib/icons/three-dots.svg" alt="part of speech" />
                </div>
            </div>
            <div class="wrapper-section bottom">
                <p>{testData[currentIndex].wordTranslation}</p>
                <p>{testData[currentIndex].sentenceTranslation}</p>
                <button class="etymology-button" on:click={() => infoOpen = !infoOpen}>
                    <img src="src/lib/icons/search-tilted.svg" alt="etymology of word"/>
                    <p>λόγος</p>
                    <span>Information about this word</span>
                </button>
            </div>
        </div>
        </div>
    {/if}
    <a class="card-scroller" class:disabled={currentIndex == testData.length-1} href="/" on:click={(event) => {event.preventDefault(); changeTestData(1); dropdownOpen = false;}}>
        <img src="src/lib/icons/chevron-compact-right.svg" alt="next card" />
    </a>
    {#if infoOpen && ready && testData[currentIndex].wordInfo}
    <WordInfo wordInfo={testData[currentIndex].wordInfo} />
{/if}
</div>

<style>
    .etymology-button {
        background-color: #00000000;
        position: absolute;
        right: 5%;
        bottom: 7.5%;
        border: none;
        width: 6rem;
        height: 6rem;
    }
        .etymology-button > span {
            position: absolute;
            color:var(--fg-color);
            font-size: 1rem;
            right:70%;
            bottom: -17.5%;
            transform: translate(50%, 50%);
            width: 14rem;
            visibility: hidden;
            background-color: #00000050;
            padding: 0.5rem;
            border-radius: 0.5rem;
            opacity: 0;
            transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
        }
        .etymology-button > p {
            position: absolute;
            bottom: 32%;
            right:10%;
            transform: translateX(-50%);
            font-size: 1.6rem;
            color: var(--fg-color);
            font-family: 'lolFont';
            font-weight: bold;
            transform: skewX(7deg);
            letter-spacing: 0.075rem;
            opacity: 0.4;
            transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        .etymology-button > img {
            position: absolute;
            transform: translate(50%, 50%);
            bottom:90%;
            right:-10%;
            height: 3rem;
            width:auto;
            z-index: 1;
            rotate: 50deg;
            transition: height 0.2s ease-in-out, bottom 0.2s ease-in-out, right 0.2s ease-in-out, rotate 0.2s ease-in-out;
        }
        .etymology-button:hover {
            cursor: pointer;
        }
        .etymology-button:hover > span {
            opacity: 1;
            visibility: visible;
        }
        .etymology-button:hover > p {
            color:var(--cyan);
            opacity: 1;
        }
        .etymology-button:hover > img {
            height: 4rem;
            bottom:50%;
            right:50%;
            rotate: 0deg;
        }
    .disabled {
        pointer-events: none;
        opacity: 0.4;
    }
    .card-scroller > img {
        filter: brightness(0) saturate(100%) invert(58%) sepia(4%) saturate(2098%) hue-rotate(190deg) brightness(96%) contrast(88%);
        height: 5rem;
        transition: filter 0.12s ease-in-out;
    }
    .card-scroller:hover > img {
        filter: brightness(0) saturate(100%) invert(93%) sepia(1%) saturate(3072%) hue-rotate(191deg) brightness(84%) contrast(88%)
            drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
    }
    .dropdownClosed {
        display: flex !important;
        flex-direction: column !important;
        position: absolute;
        top: 100%;
        right:50%;
        transform: translateX(50%);
        width: 18rem;
        height: 0rem;
        background-color: var(--bg-middle);
        border-radius: 0.5rem;
        overflow: hidden;
        transition: height 0.2s ease-in-out;
    }
    .dropdown {
        visibility: visible;
        height: 12rem;
        box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.2);
    }
    .dropdownClosed > span {
        flex-grow: 1;
        font-size: 1.2rem;
        display: flex;
        justify-content: left;
        padding: 1rem 1.5rem 1rem 1.5rem;
        align-items: center;
    }
        .dropdownClosed > span > img {
            height:2rem;
            aspect-ratio: 1/1;
            filter: brightness(0) saturate(100%) invert(93%) sepia(1%) saturate(3072%) hue-rotate(191deg) brightness(84%) contrast(88%);
            margin-right: 1rem;
        }
    .dropdownClosed > span:hover {
        cursor: pointer;
        background-color: var(--bg-color);
    }
    .part-of-speech {
        background-color: var(--bg-color);
        padding: 0.5rem;
        border-radius: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:5rem;
        height:2rem;
        align-self:flex-start;
        font-size: 1.2rem;
        margin: 0 1.5rem 1.5rem;
        color: var(--fg-color);
        box-shadow: 0 0 4px 2px #babecc00;
        transition: background-color 0.12s ease-in-out, color 0.12s ease-in-out, box-shadow 0.2s ease-in-out;
    }
        .part-of-speech > img {
            object-fit: cover;
            height:0.5rem;
            width:1.5rem;
            filter: brightness(0) saturate(100%) invert(93%) sepia(1%) saturate(3072%) hue-rotate(191deg) brightness(84%) contrast(88%);
            transition: filter 0.12s ease-in-out;
        }
        .part-of-speech > span {
            margin:0; margin-top: 0.2rem; margin-bottom: 0.2rem;
            line-height: 100%;
        }
    .part-of-speech:hover {
        cursor: pointer;
        background-color: var(--bg-middle);
        color: #9da0ab !important;
        box-shadow: inset 0 0 4px 1px #babecc08;
    }
        .part-of-speech:hover > img {
            filter: brightness(0) saturate(100%) invert(72%) sepia(13%) saturate(201%) hue-rotate(190deg) brightness(87%) contrast(91%);
        }
    .sentence {
        display:block;
        min-height: 4rem;
        align-items: center;
        color: var(--cyan) !important;
        padding: 0 1.5rem 0 1.5rem;
        text-align: left;
        margin: auto 0 auto 0;
    }
        .sentence > span {
            margin: 0;
            font-size: 3rem;
            line-height: 4rem;
            text-align: left;
            white-space: pre-wrap;
        }
        .sentence > input {
            background-color: var(--bg-color) !important;
            padding: 0;
            font-size: 3rem;
            border: none;
            outline: none;
            margin: 0;
            border-radius: 0.3rem;
            color: var(--cyan) !important;
            display: inline-block;
            text-align: center;
            height:4rem;
        }
            .sentence > input:focus, .sentence > input::placeholder, .sentence > input:active {
                background-color: var(--bg-color) !important;
                box-shadow: none !important;
                color: var(--cyan) !important;
                -webkit-text-fill-color: var(--cyan) !important;
            }
    .center {
        height:55%;
        display: flex;
        flex-direction: column !important;
        justify-content: space-between !important;
        align-items: center;
    }
    .top {
        height:15%;
        justify-content: space-between !important;
    }
    .bottom {
        flex-direction: column !important;
        box-sizing: border-box;
        align-items: flex-start !important;
        height:30%;
        border-top: 1px solid var(--bg-highlight);
        padding: 0 2rem 0 2rem;
    }
    .bottom > p:first-child {
        font-size: 2.2rem;
        margin:0 0 1.5rem 0;
    }
    .bottom > p:last-child {
        font-size: 1.2rem;
        margin:0;
    }
    .wrapper-section {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        background-color: var(--el-bg-color);
        margin: 0;
        align-self: center;
        text-align: center;
        align-items: center;
        padding: 1rem;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2) !important;
        position: relative;
        height: 35rem;
        width: 60rem;
    }
    #options {
        height:2.6rem;
        width:2.6rem;
        filter: brightness(0) saturate(100%) invert(19%) sepia(10%) saturate(330%) hue-rotate(169deg) brightness(96%) contrast(85%);
    }
    .options-wrapper {
        border-radius:100%;
        height:3.5rem;
        width:3.5rem;
        background-color:#00000000;
        transition: background-color 0.2s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .options-wrapper:hover {
        cursor: pointer;
        background-color: #ffffff10;
    }
    p {
        margin: 0;
        padding: 0;
        display: inline-block;
        margin-left: 1rem;
    }
    .bar {
        width:2rem;
        height:0.4rem;
        border-radius: 0.1rem;
    }
    .level-wrapper {
        display:flex;
        flex-direction: row;
        gap:0.3rem;
        margin-left: 2rem;
        align-items: center;
    }
    @font-face {
        font-family: 'lolFont';
        src: url('src/lib/fonts/BeaufortforLOL-Bold.woff2'),
             url('src/lib/fonts/BeaufortforLOL-Bold.ttf');
    }
</style>