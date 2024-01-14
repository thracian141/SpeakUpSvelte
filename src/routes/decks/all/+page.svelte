<script lang="ts">
	import type { PersonalDeck } from '$lib/scripts/types/Materials.ts';
	import { isNarrowScreen } from '$lib/store';
    import { onMount } from 'svelte';
    import { decks } from "../testDecks";
    import type { Deck } from "../testDecks";
    import { browser } from '$app/environment';

    let userCourses: Deck[] = [decks[3], decks[4]];
    let userDecks: PersonalDeck[] = [
        { id: 0, name: "Test deck 1", description: "This is a test deck", image: '', userId: 0 },
        { id: 1, name: "Test deck 2", description: "This is another test deck", image: '', userId: 0 },
        { id: 2, name: "Test deck 3", description: "Yet another test deck", image: '', userId: 0 },
        { id: 3, name: "Test deck 4", description: "One more test deck", image: '', userId: 0 },
        { id: 4, name: "Test deck 5", description: "Final test deck", image: '', userId: 0 }
    ];
    let activeCourse: Deck = userCourses[0];
    let activeDeck: PersonalDeck = userDecks[0];
</script>


<div class="outwrap" style="{$isNarrowScreen ? "width:100%; border-radius:0; height:100%; margin-top:5rem;" : ""}">
    <input type="text" placeholder="Search" class="searchbar" />
    <div class="bottom-wrap" style="{$isNarrowScreen ? 'flex-direction: column;' : 'flex-direction:row; height: 30rem;'}">
        <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:35vh !important;' : 'width:34rem; height: 100%;'}">
            <h2>Your active courses</h2>
            {#each userCourses as course}
                <div class="course-wrap">
                    <img src="{course.image}" alt="{course.getName()}" />
                    <span>{course.getName()}</span>
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
                <div class="course-wrap" style="height:6rem;">
                    <span style="font-size: 1.8rem;">{deck.name}</span>
                    <p style="font-size: 1rem;">{deck.description}</p>
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
        .course-wrap > img {
            width: 6rem;
            height: 4rem;
            border-radius: 0.5rem;
            margin-left: 1rem;
            object-fit: cover;
        }
        .course-wrap > span {
            font-size: 2rem;
            margin-left: auto;
            margin-right: auto;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
        }
        .course-wrap > p {
            font-size: 1.5rem;
            margin-left: auto;
            margin-right: 1rem;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
        }
        .course-wrap:hover > p, .course-wrap:hover > span {
            opacity: 0;
        }
        .course-wrap:hover > .overlay {
            opacity: 1;
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
    .outwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 75rem;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
        padding:2rem;
    }
    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>