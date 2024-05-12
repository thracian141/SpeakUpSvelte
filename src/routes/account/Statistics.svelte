<script lang="ts">
	import { slide } from 'svelte/transition';
    import Calendar from './Calendar.svelte';
    import { _ } from '$lib/i18n';
    import { isNarrowScreen } from '$lib/store';
    import {getCoursePerformance, listActiveCourseCodes, getLastCourseCode, getCourseNameByCode} from '$lib/scripts/CourseHandler';
    import { onMount } from 'svelte';

    let pageReady = false;

    let languages: string[] = [];
    let languageNames: string[] = [];
    let currentCourseData: any = {};

    let currentLanguage: string = '';
    let currentLanguageName: string = '';

    let learnedWords = 0;
    let totalWords = 0;
    let totalLeft = 0;
    let percentageTotalLeft: number|null = null;
    let goalWords = 0;
    let goalLeft = 0;
    let percentageGoalLeft: number|null = null;

    let langDropdown = false;

    onMount(async () => {
        const lastCourseCode = await getLastCourseCode();
        languages = await listActiveCourseCodes();
        languageNames = await Promise.all(languages.map(async (code) => await getCourseNameByCode(code)));
        await changeViewedLanguage(lastCourseCode);

        pageReady = true;
    });
    async function changeViewedLanguage(courseCode: string) {
        currentCourseData = await getCoursePerformance(courseCode);

        currentLanguage = courseCode;
        currentLanguageName = await getCourseNameByCode(courseCode);
        learnedWords = currentCourseData.learnedWords;
        totalWords = currentCourseData.totalWords;
        totalLeft = currentCourseData.totalLeft;
        percentageTotalLeft = currentCourseData.percentageTotalLeft;
        percentageGoalLeft = currentCourseData.percentageGoalLeft;
        goalWords = currentCourseData.goalWords;
        goalLeft = currentCourseData.goalLeft;
    }

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

{#if pageReady}
<div class="panel" style="{$isNarrowScreen ? "width:100%; border-radius:0; padding: 1.5rem 1rem 0 1rem" : ""}">
    <div class="top" style="{$isNarrowScreen ? "margin-bottom:1rem;" : ""}">
        <div class="words-learnt-wrap" style="{$isNarrowScreen ? "width:8.5rem;" : ""}">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-right:auto; margin-left:0.8rem;">{totalWords}</span>
            <span style="position: absolute; right:0%; bottom:0%; font-size:0.95rem; font-weight:bold;">{percentageTotalLeft}%</span>
            <span style="position: absolute; right:0%; top:5%; font-size:0.95rem;">{learnedWords}</span>
            <span style="position: absolute; right:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">{$_('account.learned')}</span>
            <span style="position: absolute; right:0%; top:44%; font-size:0.95rem;">{totalLeft}</span>
            <span style="position: absolute; right:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">{$_('account.left')}</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("wlearnt")} role="presentation">
                {#if percentageTotalLeft!=null}
                <div id="wlearnt" class="words-learnt-progress" style="height: {percentageTotalLeft}%;transform: scaleY(1)"></div>
                {/if}
                <span style="position: absolute; color:var(--bg-color); left:8%; font-size:0.95rem;">{learnedWords}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">{$_('account.total_number')}</span>
        </div>
        <div style="display: flex; flex-direction:column; box-sizing:border-box; margin: 0 1rem; {$isNarrowScreen ? "width:9rem;" : " width:13rem;"}">
            <div style="text-align:center; display:flex; flex-direction:column; border: 1px solid var(--bg-highlight);
                        border-radius: 0.6rem 0.6rem 0 0; padding:0.4rem 0; position:relative;">
                <span style="font-weight: bold; transform:scaleY(0.95); font-size:0.9rem;">{$_('account.language')}</span>
                <button style="font-size: 1.5rem; cursor:pointer;" id="lang" 
                on:click|stopPropagation={handleClick}>
                    {currentLanguageName}
                </button>
                {#if langDropdown}
                    <div id="lang-dropdown" in:slide out:slide={{duration:100}}>
                        {#each languages as language, index }
                            <button class="lang-dropdown-option" style="cursor:pointer;" 
                            on:click={async()=>{currentLanguage=languages[index]; langDropdown=false; await changeViewedLanguage(language)}}>{languageNames[index]}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div style="font-size: 1.3rem; padding: 0.4rem 1rem 0.4rem 1rem; font-weight:bold; border: 1px solid var(--bg-highlight);
                        border-radius:0 0 0.6rem 0.6rem; border-top:0; ">
                {$_('account.youve_learned')} <br/> 
                <span style="color:var(--green);font-size:2rem;">{learnedWords}</span> {$_('account.words')}.
            </div>
        </div>
        <div class="words-learnt-wrap" style="{$isNarrowScreen ? "width:8.5rem;" : ""}">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-left:auto; margin-right:0.8rem;">{goalWords}</span>
            <span style="position: absolute; left:0%; bottom:0%; font-size:0.95rem; font-weight:bold;">{percentageGoalLeft}%</span>
            <span style="position: absolute; left:0%; top:5%; font-size:0.95rem;">{learnedWords}</span>
            <span style="position: absolute; left:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">{$_('account.learned')}</span>
            <span style="position: absolute; left:0%; top:44%; font-size:0.95rem;">{goalLeft}</span>
            <span style="position: absolute; left:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">{$_('account.left')}</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("ygoal")} role="presentation" style="margin-right:0;margin-left:auto;">
                {#if percentageGoalLeft!=null}
                <div id="ygoal" class="words-learnt-progress your-goal" style="height: {percentageGoalLeft}%;transform: scaleY(1)"></div>
                {/if}
                <span style="position: absolute; color:var(--bg-color); right:8%; font-size:0.95rem;">{learnedWords}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">{$_('account.your_goal')}</span>
        </div>
    </div>
    <Calendar />
</div>
{/if}

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
    @media (pointer: coarse) {
        .words-learnt-wrap > span {
            z-index: 6;
        }
    }
</style>