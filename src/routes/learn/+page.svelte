<script lang="ts">
    import WordInfo from "./WordInfo.svelte";
    import { onMount, tick } from "svelte";
    import { _ } from "$lib/i18n";
    import { isNarrowScreen } from "$lib/store";
    import { fly, slide } from "svelte/transition";
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
        currentIndex = (currentIndex + increment);
        console.log(currentIndex);
        setTimeout(() => {
            ready = true;
        }, 300);
    }

    let answerTempWidth : number;
    $: sentenceMeaningParts = testData[currentIndex].sentenceMeaning.split(testData[currentIndex].wordMeaning);
    let dropdownOpen = false;

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;

        if (dropdownOpen) {
            setTimeout(() => {
                const handleClickOutside = (event: Event) => {
                    if (!document.getElementById('dropdown')!.contains(event.target as Node)) {
                        dropdownOpen = false;
                        document.removeEventListener('click', handleClickOutside);
                    }
                };

                document.addEventListener('click', handleClickOutside);
            }, 0);
        }
    }

    let answerInput: HTMLInputElement;

    let startX:number;
    let currentX:number;
    let outerwrap:HTMLDivElement;

    function handleTouchStart(event: TouchEvent) {
        if (!$isNarrowScreen) return;
        startX = event.touches[0].clientX;
        currentX = startX;
    }

    function handleTouchMove(event: TouchEvent) {
        if (!$isNarrowScreen) return;
        event.preventDefault();

        const x = event.touches[0].clientX;
        const diffX = x - startX;

        outerwrap.style.transform = `translateX(${diffX}px)`;
        currentX = x;
    }

    function handleTouchEnd() {
        if (!$isNarrowScreen) return;
        outerwrap.style.transition = 'transform 0.2s ease-out';
        outerwrap.style.transform = '';
        if (currentX - startX > window.innerWidth / 3) {
            changeTestData(-1);
        } else if (startX - currentX > window.innerWidth / 3) {
            changeTestData(1);
        }
        setTimeout(() => {
            outerwrap.style.transition = '';
        }, 500);
    }

    onMount(async () => {
        let answerTemp = document.getElementById('answerTemp');
        answerTempWidth = answerTemp ? answerTemp.clientWidth : 0;

        ready = true;
        await tick();
        answerInput.focus();
    });

    let infoOpen = false;
    $: { 
        if (testData[currentIndex].wordInfo !== undefined || testData[currentIndex].wordInfo !== null || testData[currentIndex].wordInfo !== "") {
            infoOpen = false;
        }
    }
    $: leftDisabled = currentIndex <= 0;
    $: rightDisabled = currentIndex >= testData.length-1;
    $: console.log("left disabled: " + leftDisabled);
    $: console.log("right disabled: " + rightDisabled);
</script>

<div style="{$isNarrowScreen ? "font-size: 1.5rem;" : "font-size: 3rem;"} display:inline-block; width:fit-content; position:absolute; visibility:hidden;" id="answerTemp" 
    bind:clientWidth={answerTempWidth}>{testData[currentIndex].wordMeaning}
