<script lang="ts">
    import { onMount, tick } from "svelte";
    import { _ } from "$lib/i18n";
    import { isNarrowScreen } from "$lib/store";
    import { fly, slide } from "svelte/transition";
    import { courseLearnStore, sentenceStore } from "$lib/scripts/LearnHandler"
    import {getPOS} from "$lib/scripts/CardHandler";

    let ready = false; // Initialize with not ready.
    let direction = -1; // Direction in which the card will fly.

    let currentIndex = 0;

    let orange = '#faaa5a';
    let cyan = 'var(--cyan)';
    let green = '#119854';

    let fullBarColor = 'var(--cyan)';

    $: levelArray = getLevelArray($courseLearnStore[currentIndex].level);

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

    async function changeTestData(increment: number) {
        ready = false;
        direction = increment;
        currentIndex = (currentIndex + increment);
        setTimeout(() => { ready = true; }, 300);
        await calculateAnswerWidth();
        currentPOS = await getPOS($courseLearnStore[currentIndex].card.partOfSpeech);
    }

    let answerTempWidth : number;
    $: delimiter = new RegExp($courseLearnStore[currentIndex].card.back, 'i');
    $: sentenceMeaningParts = $sentenceStore[currentIndex].back.split(delimiter);
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

    let widthElement: HTMLDivElement;
    let changingCard = false;
    async function calculateAnswerWidth() {
        if (answerInput == undefined) return;
        changingCard = true;
        //add a 1 millisecond timeout
        await new Promise(resolve => setTimeout(resolve, 1));
        let newWidth = widthElement.clientWidth;
        answerInput.style.width = `${newWidth + 10}px`;
        changingCard = false;
    }

    let currentPOS: string|undefined = '';
    onMount(async () => {
        await calculateAnswerWidth();
        currentPOS = await getPOS($courseLearnStore[currentIndex].card.partOfSpeech);
        
        ready = true;
        await tick();
        answerInput.focus();
    });

    $: leftDisabled = currentIndex <= 0;
    $: rightDisabled = currentIndex >= $courseLearnStore.length-1;
</script>


<div transition:slide style="{$isNarrowScreen ? "font-size: 1.5rem;" : "font-size: 3rem;"} display:inline-block; width:fit-content; position:absolute; visibility:hidden;" id="answerTemp" 
    bind:clientWidth={answerTempWidth} bind:this={widthElement}>{$courseLearnStore[currentIndex].card.back}
</div>
<div transition:slide style="display:flex; margin-left: auto; 
    margin-right: auto; overflow:hidden; width:100%; 
    flex-flow:row; {$isNarrowScreen ? "flex-direction:column; justify-content: flex-start; height:100%;" : "height:100%; padding:1rem; justify-content: center; align-items:center; flex-direction:row;"}">
    {#if ready}
        <div on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd} bind:this={outerwrap}
           in:fly={{x: direction > 0 ? 1200 : -1200, duration: 500}} 
           out:fly={{x: direction > 0 ? -1200 : 1200, duration: 500}} 
           class="outerwrap" style="flex-grow:0; {$isNarrowScreen ? "width:100%; min-width:100%; flex-direction:column; flex-grow:0;" : "height: 35rem;"}">  
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
                        {#if $courseLearnStore[currentIndex].level == 0 && !$isNarrowScreen}
                            <p style="color: #faaa5a">{$_('learn.this_word_is_new')}</p>
                        {:else if $courseLearnStore[currentIndex].level == 5 && !$isNarrowScreen}
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
                        {#if !changingCard}
                        <input id="answer" bind:this={answerInput} style="{$isNarrowScreen ? "font-size:1.5rem !important; height:2rem; border-radius:0.15rem; padding:0 0.5rem" : ""}; 
                                                width:{answerTempWidth+10}px" autocomplete="off"/>
                        {/if}
                        <span style="{$isNarrowScreen ? "line-height:2rem;" : "line-height:4rem;"}">{sentenceMeaningParts[1]}</span>
                    </div>
                    <div class="part-of-speech" style="{$isNarrowScreen ? "margin:0 auto 0.25rem auto; height:1.5rem; width:90%; background-color:var(--el-bg-color);" : ""}">
                        <span style="{$isNarrowScreen ? "color:var(--bg-highlight-2); font-size:1rem" : ""}"><i class="bi bi-diagram-2-fill" style="color:var(--bg-highlight)"></i>{currentPOS}</span>
                    </div>
                </div>
                <div class="wrapper-section bottom" style="{$isNarrowScreen ? "height:5rem; position:relative; padding-top:0.5rem; padding-bottom:0.5rem" : ""}">
                    <p style="{$isNarrowScreen ? "margin-bottom:0rem; font-size:1.5rem; margin-top:0rem;" : ""}">{$courseLearnStore[currentIndex].card.front}</p>
                    <p style="{$isNarrowScreen ? "margin-left:0rem; width:14rem; text-align:left; font-size:1rem;" : ""}">{$sentenceStore[currentIndex].front}</p>
                    <button class="check-card-btn">
                        {$_('learn.check_answer')}
                    </button>
                </div>
            </div>
            <a class="card-scroller" class:disabled={rightDisabled} class:narrowscreen={$isNarrowScreen} href="/" on:click={(event) => {event.preventDefault(); changeTestData(1); dropdownOpen = false;}}>
                <img src="/icons/chevron-compact-right.svg" alt="next card" />
            </a>
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
    @import '../learn.css';
</style>