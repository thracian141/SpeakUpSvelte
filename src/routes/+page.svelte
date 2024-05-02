<script lang='ts'>
	import { slide } from 'svelte/transition';
    import {listSectionLinksByCourse} from '$lib/scripts/SectionHandler';
    import type {SectionLink, Section} from '$lib/scripts/SectionHandler';
    import { _ } from '$lib/i18n';
    import { isNarrowScreen } from '$lib/store';
    import './home.css';
    import { onMount } from 'svelte';
    import * as UserHandler from "../lib/scripts/UserHandler";
    import type { Course } from '$lib/scripts/CourseHandler';
    import { getLastCourse } from '$lib/scripts/CourseHandler';
    import Load from './Load.svelte';
    import type { DailyPerformance } from '$lib/scripts/DailyPerformanceHandler';
    import {getDailyPerformance, getGoals, getWeeklyGoals} from '$lib/scripts/DailyPerformanceHandler';
    import GoalSelector from './GoalSelector.svelte';
    import {getLastDeck} from '$lib/scripts/DeckHandler'
    import type {Deck} from '$lib/scripts/DeckHandler';


    let infoOpen = false;
    let goalDropdownOpen = false;
    let weekOr2Weeks = 'week';

    let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let today = new Date().getDay();
    let lastSevenDays = [...days.slice(today + 1), ...days.slice(0, today + 1)].reverse();
    let lastTwoWeeks = [...lastSevenDays, ...lastSevenDays];
    let name = '';
    let isLoggedIn = UserHandler.isLoggedIn();
    let lastCourse: Course|null = null;
    let lastDeck: Deck|null = null;
    // ----------------------------------
    let sectionLinks: SectionLink[] = [];
    let finishedSections: SectionLink[] = [];
    let activeSection: SectionLink|undefined = undefined;
    let unfinishedSections: SectionLink[] = [];
    // ----------------------------------
    let todaysPerformance: DailyPerformance|undefined;
       // New words learned, New words goal, Words guessed, Words guessed goal, Streak
    let goals: number[] = [0,0,0,0,0];
       // 14 days of Words guessed
    let weeklyWordsGuessed: number[] = [];
    // ----------------------------------
    let pageReady = false;

    onMount(async () => {
        if (await isLoggedIn) {
            const lastDeckData: any = await getLastDeck();
            if (lastDeckData == null) {
                lastCourse = await getLastCourse();
                if (lastCourse != null) {
                    sectionLinks = await listSectionLinksByCourse();
                }
                finishedSections = await sectionLinks.filter(link=> link.finished);
                unfinishedSections = await sectionLinks.filter(link=> !link.finished);
                activeSection = await unfinishedSections[0];
                unfinishedSections = await unfinishedSections.slice(1);
            } else if (lastDeckData != null) {
                lastDeck = lastDeckData;
            }
            // -------------------------------------------
            todaysPerformance = await getDailyPerformance();
            goals = await getGoals();
            name = await UserHandler.getName();
            weeklyWordsGuessed = await getWeeklyGoals();
        }
        pageReady = true;
    });
</script>

