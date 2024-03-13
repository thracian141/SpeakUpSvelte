<script lang="ts">
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import {_} from '$lib/i18n';
	import { isNarrowScreen } from '$lib/store';
    import {getDecksList} from '$lib/scripts/DeckHandler';
    import type {Deck} from '$lib/scripts/DeckHandler';
    import type { Course } from '$lib/scripts/CourseHandler';
    import {listActiveCourses} from '$lib/scripts/CourseHandler';


    let searchbarInput = '';

    let decksList:Deck[] = [];
    let coursesList: Course[] = [];

    let filteredDecks: Deck[] = [];
    let filteredCourses: Course[] = [];

    onMount(async () => {
        decksList = await getDecksList();
        coursesList = await listActiveCourses();
    });

    $: {
        filteredDecks = decksList.filter(deck => deck.deckName.toLowerCase().includes(searchbarInput.toLowerCase()));
        filteredCourses = coursesList.filter(course => course.title.toLowerCase().includes(searchbarInput.toLowerCase()));
    }
</script>


<input type="text" placeholder="{$_('decks.all.search')}" class="searchbar" bind:value={searchbarInput} transition:slide/>
<div class="bottom-wrap" style="{$isNarrowScreen ? 'flex-direction: column;' : 'flex-direction:row; height: 26rem;'}" transition:slide>
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:35vh !important;' : 'width:34rem; height: 100%;'}">
        <h2>{$_('decks.all.your_active_courses')}</h2>
        {#if coursesList.length > 0}
        {#each filteredCourses as course}
            <div class="course-wrap" transition:slide>
                <button><i class="bi bi-gear-fill"></i></button>
                <img src="{course.image}" alt="{course.courseCode}" />
                <span style="margin-right: 1rem;">{course.title}</span>
                <p>78%</p>
                <div class="overlay">
                    {$_('decks.language.learn')}
                </div>
            </div>
        {/each}
        {/if}
    </div>
    <div class="separator-line"  transition:slide style="{$isNarrowScreen ? 
        'width:100%; height:1px; flex-direction: row; margin: 1.5rem 0;' : 
        'width:1px; height:100%; flex-direction: column; margin: 0 1.5rem;'}">
    </div>
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:50vh;' : 'width:34rem; height: 100%;'}">
        <h2>{$_('decks.all.your_personal_decks')}</h2>
        {#if decksList.length !== 0}
        {#each filteredDecks as deck}
            <a href="/create/deck/{deck.id}" class="course-wrap" style="height:6rem;" transition:slide>
                <button><i class="bi bi-gear-fill"></i></button>
                <span style="font-size: 1.8rem;">{deck.deckName}</span>
                <p style="font-size: 1rem;">{deck.level}%</p>
                <div class="overlay">
                    {$_('decks.language.learn')}
                </div>
            </a>
        {/each}
        {/if}
    </div>
</div>


<style>
    .overlay {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width:100%;
        height:100%;
        background-color: var(--el-bg-color-half);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        opacity: 0;
        transition: all 0.15s ease-in-out;
    }
    .course-wrap {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 6.5rem;
        background-color: var(--bg-color);
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
        .course-wrap > button {
            margin-left: auto;
            margin-right: 1rem;
            background:none;
            border:none;
            outline:none;
            color: var(--fg-color);
            font-size: 2rem;
            z-index: 2;
            order: 3;
        }
            .course-wrap > button:hover {
                color: var(--fg-color-2);
                cursor: pointer;
            }
        .course-wrap > img {
            width: 6rem;
            height: 4rem;
            border-radius: 0.5rem;
            margin-left: 1rem;
            object-fit: cover;
        }
        .course-wrap > span {
            position: absolute;
            left: 50%;
            top: 48%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            margin-left: auto;
            margin-right: auto;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width:78%;
            text-align: center;
        }
        .course-wrap > p {
            font-size: 1.2rem;
            margin-left: auto;
            margin-right: 1rem;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
            position: absolute;
            bottom:0%;
            left:50%;
            transform: translate(-50%, 50%);
        }
        .course-wrap:hover > p,
        .course-wrap:hover > span {
            opacity: 0;
        }
        .course-wrap:hover > .overlay {
            opacity: 1;
        }
        .course-wrap > button:hover ~ p,
        .course-wrap > button:hover ~ span {
            opacity: 1;
        }
        .course-wrap > button:hover ~ .overlay {
            opacity: 0;
        }
    .courses {
        padding-right: 1rem;
        overflow-y: scroll;
    }
        .courses > h2 {
            width:100%;
            margin: 0 0 1rem 0 !important;
            font-weight: normal;
            color: var(--fg-color);
        }
    .separator-line {
        position: relative;
        display: flex;
        align-items: center;
        background-color: var(--bg-highlight);
    }
    .bottom-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        overflow: hidden;
    }
    .searchbar {
        width: 100%;
        height: 3.5rem;
        border-radius: 0.5rem;
        background-color: var(--bg-color);
        color: var(--fg-color);
        padding: 0.5rem;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        outline: none;
        border: none;
        transition: all 0.15s ease-in-out;
    }
        .searchbar::placeholder {
            color: var(--fg-color);
            opacity: 0.5;
            transition: all 0.15s ease-in-out;
        }
            .searchbar:focus::placeholder {
                opacity: 0.9;
            }
        .searchbar:focus, .searchbar:hover {
            background-color: var(--bg-color) !important;
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
            -webkit-border: none !important;
            color: var(--fg-color) !important;
        }

    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>