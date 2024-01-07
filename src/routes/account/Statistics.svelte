<script lang="ts">
	import { slide } from 'svelte/transition';
    import Calendar from './Calendar.svelte';
    import { isNarrowScreen } from '$lib/store';
    let languages = ["English", "Bulgarian", "Turkish", "German"];
    let currentLanguage = languages[0];
    let wordsTotal = 5138;
    let wordsLearnt = 2134;
    let goalWords = 3000;

    let langDropdown = false;

    function handleClick() {
        langDropdown = !langDropdown;
        if (langDropdown) {
            setTimeout(() => {
                document.addEventListener('click', function handleClickOutside(event) {
                    if (!document.getElementById('lang-dropdown')?.contains(event.target as Node)) {
                        langDropdown = false;
                        document.removeEventListener('click', handleClickOutside);
                    }
                });
            }, 0);
        }
    }

    async function handleHover(id: string) {
        const scale = await document.getElementById(id);
        if (scale) {
            const scaleValues = [0, 1.2, 0.8, 1.1, 0.925, 1.05, 1];
            scaleValues.forEach((value, index) => {
                setTimeout(async () => {
                    scale.style.transform = `scaleY(${value})`;
                }, index * 200);
            });
        }
    }
</script>

<div class="panel" style="{$isNarrowScreen ? "width:100%; border-radius:0; padding: 1.5rem 1rem 0 1rem" : ""}">
    <div class="top" style="{$isNarrowScreen ? "margin-bottom:1rem;" : ""}">
        <div class="words-learnt-wrap" style="{$isNarrowScreen ? "width:8.5rem;" : ""}">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-right:auto; margin-left:0.8rem;">{wordsTotal}</span>
            <span style="position: absolute; right:0%; bottom:0%; font-size:0.95rem; font-weight:bold;">{Math.round((wordsLearnt/wordsTotal)*100)}%</span>
            <span style="position: absolute; right:0%; top:5%; font-size:0.95rem;">{wordsLearnt}</span>
            <span style="position: absolute; right:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">learnt</span>
            <span style="position: absolute; right:0%; top:44%; font-size:0.95rem;">{wordsTotal-wordsLearnt}</span>
            <span style="position: absolute; right:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">left</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("wlearnt")} role="presentation">
                <div id="wlearnt" class="words-learnt-progress" style="height: {(wordsLearnt/wordsTotal)*100}%;transform: scaleY(1)"></div>
                <span style="position: absolute; color:var(--bg-color); left:8%; font-size:0.95rem;">{wordsLearnt}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">TOTAL NUMBER</span>
        </div>
        <div style="display: flex; flex-direction:column; box-sizing:border-box; margin: 0 1rem; {$isNarrowScreen ? "width:9rem;" : " width:13rem;"}">
            <div style="text-align:center; display:flex; flex-direction:column; border: 1px solid var(--bg-highlight);
                        border-radius: 0.6rem 0.6rem 0 0; padding:0.4rem 0; position:relative;">
                <span style="font-weight: bold; transform:scaleY(0.95); font-size:0.9rem;">LANGUAGE</span>
                <button style="font-size: 1.5rem; cursor:pointer;" id="lang" 
                on:click|stopPropagation={handleClick}>
                    {currentLanguage}
                </button>
                {#if langDropdown}
                    <div id="lang-dropdown" in:slide out:slide={{duration:100}}>
                        {#each languages as language, index }
                            <button class="lang-dropdown-option" style="cursor:pointer;" 
                            on:click={async()=>{currentLanguage=languages[index]; langDropdown=false;}}>{language}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div style="font-size: 1.3rem; padding: 0.4rem 1rem 0.4rem 1rem; font-weight:bold; border: 1px solid var(--bg-highlight);
                        border-radius:0 0 0.6rem 0.6rem; border-top:0; ">
                You've learned <br/> 
                <span style="color:var(--green);font-size:2rem;">{wordsLearnt}</span> words.
            </div>
        </div>
        <div class="words-learnt-wrap" style="{$isNarrowScreen ? "width:8.5rem;" : ""}">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-left:auto; margin-right:0.8rem;">{goalWords}</span>
            <span style="position: absolute; left:0%; bottom:0%; font-size:0.95rem; font-weight:bold;">{Math.round((wordsLearnt/goalWords)*100)}%</span>
            <span style="position: absolute; left:0%; top:5%; font-size:0.95rem;">{wordsLearnt}</span>
            <span style="position: absolute; left:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">learnt</span>
            <span style="position: absolute; left:0%; top:44%; font-size:0.95rem;">{goalWords-wordsLearnt}</span>
            <span style="position: absolute; left:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">left</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("ygoal")} role="presentation" style="margin-right:0;margin-left:auto;">
                <div id="ygoal" class="words-learnt-progress your-goal" style="height: {(wordsLearnt/goalWords)*100}%;transform: scaleY(1)"></div>
                <span style="position: absolute; color:var(--bg-color); right:8%; font-size:0.95rem;">{wordsLearnt}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">YOUR GOAL</span>
        </div>
    </div>
    <Calendar />
</div>

<style>
    #lang-dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        top:100%;
        background-color: var(--bg-middle);
        box-sizing: border-box;
        left:50%;
        transform: translateX(-50%);
        border-radius: 0.5rem;
        border: 1px solid var(--bg-highlight);
        overflow: hidden;
    }
        .lang-dropdown-option {
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
            border: none;
            border-bottom: 1px solid var(--bg-highlight);
            color: var(--fg-color);
            cursor: pointer;
            background: none;
            transition: background-color 0.1s ease-in-out;
        }
            .lang-dropdown-option:hover {
                background-color: var(--bg-color);
            }
            .lang-dropdown-option:last-child {
                border-bottom: none;
            }
    #lang {
        opacity: 1;
        cursor:pointer;
        color: var(--cyan);
        transition: opacity 0.1s ease-in-out;
        background: none;
        border: none;
    }
    #lang:hover {
        opacity: 0.8;
    }
    .your-goal {
        background: linear-gradient(to bottom, var(--green), var(--green-half)) !important;
    }
    .words-learnt-progress {
        background: linear-gradient(to bottom, var(--cyan), var(--cyan-half));
        width:100%;
        border-radius: 0.25rem 0.25rem 0 0;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: bottom;
        will-change: transform;
    }
    .words-learnt-bar {
        background-color: var(--bg-color);
        width:4rem;
        height:8rem;
        border-radius:0.4rem 0.4rem 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        padding:0.35rem 0.35rem 0 0.35rem;
        box-sizing: border-box;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
        margin-right: auto;
    }
    .words-learnt-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid var(--bg-highlight);
        width:10rem;
        position: relative;
    }
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:100%;
        box-sizing: border-box;
        margin-bottom: 2.5rem;
    }
    .panel {
        background-color: var(--el-bg-color);
        width:35rem;
        height:42rem;
        border-radius: 0.7rem;
        padding: 2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: relative;
    }
</style>