</div>
<div style="display:flex; margin-left:{infoOpen ? "0" : "auto"}; 
    margin-right:{infoOpen ? "0" : "auto"}; overflow:hidden; width:100%; 
    flex-flow:row; {$isNarrowScreen ? "flex-direction:column; justify-content: flex-start; height:100%;" : "height:100%; padding:1rem; justify-content: center; align-items:center; flex-direction:row;"}">
    {#if ready}
        <div on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd} bind:this={outerwrap}
           in:fly={{x: direction > 0 ? 1200 : -1200, duration: 500}} 
           out:fly={{x: direction > 0 ? -1200 : 1200, duration: 500}} 
           class="outerwrap" style="flex-grow:{infoOpen ? "4" : "0"}; {$isNarrowScreen ? "width:100%; min-width:100%; flex-direction:column; flex-grow:0;" : "height: 35rem;"}">  
            <a class="card-scroller" class:disabled={leftDisabled} class:narrowscreen={$isNarrowScreen} href="/" on:click={(event) => {event.preventDefault(); changeTestData(-1); dropdownOpen = false;}}>
                <img src="/icons/chevron-compact-left.svg" alt="previous card" />
            </a>
            <div class="wrapper" style="{$isNarrowScreen ? "border-radius:0; padding:0.5rem; height:auto;" : ""}">
                <div class="wrapper-section top">
                    <div class="level-wrapper" style="{$isNarrowScreen ? "margin: 1.5rem auto 0 auto" : ""}">
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
                        {#if testData[currentIndex].wordLevel == 0 && !$isNarrowScreen}
                            <p style="color: #faaa5a">{$_('learn.this_word_is_new')}</p>
                        {:else if testData[currentIndex].wordLevel == 5 && !$isNarrowScreen}
                            <p style="color: #119854">{$_("learn.you_know_this_lets_keep_going")}</p>
                        {/if} 
                    </div>
                    <div style="{$isNarrowScreen ? "position:absolute; right:0.4rem; top:0.4rem;" : "margin-right: 1rem; position:relative;"} display:block;">
                        <a class="options-wrapper" href="/" 
                        on:click={(event) => {event.preventDefault(); toggleDropdown()}}>
                            <img src="/icons/three-dots-vertical.svg" id="options" alt="options" style="{$isNarrowScreen ? "height:2rem;" : ""}"/>
                        </a>
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="dropdownClosed" class:dropdown={dropdownOpen} id="dropdown"
                        on:click|stopPropagation style="display: none; {$isNarrowScreen ? "right:0 !important; transform:translateX(0%)" : ""}">
                            <span>
                                <img src="/icons/flag.svg" alt="flag as important" />
                                {$_('learn.flag_as_important')}
                            </span>
                            <span>
                                <img src="/icons/lightbulb.svg" alt="get hint" />
                                {$_('learn.get_hint')}
                            </span>
                            <span>
                                <img src="/icons/send-exclamation.svg" alt="report error" />
                                {$_('learn.report_error')}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="wrapper-section center" style="{$isNarrowScreen ? "height: 9rem; padding-top:1.75rem" : ""}">
                    <div class="sentence" style="{$isNarrowScreen ? "font-size:1.5rem !important; margin-top:0; margin-bottom:0.5rem;" : ""}">
                        <span style="{$isNarrowScreen ? "line-height:2rem;" : "line-height:4rem;"}">{sentenceMeaningParts[0]}</span>
                        <input id="answer" bind:this={answerInput} style="{$isNarrowScreen ? "font-size:1.5rem !important; height:2rem; border-radius:0.15rem; padding:0 0.5rem" : ""}; 
                                                width:{answerTempWidth+10}px" autocomplete="off"/>
                        <span style="{$isNarrowScreen ? "line-height:2rem;" : "line-height:4rem;"}">{sentenceMeaningParts[1]}</span>
                    </div>
                    <div class="part-of-speech" style="{$isNarrowScreen ? "margin:0 auto 0.25rem auto; height:1.5rem; width:90%; background-color:var(--el-bg-color);" : ""}">
                        <span style="{$isNarrowScreen ? "color:var(--bg-highlight-2); font-size:1rem" : ""}"><i class="bi bi-diagram-2-fill" style="color:var(--bg-highlight)"></i>{testData[currentIndex].partOfSpeech}</span>
                    </div>
                </div>
                <div class="wrapper-section bottom" style="{$isNarrowScreen ? "height:5rem; position:relative; padding-top:0.5rem; padding-bottom:0.5rem" : ""}">
                    <p style="{$isNarrowScreen ? "margin-bottom:0rem; font-size:1.5rem; margin-top:0rem;" : ""}">{testData[currentIndex].wordTranslation}</p>
                    <p style="{$isNarrowScreen ? "margin-left:0rem; width:14rem; text-align:left; font-size:1rem;" : ""}">{testData[currentIndex].sentenceTranslation}</p>
                    {#if testData[currentIndex].wordInfo}
                        <button class="etymology-button" on:click={() => infoOpen = !infoOpen}
                            style="{$isNarrowScreen ? "top:25%; right:7.5%; height:3rem;" : ""}">
                            <img src="/icons/search-tilted.svg" alt="etymology of word" style="{$isNarrowScreen ? "height:2rem; " : ""}"/>
                            <p style="{$isNarrowScreen ? "margin:0; font-size:1.2rem; top:40%;" : ""}">λόγος</p>
                            <span style="{$isNarrowScreen ? "transform: none; right:0; top:100%; height:1.2rem" : ""}">Information about this word</span>
                        </button>
                    {/if}
                </div>
            </div>
            <a class="card-scroller" class:disabled={rightDisabled} class:narrowscreen={$isNarrowScreen} href="/" on:click={(event) => {event.preventDefault(); changeTestData(1); dropdownOpen = false;}}>
                <img src="/icons/chevron-compact-right.svg" alt="next card" />
            </a>
        </div>
    {/if}
    {#if infoOpen && ready && testData[currentIndex].wordInfo}
        <div class="info-wrapper" style="{$isNarrowScreen ? "margin:0; border-radius:0; padding:1rem 1rem 0 1rem; background-color: var(--bg-middle); align-items: flex-start;" : "background-color: var(--el-bg-color); align-items: center;"}" in:slide>
            <WordInfo wordInfo={testData[currentIndex].wordInfo} />
        </div>
    {/if}
    {#if $isNarrowScreen}
        <div id="phone-div" style="">
            <button style="width:40%; height:100%; border-radius:2rem; border:none; display:flex; flex-direction:row;
             align-items:center; justify-content:center;">
                <i class="bi bi-chat-square-fill" style="color: var(--bg-highlight); font-size:1.2rem; margin-top:0.1rem;"></i>
                <span style="font-size:1.4rem; margin-left:0.5rem;">{$_('learn.learn')}</span>
            </button>
            <button style="font-size: 1.5rem; background:none; border:none; color:var(--fg-color); margin-right:auto; margin-bottom:1%;">
                Üé
            </button>
            <button style="font-size: 1.5rem; background:none; border:none; color:var(--fg-color); margin-right:1.5rem;">
                <i class="bi bi-mic" style="font-size: 1.75rem;"></i>
            </button>
        </div>
    {/if}
</div>

<style>
    .narrowscreen {
        display: none;
    }
    .disabled {
        pointer-events: none !important;
        opacity: 0.4 !important;
    }
    .card-scroller {
        opacity: 1;
        background:none;
        border:none;
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
    #phone-div {
        position: fixed;
        bottom: 0;
        width:100%; 
        height:7rem; 
        background-color:var(--el-bg-color); 
        justify-self:flex-end; 
        margin-top:auto; 
        display:flex; 
        flex-direction:row-reverse; 
        align-items:center; 
        justify-content:flex-start; 
        padding:1.75rem 1rem; 
        box-sizing:border-box;
        border-top: 1px solid var(--bg-highlight);
        z-index: 999;
    }
    .info-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-basis: 20rem;
        max-width: 25rem;
        margin-right: 2rem;
        flex-grow:1;
        height: 35rem;
        border-radius: 1rem;
        padding: 1rem;
    }
    .outerwrap{
        display: flex; 
        flex-direction:row; 
        min-width: 65rem;
        max-width: 70rem;
        align-items: center;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
        margin: 0;
        align-self: center;
        text-align: center;
        align-items: center;
        padding: 1rem;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2) !important;
        position: relative;
        height: 100%;
        width:100%;
    }
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
        z-index: 2;
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
    .sentence {
        display:block;
        min-height: 4rem;
        font-size: 3rem;
        align-items: center;
        color: var(--cyan) !important;
        padding: 0 1.5rem 0 1.5rem;
        text-align: left;
        margin: auto 0 auto 0;
        font-family: var(--font-important);
    }
        .sentence > span {
            margin: 0;
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
            .sentence > input:focus, .sentence > input::placeholder, .sentence > input:active, .sentence > input:hover {
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
        src: url('/fonts/BeaufortforLOL-Bold.woff2'),
             url('/fonts/BeaufortforLOL-Bold.ttf');
    }
</style>