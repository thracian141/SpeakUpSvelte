<script lang='ts'>
	import { slide } from 'svelte/transition';
    import {decks} from './decks/testDecks';
    import type { Section } from './create/course/[course]/testsections';
    import {testsections as sectionlist} from './create/course/[course]/testsections';

    let testsections = $sectionlist;
    let testCourse = decks[2];
    let weeklyStreakTest = 3;
    let wordCountTest = Math.floor(Math.random() * 1000);
    let sectionsLearnedTest = 3;
    let weekOr2Weeks = 'week';

    let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let today = new Date().getDay();
    let lastSevenDays = [...days.slice(today + 1), ...days.slice(0, today + 1)].reverse();
</script>


<div class="outter-wrap" transition:slide>
    <p class="p-welcome-back">Welcome back, <span style="font-weight: bold;">vasillopata</span></p>
    <div style="height:1px; width:100%; background-color:var(--bg-highlight-2); margin-bottom:2rem; color:#00000000">a</div>
    <div class="inner-wrap">
        <div class="courses wrap">
            <div class="last-course">
                <div class="last-course-row-1">
                    Jump back into your last course
                </div>
                <a href="/learn" class="last-course-row-2">
                    <img class="course-img" src={testCourse.image} alt="{testCourse.getName()}" />
                    <span class="course-txts">
                        <span>{testCourse.getName()}</span>
                        <span>Basic Phrases</span>
                    </span>
                    <i class="bi bi-play-fill"></i>
                </a>
            </div>
            <div class="sections">
                {#each testsections as section, i}
                    <div class="section" class:section-learned={i<=sectionsLearnedTest-1} 
                    class:section-current={i==sectionsLearnedTest}>
                        <div class="section-line"><div class="section-line-point"></div></div>
                        <span>{section.title}</span>
                    </div>
                    {#if i==sectionsLearnedTest}
                    <div class="current-section-desc">
                        <div class="section-line"></div>
                        <span>{section.description}</span>
                    </div>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="statistics wrap">
            <div class="statistics-row-1">
                <div class="daily-goal stat">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">3</span>
                    <span class="daily-goal-txt-2">day streak <button class="streak-info-btn">i</button></span>
                    <div class="daily-goal-bar">
                        <div style="width:{weeklyStreakTest/7*100}%; height:100%; background-color:var(--green); border-radius:inherit">
                        </div>
                        <i class="bi bi-star-fill"></i>
                        <span>{weeklyStreakTest}/7 days</span>
                    </div>
                </div>
                <div class="word-count stat">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">{wordCountTest}</span>
                    <span class="daily-goal-txt-2">words learned</span>
                    <span style="margin: 1.5rem 0 auto 0; color:var(--fg-color-2); font-size:1.1rem;">
                    out of <span style="color: var(--selected-text); font-weight:bold;">6173</span></span>
                </div>
            </div>
            <div class="statistics-row-2">
                <h2>This week</h2>
                <div class="week-graph">
                    {#each lastSevenDays as day}
                        <div class="week-day">
                            <span>{Math.round(Math.random() * 50)}</span>
                            <span>{day}</span>
                        </div>
                    {/each}
                </div>
                <div class="week-buttons">
                    <button class="week-btn" class:week-btn-active={weekOr2Weeks=='week'}
                    on:click={()=>weekOr2Weeks='week'}>Last 7 days</button>
                    <button class="week-btn" class:week-btn-active={weekOr2Weeks=='2weeks'}
                    on:click={()=>weekOr2Weeks='2weeks'}>Last 14 days</button>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .outter-wrap {
        display: flex;
        flex-direction: column;
        width: 70rem;
        height:40rem;
    }
        .p-welcome-back {
            font-size: 1.5rem;
        }
        .inner-wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }
            .inner-wrap > .wrap {
                display:flex;
                flex-direction: column;
                width: 49.5%;
                height: 100%;
            }
                .courses>.last-course {
                    width:100%;
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
                    width: 100%;
                    height: 60%;
                    margin-top:0.5rem;
                    display: flex;
                    flex-direction: column;
                    border-radius: 1rem;
                    border:1px solid var(--bg-highlight-2);
                    padding: 1.5rem 2rem;
                    padding-bottom: 0;
                    overflow-y: scroll;
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
                            .section-learned > .section-line >.section-line-point {
                                background-color: var(--green);
                                border-color: var(--green);
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
                        }
                .statistics-row-2 {
                    width:100%;
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
                            position: relative;
                        }
                            .week-day > span:first-child {
                                position: absolute;
                                top: -1.5rem;
                                color: var(--fg-color);
                            }
                            .week-day > span:last-child {
                                position: absolute;
                                bottom: -1.5rem;
                                color: var(--fg-color-2);
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
                    width:100%;
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
                        .streak-info-btn:hover {
                            background-color: var(--bg-midle);
                            box-shadow: 0px 0px 2px 2px var(--bg-highlight-2);
                            color: var(--selected-text);
                        }
                    .daily-goal-bar {
                        width: 100%;
                        height: 0.5rem;
                        background-color: var(--bg-highlight-2);
                        border-radius: 999px;
                        margin-top: 1.5rem;
                        margin-bottom: 1.5rem;
                        position:relative;
                    }
                        .daily-goal-bar > span {
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            color: var(--fg-color);
                            top:190%;
                        }
                        .bi-star-fill {
                            position:absolute;
                            top:50%;
                            right:-4%; 
                            transform: translateY(-60%); 
                            font-size: 1.75rem;
                            color: var(--gold);
                        }
    * {
        box-sizing: border-box;
    }
</style>