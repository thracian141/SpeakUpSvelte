<script lang="ts">
    import { slide } from 'svelte/transition';
	import { PersonalDeck } from "$lib/scripts/types/Materials.js";
	import { isNarrowScreen } from '$lib/store';
    import { decks } from "../testDecks";
    import type { Deck } from "../testDecks";

    let searchbarInput = '';
    let allUserCourses: Deck[] = [decks[3], decks[4]];
    let allUserDecks: PersonalDeck[] = [
        new PersonalDeck(0, "Test deck 1", "This is a test deck", '', 0),
        new PersonalDeck(1, "Test deck 2", "This is another test deck", '', 0),
        new PersonalDeck(2, "Test deck 3", "Yet another test deck", '', 0),
        new PersonalDeck(3, "Test deck 4", "One more test deck", '', 0),
        new PersonalDeck(4, "Test deck 5", "Final test deck", '', 0)
    ];
    let userCourses: Deck[] = [];
    let userDecks: PersonalDeck[] = [];
    $: {
        userCourses = allUserCourses.filter(course => course.getName().toLowerCase().includes(searchbarInput.toLowerCase()));
        userDecks = allUserDecks.filter(deck => deck.name.toLowerCase().includes(searchbarInput.toLowerCase()));
    }
    let activeCourse: Deck = userCourses[0];
    let activeDeck: PersonalDeck = userDecks[0];
</script>


<input type="text" placeholder="Search" class="searchbar" bind:value={searchbarInput}/>
<div class="bottom-wrap" style="{$isNarrowScreen ? 'flex-direction: column;' : 'flex-direction:row; height: 26rem;'}">
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:35vh !important;' : 'width:34rem; height: 100%;'}">
        <h2>Your active courses</h2>
        {#each userCourses as course}
            <div class="course-wrap" transition:slide|global>
                <button><i class="bi bi-gear-fill"></i></button>
                <img src="{course.image}" alt="{course.getName()}" />
                <span style="margin-right: 1rem;">{course.getName()}</span>
                <p>78%</p>
                <div class="overlay">
                    {#if activeCourse == course}
                    This is already your active course.
                    {:else}
                    Switch active course
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    <div class="separator-line" style="{$isNarrowScreen ? 
        'width:100%; height:1px; flex-direction: row; margin: 1.5rem 0;' : 
        'width:1px; height:100%; flex-direction: column; margin: 0 1.5rem;'}">
    </div>
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:50vh;' : 'width:34rem; height: 100%;'}">
        <h2>Your personal decks</h2>
        {#each userDecks as deck}
            <div class="course-wrap" style="height:6rem;" transition:slide|global>
                <button><i class="bi bi-gear-fill"></i></button>
                <span style="font-size: 1.8rem;">{deck.name}</span>
                <p style="font-size: 1rem;">{deck.level}%</p>
                <div class="overlay">
                    {#if activeDeck == deck}
                    This is already your active deck.
                    {:else}
                    Switch active deck
                    {/if}
                </div>
            </div>
        {/each}
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