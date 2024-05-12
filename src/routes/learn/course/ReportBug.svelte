<script lang="ts">
	import type { CourseCard } from '$lib/scripts/CardHandler';
    import { getCourseByCode, type Course } from '$lib/scripts/CourseHandler';
    import { createEventDispatcher, onMount } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    import {sendBugReport} from '$lib/scripts/BugReportHandler';
    import {_} from 'svelte-i18n'

    const dispatch = createEventDispatcher();

    function closeReport() {
        dispatch('close');
    }

    export let card: CourseCard

    let course: Course = {
        title: "Course Title",
        description: "Course Description",
        image: "https://via.placeholder.com/150",
        courseCode: "COURSECODE"
    };

    let currentText = "";

    $: submitDisabled = currentText.length < 6;
    onMount(async()=>{
        course = await getCourseByCode(card.courseCode);
    });
</script>


<div class="overlay" transition:fade>
    <div class="container" transition:slide>
        <h1>{$_('bugs.report_a_bug')}</h1>
        <button class="close" on:click={closeReport}><i class="bi bi-x-lg"></i></button>
        <p>{$_('bugs.describe_bug')}</p>
        <textarea placeholder="{$_('bugs.placeholder')}" style="height: 15rem; margin-top: 1rem;" bind:value={currentText}></textarea>
        <div class="buttons-row">
            <button class="clear btn" on:click={()=>currentText=''}>{$_('bugs.clear')}</button>
            <div class="bug-location">
                <p><i class="bi bi-book"></i> {course.title}</p>
                <p><i class="bi bi-card-list"></i> {card.front}</p>
            </div>
            <button class="submit btn" class:disabled={submitDisabled} on:click={async()=>{await sendBugReport(currentText, course.courseCode, card.id); closeReport()}}>{$_('bugs.submit')}</button>
        </div>
    </div>
</div>


<style>
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1000;
    }
        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: var(--el-bg-color);
            color: var(--fg-color);
            border-radius: 0.5rem;
            padding: 1rem;
            width: 40rem;
            height: 25rem;
            display: flex;
            flex-direction: column;
            align-items: left;
            justify-content: center;
        }
            textarea { 
                background-color: var(--bg-color);
                color: var(--fg-color);
                font-size: 1.1rem;
                border-radius: 0.5rem;
                border: 1px solid var(--bg-highlight);
                padding: 0.5rem;
                width: 100%;
                resize: none;
            }
            h1 {
                margin:0;
                margin-bottom: 1rem;
            }
            .close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background-color: #00000000;
                border: none;
                border-radius: 999px;
                color: var(--fg-color);
                width: 2.6rem;
                height: 2.6rem;
                text-align: center;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.1s ease-in-out;
            }
                .close > i {
                    font-size: 1.4rem;
                    margin-bottom: -0.2rem;
                }
                .close:hover {
                    background-color: var(--bg-color);
                    cursor: pointer;
                }
            p {
                margin:0;
            }
            .buttons-row {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
            .btn {
                border: none;
                border-radius: 0.5rem;
                padding: 0.5rem;
                width: 10rem;
                height: 3rem;
                margin-top: 1rem;
                font-size: 1.3rem;
                transition: all 0.1s ease-in-out;
                z-index: 99;
            }
                .btn:hover {
                    cursor: pointer;
                    opacity: 0.8;
                }
            .submit {
                background-color: var(--green);
                color: white;
            }
            .clear {
                background-color: var(--red);
                color: white;
            }
            .bug-location {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                justify-content: space-around;
                margin-top: 1rem;
            }
                .bug-location > p {
                    font-size: 1.2rem;
                }
                .bug-location > p:first-child {
                    border-bottom: 1px solid var(--bg-highlight);
                }
    * {
        box-sizing: border-box;
    }
    @media (pointer: coarse) {
        .overlay { 
            width: 100vw;
        }
        .container {
            width: 100%;
            border-radius: 0;
        }
        .buttons-row {
            align-items: center;
            gap: 0.5rem;
        }
    }
</style>