<script lang="ts">
	import { checkIfDev } from '$lib/scripts/UserHandler';
    import {listBugReports} from '$lib/scripts/BugReportHandler';
    import {resolveBug} from '$lib/scripts/BugReportHandler';
    import type {BugReport} from '$lib/scripts/BugReportHandler';
    import { onMount } from 'svelte';
    import {_} from 'svelte-i18n';
    import { slide } from 'svelte/transition';

    let isDev = false;
    let ready = false;
    let bugReports: BugReport[] = [];
    let selectedCourse = 'all';
    let courses = ['all', 'bg-to-en', 'en-to-bg', 'en-to-de', 'en-to-tr', 'en-to-it'];
    let courseDropDownOpen = false;

    onMount(async()=>{
        isDev = await checkIfDev();
        bugReports = await listBugReports('all');
        ready = true;
    });
</script>

{#if !isDev}
    <h1>Unauthorized</h1>
{:else if ready}
<div class="bugs-wrap" transition:slide>
    <div style="display: flex; flex-direction:row; justify-content:space-between; align-items:center;">
        <h1 style="margin:0;">{$_('bugs.reported_bugs')}</h1>
        <button class="course-dropdown-btn" on:click={() => courseDropDownOpen = !courseDropDownOpen} 
        style="border-radius: {courseDropDownOpen ? "0.5rem 0.5rem 0 0": "0.5rem"}">
            {$_('bugs.for_course')}: <span>{selectedCourse}</span>
            {#if courseDropDownOpen}
                <div class="course-dropdown" transition:slide>
                    {#each courses as course}
                        <button on:click={async () => 
                        {selectedCourse = course; courseDropDownOpen = false; bugReports=await listBugReports(selectedCourse)}}>
                        {course}
                        </button>
                    {/each}
                </div>
            {/if}
        </button>
    </div>
    <div class="reports-list">
        {#each bugReports as bug (bug.id)}
            {#key bug.id}
            <div class="bug-report" transition:slide>
                <div class="location">
                    <span>{bug.reporter.userName}, 
                        <span style="font-weight: bold; color:var(--selected-text)">@ {bug.courseCode}</span> | {bug.card.front}
                    </span>
                </div>
                <span style="word-wrap:break-word; text-wrap:wrap">{bug.text}</span>
                <button class="solve-btn" on:click={async()=>{await resolveBug(bug.id); bugReports = [...bugReports.filter(b => b.id !== bug.id)]}}>
                    <i class="bi bi-check-lg"></i>
                    <span>{$_('bugs.mark_as_solved')}</span>
                </button>
            </div>
            {/key}
        {/each}
    </div>
</div>
{/if}


<style>
    .solve-btn {
        position: absolute;
        right: 1rem;
        top: 50%;
        width: 3rem;
        height: 3rem;
        background-color: var(--bg-color);
        border-radius: 1rem;
        color: var(--fg-color);
        border: 1px solid var(--bg-highlight);
        transform: translateY(-50%);
        transition: all 0.1s ease-in-out;
    }
        .solve-btn span {
            opacity: 0;
            display:none;
            position: absolute;
            top: 110%;
            text-align: right;
            right: 0;
            width: 11rem;
            font-size: 1rem;
            transition: all 0.1s ease-in-out;
            z-index: 99;
        }
        .solve-btn:hover {
            cursor: pointer;
            background-color: var(--green);
            color: white;
        }
            .solve-btn:hover span {
                display:block;
                opacity: 1;
            }
        
    .reports-list {
        margin-top: 1.5rem;
        border: 1px solid var(--bg-highlight);
        border-radius: 0.5rem;
        flex-grow: 1;
        width: 100%;
        background-color: var(--bg-color);
        overflow: hidden;
        overflow-y: auto;
        padding: 1rem;
    }
    .bug-report {
        border: 1px solid var(--bg-highlight);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-top: 0.5rem;
        background-color: var(--el-bg-color);
        color: var(--fg-color);
        font-size: 1.2rem;
        position: relative;
    }
        .bug-report > .location {
            margin-bottom: 1rem;
        }
        .bug-report > span {
            font-size: 1rem !important;
        }
    .bugs-wrap {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        width: 70rem;
        height: 40rem;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
    }
        .course-dropdown-btn {
            margin-top: 1rem;
            width:14.5rem;
            height:3rem;
            background-color: var(--bg-color);
            color:var(--fg-color);
            border: 1px solid var(--bg-highlight);
            font-size: 1.2rem;
            position: relative;
            transition: all 0.1s ease-in-out;
        }
            .course-dropdown-btn span {
                color: var(--cyan);
                transition: all 0.1s ease-in-out;
            }
            .course-dropdown-btn:hover {
                cursor: pointer;
                background-color: var(--bg-middle);
                color: var(--fg-color-2);
            }
                .course-dropdown-btn:hover span {
                    color: var(--cyan-half);
                }
        .course-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 14.5rem;
            background-color: var(--bg-color);
            border-radius: 0 0 0.5rem 0.5rem;
            border: 1px solid var(--bg-highlight);
            z-index: 999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
            .course-dropdown button {
                height: 3rem;
                background-color: var(--bg-color);
                color: var(--fg-color);
                border: none;
                border-bottom: 1px solid var(--bg-color-2);
                font-size: 1.2rem;
                transition: all 0.1s ease-in-out;
            }
                .course-dropdown button:hover {
                    cursor: pointer;
                    background-color: var(--bg-middle);
                    color: var(--fg-color-2);
                }

    * { 
        box-sizing: border-box;
    }
</style>