{#if pageReady}
<div class="outter-wrap {$isNarrowScreen ? "outter-wrap-m" : ""}" transition:slide >         
    {#if name != '' || name != null}
    <p class="p-welcome-back">{$_('home.welcome_back')} 
        <span style="font-weight: bold;">
            {name}
        </span>
    </p>
    {/if}
    <div style="height:1px; width:100%; background-color:var(--bg-highlight-2); margin-bottom:2rem; color:#00000000">SpeakUp</div>
    <div class="courses wrap" class:wrap-m={$isNarrowScreen}>
        <div class="last-course">
            <div class="last-course-row-1">
                {$_('home.jump_back_into_your_last_course')}
            </div>
            {#if lastDeck != null}
            <a href="/learn" class="last-course-row-2">
                <span class="course-txts">
                    <span>{lastDeck.deckName}</span>
                    <span>{lastDeck.deckDescription.slice(0,30)}...</span>
                </span>
                <i class="bi bi-play-fill"></i>
            </a>
            {:else if lastCourse != null}
            <a href="/learn" class="last-course-row-2">
                <img class="course-img" src={lastCourse.image} alt="Last Course" />
                <span class="course-txts">
                    <span>{lastCourse.title}</span>
                    <span>Basic Phrases</span>
                </span>
                <i class="bi bi-play-fill"></i>
            </a>
            {:else}
                <a href="/decks" style="height:50%; padding-top:1rem">{$_('home.no_active_course')}</a>
            {/if}
        </div>
        <div class="statistics-row-1">
            <div class="daily-goal stat" style="width:39.5%;">
                <span style="font-weight: bold; font-size:3rem; margin-top:0.2rem; color:var(--cyan)">{goals[4]}</span>
                <span class="daily-goal-txt-2">
                    {$_('home.day_streak')} 
                    <button class="streak-info-btn" on:click={()=>{infoOpen = !infoOpen}}>
                        i
                        {#if infoOpen}
                            <span transition:slide>{$_('home.continue_streak')}</span>
                        {/if}
                    </button>
                    </span>
                <span style="text-align: center; margin-top:0.6rem; color:var(--green)">{$_('home.study_today')}</span>
            </div>
            <div class="word-count stat" style="z-index:99; flex-direction: row; width:59.5%; padding-right:0; padding-left:0; padding-top:0; position:relative;">
                <div class="stat-panel">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">{goals[0]}</span>
                    <span class="daily-goal-txt-2">{$_('home.words_learnt')}</span>
                    <span style="margin: 1.5rem 0 auto 0; color:var(--fg-color-2); font-size:1.1rem;">
                    {$_('home.out_of')} <span style="color: var(--selected-text); font-weight:bold;">{goals[1]}</span></span>
                </div>
                <div class="stat-panel">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">{goals[2]}</span>
                    <span class="daily-goal-txt-2" >{$_('home.cards_guessed')}</span>
                    <span style="margin: 1.5rem 0 auto 0; color:var(--fg-color-2); font-size:1.1rem;">
                    {$_('home.out_of')} <span style="color: var(--selected-text); font-weight:bold;">{goals[3]}</span></span>
                </div>
                <button class="change-goals-btn" on:click={()=>{goalDropdownOpen = !goalDropdownOpen}}>
                    <i class="bi bi-bullseye"></i>
                    <span style="position: absolute; top:100%; left:50%; transform:translateX(-50%); font-size:1rem; color:var(--fg-color); background-color:var(--bg-color); width:13rem; border-radius:0.5rem; border:1px solid var(--bg-highlight); height:2rem; padding-top:0.4rem; display:none;">
                        {$_('home.change_your_daily_goal')}
                    </span>
                </button>
                {#if goalDropdownOpen}
                    <GoalSelector currentDailyGoal={goals[1]} />
                {/if}
            </div>
        </div>
        <div class="sections">
            {#if lastDeck != null}
                <span style="font-size: 2rem; margin-bottom:1.5rem;">You are currently learning a personal deck.</span>
                <span style="font-size: 1.3rem;">
                    To set an active <span style="color:var(--selected-text)">Course</span> instead, please visit the 
                    <a href="/decks/all" class="decks-anchor">Decks</a> page.
                </span>
            {/if}
            {#each finishedSections as link, i}
                <div class="section section-learned=">
                    <div class="section-line"><div class="section-line-point"></div></div>
                    <span>{link.section.title}</span>
                </div>
            {/each}
            {#if activeSection != undefined}
            <div class="section section-current">
                <div class="section-line"><div class="section-line-point"></div></div>
                <span>{activeSection.section.title}</span>
            </div>
            <a href="/learn" class="current-section-desc">
                <div class="section-line"></div>
                <span>{activeSection.section.description}</span>
            </a>
            {/if}
            {#each unfinishedSections as link, i}
                <div class="section">
                    <div class="section-line"><div class="section-line-point"></div></div>
                    <span>{link.section.title}</span>
                </div>
            {/each}
        </div>
        <div class="statistics-row-2">
            <h2>{$_(weekOr2Weeks === 'week' ? 'home.this_week' : 'home.last_2_weeks')}</h2>
            <div class="week-graph" class:week-graph-m={$isNarrowScreen}>
                {#if weekOr2Weeks == 'week'}
                    {#each weeklyWordsGuessed.slice(6,14) as day}
                        <div class="week-day">
                            <div class="week-day-fill" style="height: {(day/goals[3])*100}%;"></div>
                            <span style="position: absolute;top: -1.5rem;color: var(--fg-color);">{goals[3]-day}</span>
                            <span style="position: absolute;bottom: -1.5rem;color: var(--fg-color-2);">{day}</span>
                        </div>
                    {/each}
                {:else if weekOr2Weeks == '2weeks'}
                    {#each weeklyWordsGuessed as day}
                        <div class="week-day" style="width:0.75rem">
                            <div class="week-day-fill" style="height: {(day/goals[3])*100}%;"></div>
                            <span style="position: absolute;top: -1.5rem;color: var(--fg-color); font-size:0.9rem;">{goals[3]-day}</span>
                            <span style="position: absolute;bottom: -1.5rem;color: var(--fg-color-2); font-size:0.9rem;">{day}</span>
                        </div>
                    {/each}
                {/if}
            </div>
            <div class="week-buttons">
                <button class="week-btn" class:week-btn-active={weekOr2Weeks=='week'}
                on:click={()=>weekOr2Weeks='week'}>{$_('home.7_days')}</button>
                <button class="week-btn" class:week-btn-active={weekOr2Weeks=='2weeks'}
                on:click={()=>weekOr2Weeks='2weeks'}>{$_('home.14_days')}</button>
            </div>
        </div>
    </div>
</div>
{:else}
    <Load />
{/if}


<style>
    @media (hover: none) {
        .last-course {
            margin-bottom: 0.5rem !important;
        }
        .statistics-row-1 {
            height: auto !important;
        }
            .streak-info-btn {
                top: -2.9rem !important;
                right: 1.5rem !important;
                z-index: 200;
            }   
                .streak-info-btn > span {
                    left: 100% !important;
                    top: 0% !important;
                    z-index: 999;
                }
        .stat-panel {
            text-align: center !important;
            justify-content: flex-start;
            height: 100%;
        }
            .stat-panel > .daily-goal-txt-2 {
                font-size: 1.1rem !important;
                height: 2rem !important;
            }
            .change-goals-btn {
                height:2.5rem !important;
                font-size: 1.75rem !important;
                padding-top: 0.26rem !important;
            }
        .sections {
            border: 1px solid var(--bg-highlight-2) !important;
        }
        .sections::-webkit-scrollbar {
            display: none !important;
        }
        .statistics-row-2 {
            padding: 1rem 1rem !important;
        }
    }



    .decks-anchor {
        color:var(--cyan); 
        text-decoration:1px solid underline; 
        text-underline-offset:3px;
    }
        .decks-anchor:hover {
            color:var(--selected-text);
        }
    .change-goals-btn {
        position: absolute;
        bottom:0;
        left:50%;
        transform: translateX(-50%);
        background:var(--bg-color);
        border:1px solid var(--bg-highlight-2);
        color:var(--fg-color-2);
        font-size:2rem;
        height:3rem;
        width:3rem;
        border-radius: 1rem 1rem 0 0;
        padding-top: 0.4rem;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
    }
        .change-goals-btn:hover {
            background:var(--bg-highlight);
            color: var(--fg-color);
        }
        .change-goals-btn:has(.bi-bullseye:hover) span {
            display:inline-block !important;
        }
    .stat-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        justify-content: space-around;
        position: relative;
    }
        .stat-panel:first-child {
            border-right: 1px solid var(--bg-highlight-2);
        }
    .outter-wrap {
        display: flex;
        flex-direction: column;
        width: 70rem;
        height:40rem;
    }
        .p-welcome-back {
            font-size: 1.5rem;
        }
            .wrap {
                display:flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-content: flex-start;
                justify-content: space-between;
                width: 100%;
                height: 100%;
                min-height: 40rem;
            }
                .courses>.last-course {
                    width:49.5%;
                    height:26%;
                    border-radius: 1rem;
                    border:1px solid var(--bg-highlight-2);
                    background-color: var(--bg-midle);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding:1.5rem;
                    padding-bottom: 0;
                }
                    .last-course-row-1 {
                        font-size: 1.2rem;
                        border-bottom: 1px solid var(--bg-highlight-2);
                        width:100%;
                        padding-bottom: 1rem;
                        height:50%;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        justify-content: center;
                        margin-bottom: 0.5rem;
                    }
                    .last-course-row-2 {
                        padding-top: 1rem;
                        width: 100%;
                        height:50%;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: flex-start;
                        gap:1.2rem;
                        padding: 0.5rem 0;
                        margin-bottom: 0.5rem;
                        border-radius: 0.5rem;
                        transition: background-color 0.1s ease-in-out;
                    }
                    .last-course-row-2:hover {
                        cursor: pointer;
                        background-color: var(--bg-highlight);
                    }
                        .course-img {
                            height:100%;
                            aspect-ratio: 3/2;
                            object-fit: cover;
                            border-radius: 0.5rem;
                        }
                        .course-txts {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                            .course-txts > span:first-child {
                                font-size: 1.6rem;
                                color: var(--fg-color);
                                text-decoration: solid underline 1px;
                                text-underline-offset: 0.4rem;
                            }
                            .course-txts > span:last-child {
                                font-size: 0.9rem;
                                color: var(--fg-color-2);
                            }
                        .bi-play-fill {
                            font-size: 2.5rem;
                            margin-left:-0.5rem;
                            margin-bottom: 1rem;
                            color: var(--fg-color)
                        }
                .courses > .sections {
                    width: 49.5%;
                    height: 60%;
                    margin-top:0.5rem;
                    display: flex;
                    flex-direction: column;
                    border-radius: 1rem;
                    border:1px solid var(--bg-highlight-2);
                    padding: 1.5rem 2rem;
                    padding-bottom: 0;
                    overflow-y: scroll;
                    border-right: 0;
                }
                    .courses > .sections::-webkit-scrollbar-thumb {
                        background: #3a3d40;
                        border-radius: 3px 1rem 1rem 3px !important;
                        overflow:visible !important;
                    }
                    .section {
                        width:100%;
                        height: 3rem;
                        min-height: 3rem;
                        display: flex;
                        flex-direction: row;
                        gap:2rem;
                    }
                        .section-line {
                            width: 2px;
                            height: 100%;
                            background-color: var(--bg-highlight);
                            border-radius: 999px;
                            justify-self: flex-start;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: center;
                        }
                            .section-line-point {
                                width:1rem;
                                height:1rem;
                                border: 3px solid var(--bg-highlight);
                                background-color: var(--bg-color);
                                border-radius: 999px;
                            }
                            .section-current {
                                min-height: 2rem;
                                height: 2rem;
                            }
                                .section-current > .section-line > .section-line-point {
                                    background-color: var(--bg-color);
                                    border-color: var(--green);
                                }
                        .section:last-child > .section-line {
                            background-color: var(--bg-color);
                        }
                    .current-section-desc {
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        gap: 2rem;
                        min-height: 5rem;
                        max-height:10rem;
                        width: 100%;
                    }
                        .current-section-desc:hover {
                            cursor: pointer;
                        }
                            .current-section-desc:hover > span {
                                color: var(--fg-color);
                            }
                        .current-section-desc > span {
                            min-height: 0%;
                            max-height:80%;
                            min-width: none;
                            max-width:75%;
                            text-wrap:pretty;
                            color: var(--fg-color-2);
                            font-size: 1rem;
                            padding: 1rem;
                            border-radius: 0.5rem;
                            border: 1px solid var(--bg-highlight-2);
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: flex-start;
                            transition: color 0.1s ease-in-out;
                        }
                .statistics-row-2 {
                    width:49.5%;
                    height:60%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border-radius: 1rem;
                    margin-top: 0.5rem;
                    border:1px solid var(--bg-highlight-2);
                    padding:1rem 2rem;
                }
                    .statistics-row-2 > h2 {
                        margin:0;
                    }
                    .week-graph {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: center;
                        width:100%;
                        height:50%;
                        padding: 0 2rem;
                    }
                        .week-day {
                            height:100%;
                            width: 1.1rem;
                            border-radius: 999px;
                            display: flex;
                            flex-direction: column;
                            background-color: var(--bg-highlight);
                            align-items: center;
                            justify-content: flex-end;
                            position: relative;
                        }
                            .week-day-fill {
                                width: 80%;
                                height: 50%;
                                background-color: var(--green);
                                border-radius: inherit;
                            }
                    .week-buttons {
                        align-self: center;
                        width:90%;
                        aspect-ratio: 6;
                        display: flex;
                        flex-direction: row;
                        border-radius: 1.25rem;
                        padding:0.5rem;
                        border:1px solid var(--bg-highlight-2);
                    }
                        .week-buttons > .week-btn {
                            width:50%;
                            height:100%;
                            border:none;
                            background-color: var(--bg-highlight);
                            color: var(--fg-color);
                            font-size: 1.2rem;
                            border-radius: 0.75rem;
                            transition: all 0.1s ease-in-out;
                            cursor: pointer;
                        }
                            .week-btn:hover {
                                box-shadow: 0 0 2px 2px var(--bg-highlight-2);
                            }
                            .week-btn:first-child {
                                border-radius: 0.75rem 0 0 0.75rem;
                            }
                            .week-btn:last-child {
                                border-radius: 0 0.75rem 0.75rem 0;
                            }
                        .week-buttons > .week-btn-active {
                            background-color: var(--fg-color);
                            color: var(--bg-color);
                        }
                .statistics-row-1 {
                    width:49.5%;
                    height:26%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                    .statistics-row-1 > .stat {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-radius: 1rem;
                        border:1px solid var(--bg-highlight-2);
                        width: 49.5%;
                        height:100%;
                        padding: 0 1rem 1rem 1rem;
                    }
                    .daily-goal-txt-2 {
                        font-size: 1.2rem;  
                        display:flex;
                        flex-direction:row; 
                        justify-content:center; 
                        position: relative;
                    }
                        .streak-info-btn {
                            position: absolute;
                            top: 50%;
                            right:0%;
                            transform: translate(130%, -50%);
                            border-radius: 999px;
                            border:none;
                            width:1.4rem;
                            height:1.4rem;
                            font-size: 1.2rem;
                            font-family: var(--font-important);
                            background-color: var(--bg-highlight);
                            color: var(--fg-color);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.1s ease-in-out;
                        }
                            .streak-info-btn > span {
                                position: absolute;
                                top: 50%;
                                right: 100%;
                                transform: translate(0%, -50%);
                                background-color: var(--bg-highlight);
                                color: var(--fg-color);
                                padding: 0.5rem;
                                border-radius: 0.5rem;
                                width: 10rem;
                                font-size: 1rem;
                            }
                        .streak-info-btn:hover {
                            background-color: var(--bg-midle);
                            box-shadow: 0px 0px 2px 2px var(--bg-highlight-2);
                            color: var(--selected-text);
                        }
    * {
        box-sizing: border-box !important;
    }
</style>